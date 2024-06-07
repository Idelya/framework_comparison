import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import Layout from "../components/layout"
import Banner from "../components/Banner"
import { BookType, HomePageData } from "../types"
import AboutUs from "../components/AboutUs"
import NewBooksList from "../components/NewBooksList"
import Form from "../components/Form"

const IndexPage: React.FC<PageProps> = () => {
  
  return (
    <Layout>
      <Banner/>
      <NewBooksList />
      <Form />
    </Layout>
  )
}

export default IndexPage

export const Head: HeadFC = () => <><title>Strona Główna</title><html lang="pl" /></>
