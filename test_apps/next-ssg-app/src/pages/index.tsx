import { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import AboutUs from "~/components/AboutUs";
import Banner from "~/components/Banner";
import Form from "~/components/Form";
import NewBooksList from "~/components/NewBooksList";
import { BookType, HomePageData } from "~/types";


export const getStaticProps = (async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}books-new-list`)
  const content_res = await fetch(`${process.env.NEXT_PUBLIC_API}homepage-data`)
  const books: BookType[] = await res.json()
  const content: HomePageData = await content_res.json();
  return { props: { books, banner: content.banner, aboutUs: content.aboutUs } }
}) satisfies GetStaticProps<{ books: BookType[] }>
 


export default function Home({
  books,
  banner,
  aboutUs
}: InferGetStaticPropsType<typeof getStaticProps>) {
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
