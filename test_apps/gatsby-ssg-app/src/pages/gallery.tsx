import * as React from "react"
import Layout from "../components/layout"
import { graphql, PageProps } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

type GalleryPageProps = {
  data: {
    allImageData: {
      nodes: Array<{
        id: string,
        file_name: string;
        description: string,
        localFile: {
          publicURL: string,
          childImageSharp: {
            gatsbyImageData: any,
          }
        }
      }>
    }
  }
}

const GalleryPage: React.FC<PageProps<GalleryPageProps>> = ({ data }) => {
  const { allImageData } = data;

  return (
    <Layout>
      <div className='gallery'>
        {allImageData.nodes.map((img) => <div key={img.id} className='gallery-item'>
            {img.localFile.childImageSharp ? (
              <GatsbyImage
                image={getImage(img.localFile.childImageSharp.gatsbyImageData)}
                alt={img.description}
                className='gallery-image'
              />
            ) : (
              <img
                src={img.localFile.publicURL}
                alt={img.description}
                className='gallery-image'
              />
            )}
          </div>
        )}
      </div>
    </Layout>
  )
}

export default GalleryPage

export const Head = () => <title>Galeria</title>

export const query = graphql`
  query {
    allImageData {
      nodes {
        id
        file_name
        description
        localFile {
          publicURL
          childImageSharp {
            gatsbyImageData(width: 750, quality: 100, placeholder: BLURRED)
          }
        }
      }
    }
  }
`
