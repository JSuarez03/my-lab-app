from pydantic import BaseModel, EmailStr, Field, validator, field_validator
import re
from enum import Enum
import datetime
from typing import Optional
from datetime import date

# ===== ESQUEMAS DE AUTENTICACIÓN =====

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
    profile_image: Optional[str] = None
    created_at: datetime.datetime

    class Config:
        from_attributes = True

# ===== ESQUEMAS DE PACIENTES =====

class PatientBase(BaseModel):
    full_name: str = Field(..., min_length=3, max_length=100)
    identification: str = Field(..., min_length=6, max_length=8, pattern=r'^[0-9]{6,8}$')
    phone: str = Field(..., min_length=7, max_length=15)
    age: int = Field(..., ge=0, le=120)
    birth_date: date
    gender: str = Field(..., pattern='^(M|F|Otro)$')
    address: Optional[str] = None

    @field_validator('full_name')
    @classmethod
    def validate_full_name(cls, v):
        if not re.match(r'^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$', v):
            raise ValueError('El nombre solo debe contener letras y espacios')
        return v

    @field_validator('identification')
    @classmethod
    def validate_identification(cls, v):
        if not re.match(r'^[0-9]{6,8}$', v):
            raise ValueError('La cédula debe tener entre 6 y 8 dígitos numéricos')
        return v

class PatientCreate(PatientBase):
    pass

class PatientUpdate(BaseModel):
    full_name: Optional[str] = Field(None, min_length=3, max_length=100)
    identification: Optional[str] = Field(None, min_length=6, max_length=8, pattern=r'^[0-9]{6,8}$')
    phone: Optional[str] = Field(None, min_length=7, max_length=15)
    age: Optional[int] = Field(None, ge=0, le=120)
    birth_date: Optional[date] = None
    gender: Optional[str] = Field(None, pattern='^(M|F|Otro)$')
    address: Optional[str] = None

    @field_validator('full_name')
    @classmethod
    def validate_full_name(cls, v):
        if v is not None and not re.match(r'^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$', v):
            raise ValueError('El nombre solo debe contener letras y espacios')
        return v

    @field_validator('identification')
    @classmethod
    def validate_identification(cls, v):
        if v is not None and not re.match(r'^[0-9]{6,8}$', v):
            raise ValueError('La cédula debe tener entre 6 y 8 dígitos numéricos')
        return v

class PatientResponse(PatientBase):
    id: int
    created_at: datetime.datetime
    updated_at: datetime.datetime

    class Config:
        from_attributes = True

# ===== EXPORTACIONES =====

__all__ = [
    'UserRole',
    'UserCreate',
    'UserLogin',
    'Token',
    'UserResponse',
    'PatientBase',
    'PatientCreate',
    'PatientUpdate',
    'PatientResponse',
]