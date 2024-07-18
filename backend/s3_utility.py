import boto3
from fastapi import HTTPException
from datetime import datetime
from dotenv import load_dotenv
import os

load_dotenv()

AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_ACCESS_KEY")
AWS_REGION = os.getenv("AWS_REGION")
S3_BUCKET_NAME = os.getenv("S3_BUCKET_NAME")

s3_client = boto3.client(
    's3',
    aws_access_key_id=AWS_ACCESS_KEY_ID,
    aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
    region_name=AWS_REGION
)


def upload_file_to_s3(file, user_id: str, filename: str):
    timestamp = datetime.utcnow().strftime('%Y%m%d%H%M%S')
    key = f"{S3_BUCKET_NAME}/{user_id}/{filename}_{timestamp}"

    try:
        s3_client.upload_fileobj(file, S3_BUCKET_NAME, key)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    return key
