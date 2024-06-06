import { json } from "@remix-run/node";
import {  useLoaderData } from "@remix-run/react";

import { ImageMetadata } from "~/types";

export const loader = async () => {
    const res = await fetch(process.env.REMIX_API_URL  + 'images-data');
    const images: ImageMetadata[]  = await res.json();
    return json({ images, API_URL: process.env.REMIX_API_URL });
};

export default function GalleryRoute() {
  const { images, API_URL }: ImageMetadata[] = useLoaderData<typeof loader>();

  return (
    <div className='gallery'>
      {images.map((img) => 
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