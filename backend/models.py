from sqlalchemy import Column, Integer, String
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)


class EmailLog(Base):
    __tablename__ = "emails"

    id = Column(Integer, primary_key=True, index=True)
    to_email = Column(String)
    subject = Column(String)
    body = Column(String)
    user_email = Column(String)