import React from "react";
import Image from "next/image";
import { ImageMetadata } from "~/types";

type BannerProps = {
  image: ImageMetadata;
  title: string;
  text: string;
}

const Banner: React.FC<BannerProps> = ({ image, title, text }) => {
  return (
    <div className="banner">
    <Image src={process.env.NEXT_PUBLIC_API + image.file_name} alt="Banner Image" className="banner_image" fill sizes=" 100vw"/>
      <div className="banner_content">
        <h1 className="banner_title">{title}</h1>
        <p className="banner_text">{text}</p>
      </div>
    </div>
  );
};

export default Banner;
