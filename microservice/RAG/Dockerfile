# Use the official Python image from the Docker Hub
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file into the container
COPY requirements.txt .

# Install the dependencies
RUN pip install -r requirements.txt

# Copy the application code into the container
COPY . /app

# Copy the .env file
#COPY .env .env

EXPOSE 8231
# Command to run the application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8231"]