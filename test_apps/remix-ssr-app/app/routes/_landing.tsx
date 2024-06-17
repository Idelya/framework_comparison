import { json, type MetaFunction } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import AboutUs from "~/components/AboutUs";
import Banner from "~/components/Banner";
import { HomePageData } from "~/types";

export const meta: MetaFunction = () => {
  return [
    { title: "Strona Bazowa" },
    { name: "description", content: "Strona wizerunkowa dla porownania frameworkow." },
  ];
};

export const loader = async () => {
  const res = await fetch(`${process.env.REMIX_API_URL}homepage-data`)
  const content: HomePageData = await res.json();

  return json({banner: content.banner,  aboutUs: content.aboutUs, API_URL: process.env.REMIX_API_URL });
};

export default function Index() {
  const { banner, aboutUs, API_URL } = useLoaderData<HomePageData & { API_URL: string }>();
  
  return (
    <>
      <Banner {...banner} apiUrl={API_URL} />
      <AboutUs {...aboutUs} apiUrl={API_URL} />
      <Outlet />
    </>
  );
}
