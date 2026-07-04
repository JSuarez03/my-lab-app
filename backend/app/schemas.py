from pydantic import BaseModel, EmailStr, Field, validator
from datetime import date, datetime
from typing import Optional
import re
from enum import Enum

class UserRole(str, Enum):
    bioanalyst = "bioanalyst"
    admin = "admin"

class UserCreate(BaseModel):
    full_name: str = Field(..., min_length=3, max_length=100)
    email: EmailStr
    password: str = Field(..., min_length=8)
    role: UserRole = UserRole.bioanalyst

    @validator('full_name')
    def validate_full_name(cls, v):
        if not re.match(r'^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$', v):
            raise ValueError('El nombre solo debe contener letras y espacios')
        return v

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class UserResponse(BaseModel):
    id: int
    full_name: str
    email: str
    role: UserRole
    profile_image: str | None
    created_at: datetime.datetime

    class Config:
        from_attributes = True

class PatientBase(BaseModel):
    full_name: str = Field(..., min_length=3, max_length=100)
    identification: str = Field(..., min_length=8, max_length=8, pattern=r'^[0-9]{8}$')
    phone: str = Field(..., min_length=7, max_length=15)
    age: int = Field(..., ge=0, le=120)
    birth_date: date
    gender: str = Field(..., pattern='^(M|F|Otro)$')
    address: Optional[str] = None

    @validator('full_name')
    def validate_full_name(cls, v):
        if not re.match(r'^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$', v):
            raise ValueError('El nombre solo debe contener letras y espacios')
        return v

class PatientCreate(PatientBase):
    pass

class PatientUpdate(PatientBase):
    full_name: Optional[str] = None
    identification: Optional[str] = None
    phone: Optional[str] = None
    age: Optional[int] = None
    birth_date: Optional[date] = None
    gender: Optional[str] = None
    address: Optional[str] = None

class PatientResponse(PatientBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True