from fastapi import HTTPException
from sqlalchemy.orm import Session
from . import models, schemas
from passlib.context import CryptContext
from datetime import date


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.idUsuario == user_id).first()

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.correo == email).first()

def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.nombreUsuario == username).first()

def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = pwd_context.hash(user.password)
    db_user = models.User(
        correo=user.correo,
        passwordEncrypt=hashed_password,
        nombre=user.nombre,
        apellido=user.apellido,
        nombreUsuario=user.correo,
        genero=user.genero,
        rolUsuario=user.rolUsuario,
        telefono=user.telefono,
        fechaNacimiento=user.fechaNacimiento,
        biografia=user.biografia,
        imgPerfilPath=user.imgPerfilPath,
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

# Actualización de un usuario existente
def update_user(db: Session, user_id: int, update_data: dict):
    db_user = db.query(models.User).filter(models.User.idUsuario == user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    
    for key, value in update_data.items():
        if value is not None:
            setattr(db_user, key, value)
    
    db.commit()
    db.refresh(db_user)
    return db_user

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def authenticate_user(db: Session, email: str, password: str):
    user = get_user_by_email(db, email)
    if not user:
        return False
    if not verify_password(password, user.passwordEncrypt):
        return False
    return user

def get_categorias(db: Session):
    return db.query(models.Categoria).all()

def create_curso(db: Session, curso: schemas.CursoCreate):
    db_curso = models.Curso(
        idCategoria=curso.idCategoria,
        nombre=curso.nombre,
        descripcion=curso.descripcion,
        requisitos=curso.requisitos,
        ultimaActualizacion=date.today(),
        portada=curso.portada
    )
    db.add(db_curso)
    db.commit()
    db.refresh(db_curso)
    return db_curso


def get_categorias(db: Session):
    return db.query(models.Categoria).all()

def create_curso(db: Session, curso: schemas.CursoCreate):
    db_curso = models.Curso(
        idCategoria=curso.idCategoria,
        nombre=curso.nombre,
        descripcion=curso.descripcion,
        requisitos=curso.requisitos,
        portada=curso.portada,  # Asegúrate de incluir el campo portada
        ultimaActualizacion=date.today()
    )
    db.add(db_curso)
    db.commit()
    db.refresh(db_curso)
    return db_curso


def create_video(db: Session, video: schemas.VideoCreate):
    db_video = models.Video(**video.dict())
    db.add(db_video)
    db.commit()
    db.refresh(db_video)
    return db_video

def get_videos_by_curso(db: Session, curso_id: int):
    return db.query(models.Video).filter(models.Video.idCurso == curso_id).all()

def get_cursos(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.Curso).offset(skip).limit(limit).all()
