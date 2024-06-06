import React, { PropsWithChildren } from "react"
import "../styles/globals.css"
import "../styles/styles.css"
import Header from "./Header"

export default function Layout({ children }: PropsWithChildren<{}>) {
  return (
    <>
      <Header />
      <main className="main">{children}</main>
    </>
  );
}