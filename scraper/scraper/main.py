from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from io import BytesIO
import fitz  # PyMuPDF

import json
import openai
from pathlib import Path

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
import undetected_chromedriver as uc
from selenium.webdriver.chrome.options import Options

import time
from datetime import datetime

app = FastAPI()


def read_api_key():
    try:
        with open("apikey.txt", "r") as file:
            return file.read().strip()
    except Exception as e:
        raise HTTPException(status_code=500, detail="Could not read API key")


def summarize_cv(cv_text: str):
    try:
        # Read API key and setup OpenAI
        api_key = read_api_key()
        openai.api_key = api_key

        # Define the template structure as a Python dictionary first
        template = {
            "Full Name": "",
            "Work Experience": [
                {
                    "Company": ""
                }
            ],
            "Known Programming Languages": [],
            "Skills": [],
            "Education": {
                "Degree": "",
                "Institute": "",
                "Location": "",
                "Duration": ""
            }
        }

        # Convert template to a string and create the prompt
        prompt = f"""Extract the following information and structure it as a JSON format without any markup or excess words.
Use this exact structure: {json.dumps(template, indent=2)}
Do not translate the text to english if it's not english.

Resume text:
{cv_text}"""

        response = openai.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "user", "content": prompt}
            ],
            temperature=0.7
        )

        # Parse the response to ensure valid JSON
        summary = json.loads(response.choices[0].message.content)
        return summary

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error summarizing CV: {str(e)}")


def extract_companies(cv_summary: dict) -> list:
    try:
        # Extract companies from Work Experience
        companies = [entry["Company"] for entry in cv_summary["Work Experience"]]
        return companies
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error extracting companies: {str(e)}")


def scrape_company_info(company_name: str) -> dict:
    try:
        options = uc.ChromeOptions()
        options.add_argument('--start-maximized')
        options.add_argument('--disable-gpu')
        options.add_argument('--no-sandbox')
        options.add_argument('--disable-dev-shm-usage')
        options.add_argument('--disable-blink-features=AutomationControlled')
        options.add_argument('--disable-extensions')
        options.add_argument(
            f'user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36')

        driver = uc.Chrome(options=options)
        driver.set_page_load_timeout(30)  # Increased timeout

        try:
            # Navigate and wait longer for Cloudflare
            driver.get("https://papagal.bg")
            time.sleep(5)  # Wait for Cloudflare check

            # Rest of your code remains the same
            wait = WebDriverWait(driver, 15)
            search_box = wait.until(
                EC.element_to_be_clickable((By.ID, "autocomplete-0-input"))
            )

            search_box.clear()
            search_box.send_keys(company_name)
            search_box.send_keys(Keys.RETURN)

            time.sleep(3)

            first_result = wait.until(
                EC.presence_of_element_located((By.CLASS_NAME, "fs-5.pb-2"))
            )
            first_result.click()

            cookie_selectors = [
                ".fc-button.fc-cta-consent.fc-primary-button",  # Exact class from the site
                "button[class*='fc-cta-consent']",  # Partial class match
                "button[id*='cookie']",
                "button[id*='accept']",
                "button[class*='cookie']",
                "button[class*='accept']",
                "#cookieConsent button",
                ".cookie-consent button",
                "[aria-label*='cookie'] button",
                "[aria-label*='Accept']"
            ]

            for selector in cookie_selectors:
                try:
                    cookie_button = WebDriverWait(driver, 2).until(
                        EC.element_to_be_clickable((By.CSS_SELECTOR, selector))
                    )
                    cookie_button.click()
                    print("Clicked cookie consent button")
                    break
                except:
                    continue

            text_elements = []
            wait = WebDriverWait(driver, 5)
            wait.until(EC.presence_of_element_located((By.TAG_NAME, "body")))

            # Try to get text from each element type
            selectors = ['h1', 'h2', 'h3', 'p', '.company-info', '.details']
            for selector in selectors:
                try:
                    elements = driver.find_elements(By.CSS_SELECTOR, selector)
                    if elements:
                        text_elements.extend([el.text for el in elements if el.text.strip()])
                except Exception as e:
                    print(f"Error getting {selector}: {str(e)}")
                    continue

            content = '\n'.join(text_elements) if text_elements else "No content found"

            return {
                "name": company_name,
                "details": {"text": content},
                "timestamp": datetime.now().isoformat()
            }

        except Exception as e:
            print(f"Error scraping {company_name}: {str(e)}")
            return {
                "name": company_name,
                "details": {"text": "Failed to get data"},
                "timestamp": datetime.now().isoformat()
            }
        finally:
            driver.quit()

    except Exception as e:
        print(f"Browser init error for {company_name}: {str(e)}")
        return {
            "name": company_name,
            "details": {"text": "Browser initialization failed"},
            "timestamp": datetime.now().isoformat()
        }


@app.post("/upload-user-data/")
async def upload_user_data(
        full_name: str = Form(...),
        birthdate: str = Form(...),
        cv: UploadFile = File(...)
):
    try:
        # Read the uploaded file content
        pdf_content = await cv.read()

        # Create a PDF document object from bytes
        pdf_document = fitz.open(stream=pdf_content, filetype="pdf")

        # Extract text from all pages
        pdf_text = ""
        for page in pdf_document:
            pdf_text += page.get_text()

        # Close the document
        pdf_document.close()

        # Summarize the CV
        summary = summarize_cv(pdf_text)

        # Extract companies from the CV summary
        companies = extract_companies(summary)

        company_details = []
        for company in companies:
            company_info = scrape_company_info(company)
            company_details.append(company_info)

        return {
            "full_name": full_name,
            "birthdate": birthdate,
            "cv_content": pdf_text,
            "cv_summary": summary,
            "companies": companies,
            "company_details": company_details
        }

    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error processing PDF: {str(e)}")


# Run the application
if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="127.0.0.1", port=8000, log_level="info")
