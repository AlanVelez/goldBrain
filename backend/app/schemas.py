# schemas.py
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
    telefono: Optional[str] = None
    fechaNacimiento: Optional[date] = None
    biografia: Optional[str] = None
    imgPerfilPath: Optional[str] = None
    rolUsuario: int

    class Config:
        orm_mode = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None

class CursoBase(BaseModel):
    idCategoria: int
    nombre: str
    descripcion: Optional[str] = None
    requisitos: Optional[str] = None
    portada: Optional[str] = None

class CursoCreate(CursoBase):
    pass

class Curso(CursoBase):
    idCurso: int
    ultimaActualizacion: Optional[date] = None
    calificacion: Optional[float] = None
    numEstudiantes: Optional[int] = None

    class Config:
        orm_mode = True

class Categoria(BaseModel):
    idCategoria: int
    nombre: str

    class Config:
        orm_mode = True

class VideoBase(BaseModel):
    idCurso: int
    nombre: str
    descripcion: Optional[str] = None
    duracionSeg: int
    autor: str
    link: str

class VideoCreate(VideoBase):
    pass

class Video(VideoBase):
    idVideo: int

    class Config:
        orm_mode = True

class InscripcionBase(BaseModel):
    idCurso: int
    idUsuario: int

class InscripcionCreate(InscripcionBase):
    pass

class Inscripcion(InscripcionBase):
    idInscripcion: int
    fechaInscripcion: date

    class Config:
        orm_mode = True

class VideoProgressBase(BaseModel):
    watched: Optional[bool] = False
    progress: Optional[float] = 0.0

class VideoProgressCreate(VideoProgressBase):
    pass

class VideoProgress(VideoProgressBase):
    id: int
    user_id: int
    video_id: int

    class Config:
        orm_mode = True