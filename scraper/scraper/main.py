from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from io import BytesIO
import fitz  # PyMuPDF
import openai
import re

app = FastAPI()
with open('apikey.txt', 'r') as file:
    api_key = file.read().strip()

OPENAI_API_KEY = api_key
client = openai.OpenAI(api_key=OPENAI_API_KEY)


def clean_text(text: str) -> str:
    """Cleans extracted text by removing special symbols and ensuring readability."""
    text = text.replace("\ufb01", "fi").replace("\ufb02", "fl")  # Fix common ligatures
    text = re.sub(r'[^\x20-\x7E\n]', '', text)  # Keep only printable ASCII and newlines
    return text.strip()


def extract_information(cv_text: str) -> dict:
    """Sends the extracted CV text to OpenAI and returns structured information."""
    prompt = f"""
    Extract the following information from the given resume text:
    - Full Name
    - Work Experience (Company names, positions, duration)
    - Known Programming Languages
    - Skills
    - Education

    Resume text:
    {cv_text}
    """

    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "system", "content": "You are an AI that extracts structured information from resumes."},
                      {"role": "user", "content": prompt}]
        )
        return response.choices[0].message.content
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"OpenAI API error: {str(e)}")


@app.post("/upload-user-data/")
async def upload_user_data(
        full_name: str = Form(...),
        birthdate: str = Form(...),
        cv: UploadFile = File(...)
):
    """Receives user data: full name, birthdate, and CV PDF file."""

    # Read file content
    file_content = await cv.read()
    pdf_stream = BytesIO(file_content)
    text_content = ""

    pdf_document = fitz.open(stream=pdf_stream, filetype="pdf")
    for page in pdf_document:
        text_content += page.get_text("text") + "\n"

    # Clean extracted text
    text_content = clean_text(text_content)

    # Get structured information
    structured_data = extract_information(text_content)

    return {
        "full_name": full_name,
        "birthdate": birthdate,
        "cv_analysis": structured_data
    }
