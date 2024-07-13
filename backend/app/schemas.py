from pydantic import BaseModel, EmailStr
from datetime import date
from typing import Optional

class UserCreate(BaseModel):
    correo: EmailStr
    password: str
    nombre: str
    apellido: str
    nombreUsuario: str
    genero: int
    telefono: Optional[str] = None
    fechaNacimiento: Optional[date] = None
    biografia: Optional[str] = None
    imgPerfilPath: Optional[str] = None
    rolUsuario: Optional[int] = 2  # Valor por defecto es 2 (estudiante)

class User(BaseModel):
    idUsuario: int
    correo: EmailStr
    nombre: str
    apellido: str
    nombreUsuario: str

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None
