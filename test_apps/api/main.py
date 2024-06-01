from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import pandas as pd

app = FastAPI()

class Book(BaseModel):
    Title: str
    Authors: str
    Description: Optional[str] = ""
    Category: str
    Publisher: str
    Price_Starting_With: str
    Publish_Date_Month: str
    Publish_Date_Year: int

def read_csv():
    try:
        df = pd.read_csv('BooksDatasetClean.csv')
        
        df.columns = df.columns.str.strip()
        for col in df.columns:
            if df[col].dtype == 'object':
                df[col] = df[col].str.strip()
        
        df = df.fillna({
            'Description': "",
            'Price Starting With ($)': "0.00",
            'Publish Date (Month)': "Unknown",
            'Publish Date (Year)': 0,
            'Category': "",
            'Publisher': ""  
        })
        
        df = df.rename(columns={
            'Price Starting With ($)': 'Price_Starting_With',
            'Publish Date (Month)': 'Publish_Date_Month',
            'Publish Date (Year)': 'Publish_Date_Year'
        })

        return df
    except Exception as e:
        print(f"Error reading CSV file: {e}")
        raise

try:
    df = read_csv()
except Exception as e:
    df = None
    print(f"Failed to load CSV at startup: {e}")

@app.get("/books", response_model=List[Book])
async def get_books():
    try:
        if df is None:
            raise HTTPException(status_code=500, detail="CSV file not loaded")

        df['Price_Starting_With'] = df['Price_Starting_With'].astype(str)

        books = df.to_dict(orient='records')

        return books
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing request: {e}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, log_level="debug")
