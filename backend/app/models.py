from sqlalchemy import Column, Integer, String, Date, Enum, DateTime, CheckConstraint
from app.database import Base
import enum
import datetime

class UserRole(str, enum.Enum):
    bioanalyst = "bioanalyst"
    admin = "admin"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, index=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    role = Column(Enum(UserRole), default=UserRole.bioanalyst)
    profile_image = Column(String(255), nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)


class Gender(str, enum.Enum):
    M = "M"
    F = "F"
    Otro = "Otro"

class Patient(Base):
    __tablename__ = "patients"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String(100), nullable=False)
    identification = Column(String(8), unique=True, index=True, nullable=False)
    phone = Column(String(15), nullable=False)
    age = Column(Integer, nullable=False)
    birth_date = Column(Date, nullable=False)
    gender = Column(Enum(Gender), nullable=False)
    address = Column(String(255), nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

    # Restricciones adicionales (si quieres)
    __table_args__ = (
        CheckConstraint("CHAR_LENGTH(identification) = 8 AND identification REGEXP '^[0-9]+$'", name='chk_identification_digits'),
        CheckConstraint("phone REGEXP '^[0-9+\\-() ]+$'", name='chk_phone_digits'),
    )