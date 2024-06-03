import * as React from "react"
import Layout from "../components/layout"
import type { HeadFC, PageProps } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import { ImageMetadata } from "../types";


const API_URL = 'http://127.0.0.1:8000/';

export async function getServerData() {
  try {
    const res = await fetch(API_URL + 'images-data');
    const imagesData: ImageMetadata = await res.json();
    return {
      props: { imagesData },
    };
  } catch (error) {
    return {
      props: { imagesData: [] },
      status: 500,
    };
  }
}


const GalleryPage: React.FC<PageProps> = ({ serverData }) => {
    const { imagesData } = serverData;
    
  return (
    <Layout>
      <div className='gallery'>
        {imagesData.map((img) => 
          <div key={img.id} className='gallery-item'>
            <img
              src={API_URL + img.file_name}
              alt={img.description}
              className='gallery-image'
            />
          </div>
        )}
      </div>
    </Layout>
  )
}

export default GalleryPage

export const Head: HeadFC = () => <title>Galeria</title>
