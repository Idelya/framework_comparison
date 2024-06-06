import { BookType } from '~/types';
import React, { useState } from 'react';
import { LoaderFunction, json } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react';

export const loader: LoaderFunction = async () => {
    const resBooks = await fetch(`${process.env.REMIX_API_URL}books-new-list`);
    const books: BookType[] = await resBooks.json();
    return json({ books, API_URL: process.env.REMIX_API_URL });
};

const NewBooksList: React.FC = () => {
  const { books, API_URL } = useLoaderData<{ books: BookType[], API_URL: string }>();
  const [selectedBook, setSelectedBook] = useState<BookType | null>(books[0]);

  return (
    <>
    <Outlet />
    <section className="new_books">
      <h2 className="title">Nasze nowości!</h2>
      <div className="new_books_container">
        <ul className="new_books_list">
          {books.map((book) => (
            <li key={book.id}>
              <button
                onClick={() => setSelectedBook(book)}
                className={`new_books_list_btn ${selectedBook?.id === book.id && 'new_books_list_btn_selected'}`}
              >
                {book.title}
              </button>
            </li>
          ))}
        </ul>
        {selectedBook && (
          <div className="selected_book_container">
            <h3>{selectedBook.title}</h3>
            <div className="selected_book_details_container">
              <img
                src={API_URL + 'images/book-5174879_640.jpg'}
                alt="Zamknięta książka z kwiatami."
              />
              <div className="selected_book_container_description">
                <p>{selectedBook.description || "Brak opisu."}</p>
              </div>
            </div>
            <span className="price">
              Cena: {selectedBook.priceStartingWith}
            </span>
          </div>
        )}
      </div>
    </section>
    </>
  );
};

export default NewBooksList;
