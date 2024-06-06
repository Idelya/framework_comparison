import { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import Image from "next/image";
import { ImageMetadata } from "~/types";

export const getStaticProps = (async () => {
  const res = await fetch(process.env.NEXT_PUBLIC_API + 'images-data')
  const imagesData: ImageMetadata[] = await res.json()
  return { props: { imagesData } }
}) satisfies GetStaticProps<{ imagesData: ImageMetadata[] }>
 

export default function Gallery({
  imagesData
}: InferGetStaticPropsType<typeof getStaticProps>) {
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
              <Image src={process.env.NEXT_PUBLIC_API + img.file_name} alt={img.description} fill className='gallery-image'
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
