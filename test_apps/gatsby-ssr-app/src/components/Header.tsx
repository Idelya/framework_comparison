import { Link } from "gatsby";
import React from "react";

export default function Header() {
  return (
    <header className="header">
        <nav className="nav">
          <Link to="/" className="nav_link">O nas</Link>
          <Link to="/books" className="nav_link">Spis książek</Link>
          <Link to="/gallery" className="nav_link">Galeria</Link>
        </nav>
    </header>
  );
}