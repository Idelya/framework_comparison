import * as React from "react"
import Layout from "../components/layout"
import { graphql, type HeadFC } from "gatsby"
import BookItem from "../components/BookItem";

type BooksPageProps = {
  data: {
    allBook: {
      nodes: Array<{    
        id: string,
        title: string;
        authors: string;
        description?: string;
        category: string;
        publisher: string;
        priceStartingWith: string;
        publishDateMonth: string;
        publishDateYear: number;
      }>
    }
  }
}
const BooksPage: React.FC<BooksPageProps> = ({ data }) => {
  const { allBook } = data;
    
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
            {allBook.nodes.map(item => 
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

export const query = graphql`
  query {
    allBook {
      nodes {
        id
        title
        authors
        description
        category
        publisher
        priceStartingWith
        publishDateMonth
        publishDateYear
      }
    }
  }
`
