import React from "react";
import { ImageMetadata } from "~/types";

type BannerProps = {
  image: ImageMetadata;
  title: string;
  text: string;
}

const Banner: React.FC<BannerProps> = ({ image, title, text }) => {
  return (
    <div className="banner">
    <img src={process.env.GATSBY_API_URL + image.file_name} alt="Banner Image" className="banner_image"/>
      <div className="banner_content">
        <h1 className="banner_title">{title}</h1>
        <p className="banner_text">{text}</p>
      </div>
    </div>
  );
};

export default Banner;
