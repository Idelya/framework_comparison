import * as React from "react"
import Layout from "../components/layout"
import type { HeadFC, PageProps } from "gatsby"
import { ImageMetadata } from "../types";

export async function getServerData() {
  try {
    const res = await fetch(process.env.GATSBY_API_URL + 'images-data');
    const imagesData: ImageMetadata[] = await res.json();
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
              src={process.env.GATSBY_API_URL + img.file_name}
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
