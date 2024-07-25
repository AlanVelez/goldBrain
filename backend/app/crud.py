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

def get_course(db: Session, curso_id: int):
    return db.query(models.Curso).filter(models.Curso.idCurso == curso_id).all()

def get_cursos(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.Curso).offset(skip).limit(limit).all()

def update_curso_portada(db: Session, curso_id: int, portada_path: str):
    db_curso = db.query(models.Curso).filter(models.Curso.idCurso == curso_id).first()
    if db_curso:
        db_curso.portada = portada_path
        db.commit()
        db.refresh(db_curso)
    return db_curso

def get_categoria(db: Session, idCategoria: int):
    return db.query(models.Categoria).filter(models.Categoria.idCategoria == idCategoria).first()

def create_video_progress(db: Session, progress: schemas.VideoProgressCreate):
    db_progress = models.VideoProgress(**progress.dict())
    db.add(db_progress)
    db.commit()
    db.refresh(db_progress)
    return db_progress

def get_video_progress(db: Session, user_id: int, video_id: int):
    return db.query(models.VideoProgress).filter(
        models.VideoProgress.user_id == user_id,
        models.VideoProgress.video_id == video_id
    ).first()

def update_video_progress(db: Session, user_id: int, video_id: int, progress: schemas.VideoProgressCreate):
    video_progress = db.query(models.VideoProgress).filter(
        models.VideoProgress.user_id == user_id,
        models.VideoProgress.video_id == video_id
    ).first()

    if video_progress:
        video_progress.progress = progress.progress
        video_progress.watched = progress.watched
        db.commit()
        db.refresh(video_progress)
        return video_progress
    else:
        new_video_progress = models.VideoProgress(
            user_id=user_id,
            video_id=video_id,
            progress=progress.progress,
            watched=progress.watched
        )
        db.add(new_video_progress)
        db.commit()
        db.refresh(new_video_progress)
        return new_video_progress

def create_inscripcion(db: Session, inscripcion: schemas.InscripcionCreate):
    db_inscripcion = models.Inscripcion(
        idCurso=inscripcion.idCurso,
        idUsuario=inscripcion.idUsuario,
        fechaInscripcion=date.today()  # Establecer la fecha actual
    )
    db.add(db_inscripcion)
    
    # Incrementar el número de estudiantes inscritos
    curso = db.query(models.Curso).filter(models.Curso.idCurso == inscripcion.idCurso).first()
    if curso:
        curso.numEstudiantes = (curso.numEstudiantes or 0) + 1

    db.commit()
    db.refresh(db_inscripcion)
    return db_inscripcion

def get_inscripcion_by_course_and_user(db: Session, user_id: int, course_id: int):
    return db.query(models.Inscripcion).filter(models.Inscripcion.idUsuario == user_id, models.Inscripcion.idCurso == course_id).first()

# En crud.py
def get_recommended_courses(db: Session, user_id: int):
    # Obtener los cursos en los que el usuario está inscrito
    user_courses = db.query(models.Inscripcion).filter(models.Inscripcion.idUsuario == user_id).all()
    
    # Obtener las categorías de esos cursos
    user_categories = {course.curso.idCategoria for course in user_courses}
    
    # Obtener los cursos recomendados basados en esas categorías
    recommended_courses = db.query(models.Curso).filter(models.Curso.idCategoria.in_(user_categories)).all()
    
    return recommended_courses

def get_courses_by_user(db: Session, user_id: int):
    return db.query(models.Curso).join(models.Inscripcion).filter(models.Inscripcion.idUsuario == user_id).all()

def get_last_unwatched_video(db: Session, user_id: int, course_id: int):
    return (
        db.query(models.Video)
        .outerjoin(models.VideoProgress, 
                   (models.Video.idVideo == models.VideoProgress.video_id) & 
                   (models.VideoProgress.user_id == user_id))
        .filter(models.Video.idCurso == course_id, 
                (models.VideoProgress.watched == None) | (models.VideoProgress.watched == False))
        .order_by(models.Video.idVideo)
        .first()
    )

def get_user_courses(db: Session, user_id: int):
    return db.query(models.Curso).join(models.Inscripcion).filter(models.Inscripcion.idUsuario == user_id).all()
