import Link from "next/link";

export default function Header() {
  return (
    <header className="header">
        <nav className="nav">
          <Link href="/" className="nav_link">O nas</Link>
          <Link href="/books" className="nav_link">Spis książek</Link>
          <Link href="/gallery" className="nav_link">Galeria</Link>
        </nav>
    </header>
  );
}