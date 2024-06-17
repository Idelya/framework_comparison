import React from "react";
import { ImageMetadata } from "~/types";

type BannerProps = {
  image: ImageMetadata;
  title: string;
  text: string;
  apiUrl: string;
}


const Banner: React.FC<BannerProps> = ({ image, title, text, apiUrl }) => {
  return (
    <div className="banner">
    <img src={apiUrl + image.file_name} alt="Banner" className="banner_image"/>
      <div className="banner_content">
        <h1 className="banner_title">{title}</h1>
        <p className="banner_text">{text}</p>
      </div>
    </div>
  );
};

export default Banner;
