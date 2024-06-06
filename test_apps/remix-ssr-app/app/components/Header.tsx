import { NavLink } from "@remix-run/react";

export default function Header() {
  return (
    <header className="header">
        <nav className="nav">
          <NavLink to="/" className="nav_link">O nas</NavLink>
          <NavLink to="/books" className="nav_link">Spis książek</NavLink>
          <NavLink to="/gallery" className="nav_link">Galeria</NavLink>
        </nav>
    </header>
  );
}