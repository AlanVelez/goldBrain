# main.py
from datetime import timedelta
from fastapi import APIRouter, FastAPI, Depends, HTTPException, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
import uvicorn
from . import crud, models, schemas, auth
from .database import SessionLocal, engine, database, get_db
from typing import List, Optional
import os
import shutil

models.Base.metadata.create_all(bind=engine)

app = FastAPI()
router = APIRouter()

app.include_router(router)

UPLOAD_DIRECTORY = "uploads/"

if not os.path.exists(UPLOAD_DIRECTORY):
    os.makedirs(UPLOAD_DIRECTORY)

# Configuración de CORS
origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup():
    await database.connect()

@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()

@app.post("/token", response_model=schemas.Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(auth.get_db)):
    user = crud.authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=auth.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = auth.create_access_token(
        data={"sub": user.correo}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/users/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(auth.get_db)):
    db_user = crud.get_user_by_username(db, username=user.nombreUsuario)
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    return crud.create_user(db=db, user=user)

@app.get("/users/me", response_model=schemas.User)
async def read_users_me(current_user: schemas.User = Depends(auth.get_current_active_user)):
    return current_user

@app.put("/users/me", response_model=schemas.User)
async def update_user(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_active_user),
    nombre: Optional[str] = Form(None),
    apellido: Optional[str] = Form(None),
    nombreUsuario: Optional[str] = Form(None),
    telefono: Optional[str] = Form(None),
    biografia: Optional[str] = Form(None),
    imgPerfilPath: Optional[str] = Form(None),
    imgPerfilFile: Optional[UploadFile] = Form(None),
):
    update_data = {
        "nombre": nombre or current_user.nombre,
        "apellido": apellido or current_user.apellido,
        "nombreUsuario": nombreUsuario or current_user.nombreUsuario,
        "telefono": telefono or current_user.telefono,
        "biografia": biografia or current_user.biografia,
    }

    if imgPerfilFile:
        file_extension = imgPerfilFile.filename.split(".")[-1]
        standardized_filename = f"profile_{current_user.correo.replace('@', '_').replace('.', '_').lower()}.{file_extension}"
        file_location = f"{UPLOAD_DIRECTORY}/{standardized_filename}"
        
        with open(file_location, "wb+") as file_object:
            shutil.copyfileobj(imgPerfilFile.file, file_object)
        
        update_data["imgPerfilPath"] = f"/uploads/{standardized_filename}"
    else:
        update_data["imgPerfilPath"] = imgPerfilPath or current_user.imgPerfilPath

    print(update_data)  # Debugging: print the update data
    return crud.update_user(db, current_user.idUsuario, update_data)

@app.get("/categorias/", response_model=List[schemas.Categoria])
def read_categorias(db: Session = Depends(get_db)):
    categorias = crud.get_categorias(db)
    return categorias

@app.post("/upload/")
async def upload_file(file: UploadFile = File(...), course_id: int = Form(...), db: Session = Depends(get_db)):
    if course_id == 0:
        raise HTTPException(status_code=400, detail="Invalid course ID")
    
    file_extension = file.filename.split(".")[-1]
    standardized_filename = f"course_{course_id}.{file_extension}"
    file_location = f"{UPLOAD_DIRECTORY}/{standardized_filename}"
    
    with open(file_location, "wb+") as file_object:
        shutil.copyfileobj(file.file, file_object)

    portada_path = f"/uploads/{standardized_filename}"
    crud.update_curso_portada(db, course_id, portada_path)
    
    return {"location": portada_path}

@app.get("/uploads/{file_path:path}")
async def get_file(file_path: str):
    return FileResponse(path=f"{UPLOAD_DIRECTORY}/{file_path}")

@app.post("/videos/", response_model=schemas.Video)
def create_video(video: schemas.VideoCreate, db: Session = Depends(get_db)):
    return crud.create_video(db=db, video=video)

@app.get("/videos/{curso_id}", response_model=List[schemas.Video])
def read_videos(curso_id: int, db: Session = Depends(get_db)):
    videos = crud.get_videos_by_curso(db, curso_id)
    return videos

@app.post("/cursos/", response_model=schemas.Curso)
def create_curso(curso: schemas.CursoCreate, db: Session = Depends(get_db)):
    print("Creating course with data:", curso)
    return crud.create_curso(db=db, curso=curso)

@app.get("/cursos/", response_model=List[schemas.Curso])
def read_cursos(skip: int = 0, limit: int = 50, db: Session = Depends(get_db)):
    cursos = crud.get_cursos(db, skip=skip, limit=limit)
    print("Returning courses:", cursos)
    return cursos

@app.get("/cursos/{curso_id}", response_model=List[schemas.Curso])
async def read_course(curso_id: int, db: Session = Depends(get_db)):
    db_course = crud.get_course(db, curso_id)
    return db_course

@app.post("/inscripciones", response_model=schemas.Inscripcion)
async def create_inscripcion(inscripcion: schemas.InscripcionCreate, db: Session = Depends(get_db)):
    db_inscripcion = crud.get_inscripcion_by_course_and_user(db, inscripcion.idCurso, inscripcion.idUsuario)
    if db_inscripcion:
        raise HTTPException(status_code=400, detail="El usuario ya está inscrito en este curso")
    return crud.create_inscripcion(db=db, inscripcion=inscripcion)

@app.get("/categorias/{idCategoria}", response_model=schemas.Categoria)
def read_categoria(idCategoria: int, db: Session = Depends(get_db)):
    categoria = crud.get_categoria(db, idCategoria)
    if categoria is None:
        raise HTTPException(status_code=404, detail="Categoría no encontrada")
    return categoria

@app.post("/videos/{video_id}/watched")
def mark_video_as_watched(video_id: int, db: Session = Depends(get_db)):
    db_video = db.query(models.Video).filter(models.Video.idVideo == video_id).first()
    if db_video is None:
        raise HTTPException(status_code=404, detail="Video not found")
    db_video.watched = True
    db.commit()
    db.refresh(db_video)
    return {"message": "Video marked as watched"}

@app.post("/video-progress/", response_model=schemas.VideoProgress)
def create_video_progress(progress: schemas.VideoProgressCreate, db: Session = Depends(get_db)):
    return crud.create_video_progress(db, progress)

@app.get("/video-progress/{user_id}/{video_id}", response_model=schemas.VideoProgress)
def read_video_progress(user_id: int, video_id: int, db: Session = Depends(get_db)):
    db_progress = crud.get_video_progress(db, user_id, video_id)
    if db_progress is None:
        raise HTTPException(status_code=404, detail="Progress not found")
    return db_progress

@app.put("/video-progress/{user_id}/{video_id}", response_model=schemas.VideoProgress)
def update_video_progress(user_id: int, video_id: int, progress: schemas.VideoProgressCreate, db: Session = Depends(get_db)):
    return crud.update_video_progress(db, progress)

@app.get("/video-progress/user/{user_id}/course/{course_id}", response_model=List[schemas.VideoProgress])
def get_video_progress_for_course(user_id: int, course_id: int, db: Session = Depends(get_db)):
    return db.query(models.VideoProgress).join(models.Video).filter(
        models.VideoProgress.user_id == user_id,
        models.Video.idCurso == course_id
    ).all()


if __name__ == "__main__":
    uvicorn.run("backend.app.main:app", host="0.0.0.0", port=8000, reload=True)
