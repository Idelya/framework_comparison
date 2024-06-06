import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import Layout from "../components/layout"
import Banner from "../components/Banner"
import { BookType, HomePageData } from "../types"
import AboutUs from "../components/AboutUs"
import NewBooksList from "../components/NewBooksList"
import Form from "../components/Form"



export async function getServerData() {
  try {
    const res = await fetch(`${process.env.GATSBY_API_URL}homepage-data`)
    const res_books = await fetch(`${process.env.GATSBY_API_URL}books-new-list`)
    const content: HomePageData = await res.json();
    const books: BookType[] = await res_books.json();
    return {
      props: { banner: content.banner,  aboutUs: content.aboutUs, books },
    };
  } catch (error) {
    return {
      props: { imagesData: [] },
      status: 500,
    };
  }
}

const IndexPage: React.FC<PageProps> = ({ serverData }) => {
  const { books, banner, aboutUs } = serverData;

  return (
    <Layout>
      <Banner {...banner} />
      <AboutUs {...aboutUs} />
      <NewBooksList newBooks={books}/>
      <Form />
    </Layout>
  )
}

export default IndexPage

export const Head: HeadFC = () => <><title>Strona Główna</title><html lang="pl" /></>
