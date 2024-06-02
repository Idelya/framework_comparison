import Head from "next/head";
import Image from "next/image";
import styles from "~/styles/Home.module.css";

export default function Home() {
  return (
    <>
      <Head>
        <title>Strona Bazowa</title>
        <meta name="description" content="Strona wizerunkowa dla porównania frameworków." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='main'>
      </main>
    </>
  );
}
