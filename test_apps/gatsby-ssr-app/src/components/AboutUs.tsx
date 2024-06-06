import React from "react";
import { ImageMetadata } from "~/types";

interface AboutUsProps {
  image1: ImageMetadata;
  image2: ImageMetadata;
  title: string;
  paragraph: string;
  list: string[];
}

const AboutUs: React.FC<AboutUsProps> = ({ image1, image2, title, paragraph, list }) => {
  return (
    <section className="aboutus">
      <h2 className="title">{title}</h2>
      <div className="aboutus-content-wrapper">
        <div className="aboutus-image-wrapper">
          <img src={process.env.GATSBY_API_URL + image1.file_name} alt={image1.description} className="aboutus-image" />
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
          <img src={process.env.GATSBY_API_URL + image2.file_name} alt={image2.description} className="aboutus-image" />
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
