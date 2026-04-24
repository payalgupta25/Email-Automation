from fastapi import FastAPI, UploadFile, File, Form, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from dotenv import load_dotenv
from email.message import EmailMessage
import smtplib
import os

from database import engine, Base, SessionLocal
from models import User, EmailLog
from schemas import UserCreate
from auth import hash_password, verify_password, create_access_token, get_current_user

# Initialize DB
Base.metadata.create_all(bind=engine)

load_dotenv()

app = FastAPI()

# DB dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

EMAIL = os.getenv("EMAIL")
PASSWORD = os.getenv("PASSWORD")


@app.get("/")
def home():
    return {"message": "AI Email Agent Backend Running"}


# ✅ SEND EMAIL + SAVE TO DB
@app.post("/send-email")
async def send_email(
    current_user: str = Depends(get_current_user),
    db: Session = Depends(get_db),  # 🔥 FIXED
    email: str = Form(...),
    subject: str = Form(...),
    body: str = Form(...),
    resume: UploadFile = File(...)
):
    # Save file
    os.makedirs("uploads", exist_ok=True)
    file_path = f"uploads/{resume.filename}"

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
        msg.add_attachment(
            f.read(),
            maintype="application",
            subtype="pdf",
            filename=resume.filename
        )

    # Send email
    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as smtp:
        smtp.login(EMAIL, PASSWORD)
        smtp.send_message(msg)

    # Save to DB
    new_email = EmailLog(
        to_email=email,
        subject=subject,
        body=body,
        user_email=current_user
    )

    db.add(new_email)
    db.commit()

    return {"message": "Email sent successfully"}


# ✅ GET EMAIL HISTORY
@app.get("/emails")
def get_emails(
    current_user: str = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return db.query(EmailLog).filter(EmailLog.user_email == current_user).all()


# ✅ SIGNUP
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


# ✅ LOGIN
@app.post("/login")
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    db_user = db.query(User).filter(User.email == form_data.username).first()

    if not db_user:
        return {"error": "User not found"}

    if not verify_password(form_data.password, db_user.password):
        return {"error": "Invalid password"}

    access_token = create_access_token(
        data={"sub": db_user.email}
    )

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }