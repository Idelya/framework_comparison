import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import Image from "next/image";
import AboutUs from "~/components/AboutUs";
import Banner from "~/components/Banner";
import Form from "~/components/Form";
import NewBooksList from "~/components/NewBooksList";
import styles from "~/styles/Home.module.css";
import { BookType, HomePageData } from "~/types";


export const getServerSideProps = (async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}books-new-list`)
  const content_res = await fetch(`${process.env.NEXT_PUBLIC_API}homepage-data`)
  const books: BookType[] = await res.json()
  const content: HomePageData = await content_res.json();
  return { props: { books, banner: content.banner, aboutUs: content.aboutUs } }
}) satisfies GetServerSideProps<{ books: BookType[] }>
 


export default function Home({
  books,
  banner,
  aboutUs
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Head>
        <title>Strona Główna</title>
        <meta name="description" content="Strona wizerunkowa dla porównania frameworków." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='main'>
        <Banner {...banner} />
        <AboutUs {...aboutUs} />
        <NewBooksList newBooks={books} />
        <Form />
      </main>
    </>
  );
}
