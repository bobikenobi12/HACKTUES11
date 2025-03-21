# Base image
FROM selenium/standalone-chrome
USER root
RUN apt-get update && apt install python3-pip -y && apt remove pip
# && apt-get install virtualenv python3.12-venv -y 

#RUN wget https://bootstrap.pypa.io/get-pip.py -O get-pip.py
#RUN python3 get-pip.py 
RUN python3 -m pip install selenium --break-system-packages

# Set working directory
WORKDIR /app

# RUN python3 -m venv ./venv
# RUN source ./venv/bin/activate



# Install Chrome and dependencies



# Copy requirements and install dependencies
COPY requirements.txt .
RUN python3 -m pip install -r requirements.txt --break-system-packages

# Copy application code
COPY main.py .
COPY apikey.txt .

# Set environment variables
# ENV PYTHONUNBUFFERED=1
# ENV CHROME_BIN=/usr/bin/chromium
# ENV CHROME_DRIVER=/usr/bin/chromedriver
# ENV DISPLAY=:99

# Expose port
EXPOSE 8000

# # Create entrypoint script
# RUN echo '#!/bin/bash\nXvfb :99 -screen 0 1024x768x16 &\npython main.py' > /app/entrypoint.sh
# RUN chmod +x /app/entrypoint.sh

# Run the application
ENTRYPOINT [ "python3", "main.py" ]

