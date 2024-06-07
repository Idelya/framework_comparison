import { graphql, useStaticQuery } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import React, { useState } from "react";

const NewBooksList: React.FC =  ()  => {
  const { allNewBook } = useStaticQuery(graphql`
  query NewBooksQuery {
      allNewBook {
        nodes {
          id
          title
          authors
          description
          category
          publisher
          priceStartingWith
          publishDateMonth
          publishDateYear
        }
      }
    }
  `);

  const [selectedBook, setSelectedBook] = useState(allNewBook.nodes[0]);

  return (
    <section className="new_books">
      <h2 className="title">Nasze nowości!</h2>
      <div  className="new_books_container">
      <ul className="new_books_list">
        {allNewBook.nodes.map((book) => 
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
            <StaticImage 
                src={'http://127.0.0.1:8000/images/book-5174879_640.jpg'} 
                alt="Zamknięta książka z kwiatami."
                style={{width: '100%'}}
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
