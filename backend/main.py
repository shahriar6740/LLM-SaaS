from typing import Union

from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from fastapi.responses import JSONResponse
from s3_utility import upload_file_to_s3
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

app = FastAPI()

# Set up CORS
origins = [
    "http://localhost",
    "http://localhost:5173",  # Frontend
    "http://localhost:8095",  # payment
    "http://localhost:8231",  # RAG
    # Add other origins as needed
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.post("/secure-upload/")
async def upload_file(user_id: str = Form(...), file: UploadFile = File(...)):
    if not user_id or not file:
        raise HTTPException(status_code=400, detail="User ID and file must be provided")

    try:
        file_key = upload_file_to_s3(file.file, user_id, file.filename)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    return JSONResponse(content={"file_key": file_key})


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8532)