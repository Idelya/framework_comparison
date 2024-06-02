import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import Image from "next/image";
import { ImageMetadata } from "~/types";

const API_URL = 'http://127.0.0.1:8000/';

export const getServerSideProps = (async () => {
  const res = await fetch(API_URL + 'images-data')
  const imagesData: ImageMetadata[] = await res.json()
  return { props: { imagesData } }
}) satisfies GetServerSideProps<{ imagesData: ImageMetadata[] }>
 

export default function Gallery({
  imagesData
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Head>
        <title>Geleria</title>
        <meta name="description" content="Galeria zdjęć" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='main'>
        <div className='gallery'>
          {imagesData.map((img) => 
            <div key={img.id} className='gallery-item'>
              <Image src={API_URL + img.file_name} alt={img.description} fill className='gallery-image'
                sizes="(max-width: 500px) 100vw, 
                       (max-width: 1000px) 50vw, 
                       25vw"/>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
