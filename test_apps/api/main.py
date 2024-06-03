from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from typing import List, Optional
import pandas as pd
import json
import random

app = FastAPI()
app.mount("/images", StaticFiles(directory="./images"), name='images')

class Book(BaseModel):
    id: int
    title: str
    authors: str
    description: Optional[str] = ""
    category: str
    publisher: str
    priceStartingWith: str
    publishDateMonth: str
    publishDateYear: int

class ImageMetadata(BaseModel):
    title: str
    id: str
    description: str
    file_name: str

def normalize_text(text: str) -> str:
    if isinstance(text, str):
        return text.replace('\u2028', '').replace('â€”', '—').replace('â€¨', '')
    return text

def read_csv():
    try:
        df = pd.read_csv('BooksDatasetClean.csv')
        
        df.columns = df.columns.str.strip()
        for col in df.columns:
            if df[col].dtype == 'object':
                df[col] = df[col].str.strip()
                df[col] = df[col].apply(normalize_text)
        
        df = df.fillna({
            'Description': "",
            'Price Starting With ($)': "0.00",
            'Publish Date (Month)': "Unknown",
            'Publish Date (Year)': 0,
            'Category': "",
            'Publisher': ""  
        })
        
        df = df.rename(columns={
            'Price Starting With ($)': 'priceStartingWith',
            'Publish Date (Month)': 'publishDateMonth',
            'Publish Date (Year)': 'publishDateYear',
            'Publisher': 'publisher',
            'Category': 'category',
            'Description': 'description',
            'Authors': 'authors',
            'Title': 'title',
        })

        df.insert(0, 'id', range(1, len(df) + 1))

        return df
    except Exception as e:
        print(f"Error reading CSV file: {e}")
        raise

def read_json():
    try:
        with open('gallery.json', 'r') as file:
            return json.load(file)
    except Exception as e:
        print(f"Error reading JSON file: {e}")
        raise

try:
    df = read_csv()
except Exception as e:
    df = None
    print(f"Failed to load CSV at startup: {e}")

try:
    image_data = read_json()
except Exception as e:
    image_data = None
    print(f"Failed to load JSON at startup: {e}")

@app.get("/books", response_model=List[Book])
async def get_books():
    try:
        if df is None:
            raise HTTPException(status_code=500, detail="CSV file not loaded")

        df['priceStartingWith'] = df['priceStartingWith'].astype(str)

        books = df.to_dict(orient='records')

        return books
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing request: {e}")

@app.get("/images-data", response_model=List[ImageMetadata])
async def get_images():
    try:
        if image_data is None:
            raise HTTPException(status_code=500, detail="JSON file not loaded")
        
        shuffled_images = image_data.copy()
        random.shuffle(shuffled_images)
        
        return shuffled_images
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing request: {e}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, log_level="debug")
