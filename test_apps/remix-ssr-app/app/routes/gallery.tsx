import { json } from "@remix-run/node";
import {  useLoaderData } from "@remix-run/react";

import { ImageMetadata } from "~/types";

const API_URL = 'http://127.0.0.1:8000/';

export const loader = async () => {
    const res = await fetch(API_URL + 'images-data');
    return json(await res.json());
};

export default function GalleryRoute() {
  const data: ImageMetadata[] = useLoaderData<typeof loader>();

  return (
    <div className='gallery'>
      {data.map((img) => 
        <div key={img.id} className='gallery-item'>
            <img 
                src={API_URL + img.file_name} 
                alt={img.description}  
                className='gallery-image'
            />
        </div>
      )}
    </div>
  );
}