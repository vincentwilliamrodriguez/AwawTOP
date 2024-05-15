const myLibrary = [];
const bookTemplate = document.getElementById("template");
const main = document.getElementsByClassName("main")[0];

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

function removeBookFromLibrary(e) {
  let book = e.target.parentElement;
  let i = +book.getAttribute("data-index");

  myLibrary.splice(i, 1);
  showLibrary();
}

function toggleRead(e) {
  let read_display = e.target;
  let i = +read_display.parentElement.getAttribute("data-index");

  myLibrary[i].read = !myLibrary[i].read; // flips the read boolean

  read_display.classList.remove('book__read--false');
  read_display.classList.remove('book__read--true');
  read_display.classList.add('book__read--' + myLibrary[i].read);
}

function showLibrary() {
  let currentBooks = [...main.children];

  currentBooks.forEach(book => {
    if (book.id != "template") {
      book.remove();
    }
  });

  for (let i = 0; i < myLibrary.length; i++) {
    let book = myLibrary[i];
    let newBook = bookTemplate.cloneNode(true);

    newBook.innerHTML = newBook.innerHTML.replace("%title%", book.title)
                                         .replace("%author%", book.author)
                                         .replace("%pages%", book.pages)
                                         .replace("book__read--false", "book__read--" + book.read);
    newBook.style.display = "block";
    newBook.removeAttribute("id");
    newBook.setAttribute("data-index", i);

    let closeBtn = newBook.getElementsByClassName("book__remove")[0];
    let readBtn = newBook.getElementsByClassName("book__read")[0];
    console.log(readBtn)
    closeBtn.addEventListener("click", removeBookFromLibrary);
    readBtn.addEventListener("click", toggleRead);

    main.appendChild(newBook);
  }

}

addBookToLibrary("Awaw", "Awsh", 50, true);
addBookToLibrary("Lord Of The Rings", "J.R.R. Tolkien", 200, false);
addBookToLibrary("How To Win Friends and Influence People", "Dale Carnegie", 300, true);
addBookToLibrary("Learning How to Learn", "Barbara Oakley", 250, false);
showLibrary()
