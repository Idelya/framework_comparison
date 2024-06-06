export type BookType = {
    id: number,
    title: string;
    authors: string;
    description?: string;
    category: string;
    publisher: string;
    priceStartingWith: string;
    publishDateMonth: string;
    publishDateYear: number;
}