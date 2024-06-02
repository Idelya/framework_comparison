import Head from "next/head";
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { BookType } from "~/types";
import BookItem from "~/components/BookItem";
 
export const getServerSideProps = (async () => {
  const res = await fetch('http://127.0.0.1:8000/books')
  const books: BookType[] = await res.json()
  return { props: { books } }
}) satisfies GetServerSideProps<{ books: BookType[] }>
 

export default function Books({
    books,
  }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Head>
        <title>Spis książek</title>
        <meta name="description" content="Lista książek" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='main'>
      <div className="table-container">
        <table className="table" >
          <caption className="table-caption">Tablica Książek</caption>
            <thead>
              <tr>
                <th>ID</th>
                <th>Tytuł</th>
                <th>Autorzy</th>
                <th>Opis</th>
                <th>Kategoria</th>
                <th>Wydawca</th>
                <th>Cena od</th>
                <th>Miesiąc wydania</th>
                <th>Rok wydania</th>
              </tr>
            </thead>
            <tbody>
              {books.map(item => 
                <BookItem book={item} key={item.id}/>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
