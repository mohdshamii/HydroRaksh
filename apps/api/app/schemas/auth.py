from typing import Optional
from datetime import datetime
from pydantic import BaseModel, Field

try:
    import email_validator  # type: ignore
    from pydantic import EmailStr
except ImportError:
    EmailStr = str  # type: ignore


class LoginRequest(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=6)


class UserBase(BaseModel):
    email: EmailStr
    full_name: str
    role: str = "Citizen"
    department: Optional[str] = None
    jurisdiction_state: Optional[str] = "All"
    jurisdiction_district: Optional[str] = "All"
    phone: Optional[str] = None


class RegisterRequest(UserBase):
    password: str = Field(..., min_length=6)


class UserResponse(UserBase):
    id: str
    is_active: bool
    is_verified: bool
    created_at: datetime

    class Config:
        from_attributes = True


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse
