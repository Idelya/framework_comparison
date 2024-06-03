import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Strona Bazowa" },
    { name: "description", content: "Strona wizerunkowa dla porownania frameworkow." },
  ];
};

export default function Index() {
  return (
    <h1>Welcome to Remix</h1>
  );
}
