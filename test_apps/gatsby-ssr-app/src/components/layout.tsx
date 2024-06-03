import React, { PropsWithChildren } from "react"
import "./global.css"
import "./layout.css"

export default function Layout({ children }: PropsWithChildren<{}>) {
  return <main className="main">{children}</main>
}