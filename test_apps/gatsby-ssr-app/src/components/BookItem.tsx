import React from "react";
import { BookType } from "../types";

type Props = {
    book: BookType;
  };

export default function BookItem({ book }: Props) {
  return (
    <tr key={book.id}>
      <td>{book.id}</td>
      <td>{book.title}</td>
      <td>{book.authors}</td>
      <td>{book.description}</td>
      <td>{book.category}</td>
      <td>{book.publisher}</td>
      <td>{book.priceStartingWith}</td>
      <td>{book.publishDateMonth}</td>
      <td>{book.publishDateYear}</td>
    </tr>
  );
}