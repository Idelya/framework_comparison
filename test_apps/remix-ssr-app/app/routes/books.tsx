import { MetaFunction, json } from "@remix-run/node";
import {  useLoaderData } from "@remix-run/react";
import BookItem from "~/components/BookItem";

import { BookType } from "~/types";

export const meta: MetaFunction = () => {
    return [
      { title: "Spis ksiazek" },
      { name: "description", content: "Lista ksiazek" },
    ];
  };

export const loader = async () => {
    const res = await fetch(process.env.REMIX_API_URL  + 'books');
    return json(await res.json());
};

export default function BooksRoute() {
  const data: BookType[] = useLoaderData<typeof loader>();

  return (
    <div className="table-container">
      <table className="table" >
        <caption className="table-caption">Tablica Ksiazek</caption>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tytul</th>
              <th>Autorzy</th>
              <th>Opis</th>
              <th>Kategoria</th>
              <th>Wydawca</th>
              <th>Cena od</th>
              <th>Miesiac wydania</th>
              <th>Rok wydania</th>
            </tr>
          </thead>
          <tbody>
              {data.map(item => 
                <BookItem book={item} key={item.id}/>
              )}
          </tbody>
        </table>
      </div>
  );
}