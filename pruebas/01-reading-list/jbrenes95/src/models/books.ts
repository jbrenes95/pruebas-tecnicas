export interface Root {
  library: Library;
}

export interface Library {
  book: Book;
}

export interface Book {
  title: string;
  pages: number;
  genre: string;
  cover: string;
  synopsis: string;
  year: number;
  ISBN: string;
  selected: boolean;
  author: Author;
}

export interface Author {
  name: string;
  otherBooks: string[];
}
