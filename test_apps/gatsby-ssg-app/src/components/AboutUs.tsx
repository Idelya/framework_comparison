import { useStaticQuery, graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React from "react";

const AboutUs: React.FC = () => {
  const { aboutUsData } = useStaticQuery(graphql`
  query AboutUsDataQuery {
    aboutUsData {
      childrenImageDataAboutUs {
        id
        localFile {
          childImageSharp {
            gatsbyImageData(width: 750, quality: 100, placeholder: BLURRED)
          }
        }
      }
      image1 {
        description
      }
      image2 {
        description
      }
      title
      list
      paragraph
    }
    }
  `);
  const { title, paragraph, list, childrenImageDataAboutUs, image1, image2 } = aboutUsData;

  return (
    <section className="aboutus">
      <h2 className="title">{title}</h2>
      <div className="aboutus-content-wrapper">
        <div className="aboutus-image-wrapper">
          <GatsbyImage image={getImage(childrenImageDataAboutUs[0].localFile.childImageSharp.gatsbyImageData)} alt={image1.description} className="aboutus-image" />
        </div>
        <p className="aboutus-paragraph">{paragraph}</p>
      </div>
      <div className="aboutus-content-wrapper">
        <ul className="aboutus-list">
          {list.map((item, index) => (
            <li key={index} className="aboutus-list-item">{item}</li>
          ))}
        </ul>
        <div className="aboutus-image-wrapper">
          <GatsbyImage image={getImage(childrenImageDataAboutUs[1].localFile.childImageSharp.gatsbyImageData)} alt={image2.description} className="aboutus-image" />
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
