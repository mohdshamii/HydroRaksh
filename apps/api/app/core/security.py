import hashlib
import os
import hmac
from datetime import datetime, timedelta, timezone
from typing import Any, Union, Optional
import jwt
from app.core.config import settings


def hash_password(password: str) -> str:
    salt = os.urandom(16)
    key = hashlib.pbkdf2_hmac("sha256", password.encode("utf-8"), salt, 100000)
    return f"{salt.hex()}${key.hex()}"


def verify_password(plain_password: str, hashed_password: str) -> bool:
    try:
        salt_hex, key_hex = hashed_password.split("$")
        salt = bytes.fromhex(salt_hex)
        expected_key = bytes.fromhex(key_hex)
        key = hashlib.pbkdf2_hmac("sha256", plain_password.encode("utf-8"), salt, 100000)
        return hmac.compare_digest(expected_key, key)
    except Exception:
        return False


def create_access_token(subject: Union[str, Any], expires_delta: Optional[timedelta] = None, role: str = "Citizen", jurisdiction: Optional[str] = None) -> str:
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    
    to_encode = {
        "sub": str(subject),
        "exp": expire,
        "iat": datetime.now(timezone.utc),
        "role": role,
        "jurisdiction": jurisdiction or "All"
    }
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded_jwt


def verify_supabase_token(token: str) -> Optional[dict]:
    """
    Verifies Supabase JWT signature and claims if SUPABASE_JWT_SECRET is configured.
    Falls back gracefully if Supabase environment variables are missing.
    """
    supabase_secret = getattr(settings, "SUPABASE_JWT_SECRET", None) or os.environ.get("SUPABASE_JWT_SECRET")
    if not supabase_secret:
        return None
    try:
        audience = os.environ.get("SUPABASE_AUDIENCE", "authenticated")
        payload = jwt.decode(
            token,
            supabase_secret,
            algorithms=["HS256"],
            audience=audience,
            options={"verify_exp": True}
        )
        return payload
    except Exception:
        return None


def decode_access_token(token: str) -> Optional[dict]:
    # 1. Try local application secret
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        return payload
    except Exception:
        pass

    # 2. Try Supabase JWT if configured
    return verify_supabase_token(token)
