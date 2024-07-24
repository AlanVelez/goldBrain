from sqlalchemy import Boolean, Column, Integer, String, Date, ForeignKey, Text, Float
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class User(Base):
    __tablename__ = 'user'
    idUsuario = Column(Integer, primary_key=True, autoincrement=True)
    correo = Column(String, nullable=False, unique=True)
    passwordEncrypt = Column(String, nullable=False)
    nombre = Column(String, nullable=False)
    apellido = Column(String, nullable=False)
    telefono = Column(String, nullable=True)
    fechaNacimiento = Column(Date, nullable=True)
    nombreUsuario = Column(String, nullable=False, unique=True)
    biografia = Column(Text, nullable=True)
    genero = Column(Integer, ForeignKey('genero.idGenero'), nullable=False)
    imgPerfilPath = Column(String, nullable=True)
    rolUsuario = Column(Integer, ForeignKey('rol.idRol'), nullable=False)

    genero_rel = relationship('Genero', back_populates='usuarios')
    rol_rel = relationship('Rol', back_populates='usuarios')
    aportes = relationship('Aporte', back_populates='usuario')
    inscripciones = relationship('Inscripcion', back_populates='usuario')
    video_progress = relationship('VideoProgress', back_populates='user')

class Genero(Base):
    __tablename__ = 'genero'
    idGenero = Column(Integer, primary_key=True, autoincrement=True)
    genero = Column(String, nullable=False)
    
    usuarios = relationship('User', back_populates='genero_rel')

class Rol(Base):
    __tablename__ = 'rol'
    idRol = Column(Integer, primary_key=True, autoincrement=True)
    rol = Column(String, nullable=False)
    
    usuarios = relationship('User', back_populates='rol_rel')

class Curso(Base):
    __tablename__ = 'curso'
    idCurso = Column("idCurso", Integer, primary_key=True, autoincrement=True)
    idCategoria = Column("idCategoria", Integer, ForeignKey('categoria.idCategoria'), nullable=False)
    nombre = Column("nombre", String, nullable=False)
    descripcion = Column("descripcion", Text, nullable=True)
    ultimaActualizacion = Column("ultimaActualizacion", Date, nullable=True)
    calificacion = Column("calificacion", Float, nullable=True)
    numEstudiantes = Column("numEstudiantes", Integer, nullable=True)
    requisitos = Column("requisitos", Text, nullable=True)
    portada = Column("portada", String, nullable=True)

    categoria_rel = relationship('Categoria', back_populates='cursos')
    videos = relationship('Video', back_populates='curso')
    inscripciones = relationship('Inscripcion', back_populates='curso')

class Categoria(Base):
    __tablename__ = 'categoria'
    idCategoria = Column(Integer, primary_key=True, autoincrement=True)
    nombre = Column(String, nullable=False)
    
    cursos = relationship('Curso', back_populates='categoria_rel')

class Video(Base):
    __tablename__ = 'video'
    idVideo = Column(Integer, primary_key=True, autoincrement=True)
    idCurso = Column(Integer, ForeignKey('curso.idCurso'), nullable=False)
    nombre = Column(String, nullable=False)
    descripcion = Column(Text, nullable=True)
    duracionSeg = Column(Integer, nullable=False)
    autor = Column(String, nullable=False)
    link = Column(String, nullable=False)

    curso = relationship('Curso', back_populates='videos')
    aportes = relationship('Aporte', back_populates='video')
    video_progress = relationship('VideoProgress', back_populates='video')


class Aporte(Base):
    __tablename__ = 'aporte'
    idAporte = Column(Integer, primary_key=True, autoincrement=True)
    idVideo = Column(Integer, ForeignKey('video.idVideo'), nullable=False)
    idUsuario = Column(Integer, ForeignKey('user.idUsuario'), nullable=False)
    comentario = Column(Text, nullable=True)
    numLikes = Column(Integer, nullable=True)
    fechaAporte = Column(Date, nullable=False)
    
    video = relationship('Video', back_populates='aportes')
    usuario = relationship('User', back_populates='aportes')

class Inscripcion(Base):
    __tablename__ = 'inscripcion'
    idInscripcion = Column(Integer, primary_key=True, autoincrement=True)
    idCurso = Column(Integer, ForeignKey('curso.idCurso'), nullable=False)
    idUsuario = Column(Integer, ForeignKey('user.idUsuario'), nullable=False)
    fechaInscripcion = Column(Date, nullable=False)
    
    curso = relationship('Curso', back_populates='inscripciones')
    usuario = relationship('User', back_populates='inscripciones')

class VideoProgress(Base):
    __tablename__ = 'video_progress'
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey('user.idUsuario'), nullable=False)
    video_id = Column(Integer, ForeignKey('video.idVideo'), nullable=False)
    watched = Column(Boolean, default=False)
    progress = Column(Float, default=0.0)

    user = relationship('User', back_populates='video_progress')
    video = relationship('Video', back_populates='video_progress')
