'''Configuración de la base de datos'''
# backend/app/database.py
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from databases import Database

# url de la base de datos base
Database_URL = "postgresql://postgres:admin@localhost/GoldBrain"

engine = create_engine(Database_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
database = Database(Database_URL)
