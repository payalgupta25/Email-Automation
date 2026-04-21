from sqlalchemy import create_engine  #create_engine → create database connection
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "sqlite:///./users.db"

engine = create_engine(
    DATABASE_URL, connect_args={"check_same_thread": False}
    # This is needed because:
    #     SQLite normally allows one thread
    #     FastAPI uses multiple threads
    #     So we disable restriction.
)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)
 
#  This is used to create tables
Base = declarative_base()