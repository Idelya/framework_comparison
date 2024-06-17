import React, { useState } from "react";
import { BookType } from "~/types";

type NewBooksListProps = {
  newBooks: BookType[]
}

const NewBooksList: React.FC<NewBooksListProps> =  ({ newBooks })  => {
    const [selectedBook, setSelectedBook] = useState(newBooks[0]);

  return (
    <section className="new_books">
      <h2 className="title">Nasze nowości!</h2>
      <div  className="new_books_container">
      <ul className="new_books_list">
        {newBooks.map((book) => 
            (<li key={book.id}>
                <button onClick={() => setSelectedBook(book)} className={`new_books_list_btn ${selectedBook.id === book.id && 'new_books_list_btn_selected'}`}>
                    {book.title}
                </button>
            </li>)
        )}
      </ul>
      <div className="selected_book_container">
        <h3>{selectedBook.title}</h3>
        <div className="selected_book_details_container">
            <img 
                src={process.env.GATSBY_API_URL + 'images/book-5174879_640.jpg'} 
                alt="Zamknięta książka z kwiatami."
            />
            <div className="selected_book_container_description">
                <p>{selectedBook.description || "Brak opisu."}</p>
            </div>
        </div>
        <span className="price">Cena: { selectedBook.priceStartingWith}</span>
      </div>
      </div>
    </section>
  );
};

export default NewBooksList;
