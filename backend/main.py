from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import smtplib
import os
from dotenv import load_dotenv
from email.message import EmailMessage # as we now require file uploads

load_dotenv()

app = FastAPI()

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