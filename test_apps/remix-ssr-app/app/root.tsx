import { LinksFunction } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
} from "@remix-run/react";
import globalStylesUrl from "~/styles/global.css?url";
import stylesUrl from "~/styles/index.css?url";
import Header from "./components/Header";


export const links: LinksFunction = () => [
  { rel: "stylesheet", href: globalStylesUrl },
  { rel: "stylesheet", href: stylesUrl },
];


export default function App() {
  return (
    <html lang="pl">
      <head>
        <link
          rel="icon"
          href="data:image/x-icon;base64,AA"
        />
        <meta httpEquiv="Content-Language" content="pl" />
        <meta charSet="UTF-8" />
        <Meta />
        <Links />
      </head>
      <body>
        <Header />
        <main className='main'>
          <Outlet />
        </main>
        <Scripts />
      </body>
    </html>
  );
}
