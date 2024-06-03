import * as React from "react"
import Layout from "../components/layout"
import type { HeadFC, PageProps } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import { BookType, ImageMetadata } from "../types";
import BookItem from "../components/BookItem";


const API_URL = 'http://127.0.0.1:8000/';

export async function getServerData() {
  try {
    const res = await fetch(API_URL + 'books');
    const books: BookType[] = await res.json();
    return {
      props: { books },
    };
  } catch (error) {
    return {
      props: { books: [] },
      status: 500,
    };
  }
}


const BooksPage: React.FC<PageProps> = ({ serverData }) => {
    const { books } = serverData;
    
  return (
    <Layout>
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
    </Layout>
  )
}

export default BooksPage

export const Head: HeadFC = () => <title>Spis książek</title>
