import { useStaticQuery, graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React from "react";


const Banner: React.FC = () => {

  const { bannerData } = useStaticQuery(graphql`
  query BannerQuery {
    bannerData {
      localFile {
        childImageSharp {
          gatsbyImageData
        }
      }
      text
      title
    }
  }
`);

const { localFile, title, text} = bannerData;

  return (
    <div className="banner">
    <GatsbyImage image={getImage(localFile.childImageSharp.gatsbyImageData)} alt="Banner Image" className="banner_image"/>
      <div className="banner_content">
        <h1 className="banner_title">{title}</h1>
        <p className="banner_text">{text}</p>
      </div>
    </div>
  );
};

export default Banner;

