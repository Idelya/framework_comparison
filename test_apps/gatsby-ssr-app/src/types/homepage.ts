import { ImageMetadata } from "./gallery-types";

export type Banner = {
    image: ImageMetadata;
    title: string;
    text: string;
    list: string[];
  }
  
  // AboutUs type
export type AboutUs = {
    image1: ImageMetadata;
    image2: ImageMetadata;
    title: string;
    paragraph: string;
    list: string[];
  }
  
// HomePageData type
export type HomePageData = {
    banner: Banner;
    aboutUs: AboutUs;
}