const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
  let newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
}

addBookToLibrary("Awaw", "Awsh", 50, false);
addBookToLibrary("LOTR", "Tolkien", 200, false);
addBookToLibrary("How To Win Friends and Influence People", "Dale Carnegie", 300, true);
addBookToLibrary("Learning How to Learn", "Barbara Oakley", 250, false);
