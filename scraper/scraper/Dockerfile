# Base image
FROM selenium/standalone-chrome
USER root

# Update and install necessary dependencies
RUN apt-get update && apt install python3-pip -y && apt remove pip
# && apt-get install virtualenv python3.12-venv -y

#RUN wget https://bootstrap.pypa.io/get-pip.py -O get-pip.py
#RUN python3 get-pip.py
#RUN python3 -m pip install selenium --break-system-packages

RUN python3 -m pip install selenium --break-system-packages

# Set working directory
WORKDIR /app

# Download and install ChromeDriver
RUN wget https://storage.googleapis.com/chrome-for-testing-public/136.0.7064.0/linux64/chrome-headless-shell-linux64.zip \
    && unzip chrome-headless-shell-linux64.zip \
    && mv chrome-headless-shell-linux64/chrome-headless-shell /usr/bin/chrome-headless-shell \
    && chmod +x /usr/bin/chrome-headless-shell \
    && rm -rf chrome-headless-shell-linux64.zip chrome-headless-shell-linux64

# Copy requirements and install dependencies
COPY requirements.txt .
RUN python3 -m pip install -r requirements.txt --break-system-packages

# Copy application code
COPY main.py .
COPY apikey.txt .

# Set environment variables
ENV PYTHONUNBUFFERED=1
ENV CHROME_BIN=/usr/bin/google-chrome
ENV CHROME_DRIVER=/usr/bin/chromedriver
ENV DISPLAY=:99

# Expose port
EXPOSE 8000

# Run the application
ENTRYPOINT [ "python3", "main.py" ]
