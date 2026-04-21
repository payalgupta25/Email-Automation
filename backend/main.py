from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import smtplib
import os
import models
from database import engine
from database import engine, Base
from dotenv import load_dotenv
from email.message import EmailMessage # as we now require file uploads

#auth
from sqlalchemy.orm import Session
from fastapi import Depends

from database import SessionLocal
from models import User
from schemas import UserCreate
from auth import hash_password

from schemas import UserLogin
from auth import verify_password, create_access_token

Base.metadata.create_all(bind=engine)

load_dotenv()

app = FastAPI()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Allow React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

EMAIL = os.getenv("EMAIL")
PASSWORD = os.getenv("PASSWORD")


class EmailRequest(BaseModel):
    to_email: str
    subject: str
    body: str


@app.get("/")
def home():
    return {"message": "AI Email Agent Backend Running"}


@app.post("/send-email")
async def send_email(
    email: str = Form(...),
    subject: str = Form(...),
    body: str = Form(...),
    resume: UploadFile = File(...)
):

    # Save resume temporarily
    file_path = f"uploads/{resume.filename}"

    os.makedirs("uploads", exist_ok=True)

    with open(file_path, "wb") as f:
        f.write(await resume.read())

    # Create email
    msg = EmailMessage()
    msg["Subject"] = subject
    msg["From"] = EMAIL
    msg["To"] = email
    msg.set_content(body)

    # Attach resume
    with open(file_path, "rb") as f:
        file_data = f.read()
        file_name = resume.filename

    msg.add_attachment(
        file_data,
        maintype="application",
        subtype="pdf",
        filename=file_name
    )

    # Send email
    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as smtp:
        smtp.login(EMAIL, PASSWORD)
        smtp.send_message(msg)

    return {"message": "Email sent successfully"}

@app.post("/upload-resume")
async def upload_resume(file: UploadFile = File(...)):
    file_path = f"uploads/{file.filename}"

    with open(file_path, "wb") as f:
        f.write(await file.read())

    return {"message": "Resume uploaded successfully", "file_path": file_path}


@app.post("/signup")
def signup(user: UserCreate, db: Session = Depends(get_db)):
    hashed_password = hash_password(user.password)

    new_user = User(
        email=user.email,
        password=hashed_password
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message": "User created successfully"}


@app.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):
    
    # Step 1 — Find user
    db_user = db.query(User).filter(User.email == user.email).first()

    # Step 2 — If not found
    if not db_user:
        return {"error": "User not found"}

    # Step 3 — Verify password
    if not verify_password(user.password, db_user.password):
        return {"error": "Invalid password"}

    # Step 4 — Create token
    access_token = create_access_token(
        data={"sub": db_user.email}
    )

    # Step 5 — Return token
    return {
        "access_token": access_token,
        "token_type": "bearer"
    }