from fastapi import APIRouter, Depends, HTTPException, status, Request
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.security import verify_password, hash_password, create_access_token
from app.core.rbac import get_current_user, log_audit
from app.models.users import User
from app.schemas.auth import LoginRequest, RegisterRequest, TokenResponse, UserResponse

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/login", response_model=TokenResponse)
def login(request: Request, payload: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == payload.email.lower().strip()).first()
    if not user or not verify_password(payload.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
        )

    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User account is inactive",
        )

    token = create_access_token(
        subject=user.id,
        role=user.role,
        jurisdiction=user.jurisdiction_district or user.jurisdiction_state
    )

    client_ip = request.client.host if request.client else "unknown"
    log_audit(db, user, "LOGIN", "AUTH", f"User logged in from {client_ip}", client_ip)

    return TokenResponse(
        access_token=token,
        token_type="bearer",
        user=UserResponse.model_validate(user)
    )


@router.post("/register", response_model=UserResponse)
def register(request: Request, payload: RegisterRequest, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == payload.email.lower().strip()).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with this email already exists",
        )

    user = User(
        email=payload.email.lower().strip(),
        hashed_password=hash_password(payload.password),
        full_name=payload.full_name,
        role=payload.role if payload.role in ["Citizen", "Analyst"] else "Citizen",
        department=payload.department,
        jurisdiction_state=payload.jurisdiction_state,
        jurisdiction_district=payload.jurisdiction_district,
        phone=payload.phone,
        is_active=True,
        is_verified=False
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    client_ip = request.client.host if request.client else "unknown"
    log_audit(db, user, "REGISTER", "AUTH", f"New user registered: {user.email}", client_ip)

    return UserResponse.model_validate(user)


@router.get("/me", response_model=UserResponse)
def get_current_user_profile(current_user: User = Depends(get_current_user)):
    return UserResponse.model_validate(current_user)


@router.get("/roles")
def get_roles():
    return [
        {"role": "Super Admin", "description": "National full read/write, user & connector management"},
        {"role": "State Admin", "description": "State-level water management & district coordination"},
        {"role": "District Officer", "description": "District-level monitoring, alerts, and issue assignment"},
        {"role": "Field Officer", "description": "Ground station manual entry, verification, and sensor maintenance"},
        {"role": "Analyst", "description": "Data exploration, model evaluation, and report export"},
        {"role": "Citizen", "description": "Public water status lookup and grievance reporting"},
    ]
