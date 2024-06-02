let myLibrary = [];
const bookTemplate = document.getElementById('template');
const main = document.getElementsByClassName('main')[0];
const newBookModal = document.getElementById('new-book-modal');
const newBookBtn = document.getElementById('new-book-btn');
const newBookSubmitBtn = document.getElementById('new-book-modal__submit-btn');
const newBookClose = document.querySelector('.new-book-modal__close');
const newBookForm = document.querySelector('#new-book-modal form');

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

function addBookToLibrary(title, author, pages, read) {
  let newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
}

function removeBookFromLibrary(e) {
  let book = e.target.parentElement;
  let i = +book.getAttribute('data-index');

  myLibrary.splice(i, 1);
  showLibrary();
}

function toggleRead(e) {
  let read_display = e.target;
  let i = +read_display.parentElement.getAttribute('data-index');

  myLibrary[i].read = !myLibrary[i].read; // flips the read boolean

  read_display.classList.remove('book__read--false');
  read_display.classList.remove('book__read--true');
  read_display.classList.add('book__read--' + myLibrary[i].read);

  saveLibrary();
}

function showLibrary() {
  let currentBooks = [...main.children];

  currentBooks.forEach((book) => {
    if (book.classList.contains('book') && book.id != 'template') {
      book.remove();
    }
  });

  for (let i = 0; i < myLibrary.length; i++) {
    let book = myLibrary[i];
    let newBook = bookTemplate.cloneNode(true);

    newBook.innerHTML = newBook.innerHTML
      .replace('%title%', book.title)
      .replace('%author%', book.author)
      .replace('%pages%', book.pages)
      .replace('book__read--false', 'book__read--' + book.read);
    newBook.style.display = 'block';
    newBook.removeAttribute('id');
    newBook.setAttribute('data-index', i);

    let closeBtn = newBook.getElementsByClassName('book__remove')[0];
    let readBtn = newBook.getElementsByClassName('book__read')[0];

    closeBtn.addEventListener('click', removeBookFromLibrary);
    readBtn.addEventListener('click', toggleRead);

    main.appendChild(newBook);
    saveLibrary();
  }
}

function saveLibrary() {
  localStorage.setItem('libraryData', JSON.stringify(myLibrary));
}

function loadLibrary() {
  const data = localStorage.getItem('libraryData');
  if (data) {
    myLibrary = JSON.parse(data);
    showLibrary();
  }
}

newBookBtn.addEventListener('click', (e) => {
  newBookModal.showModal();
});

newBookClose.addEventListener('click', (e) => {
  newBookModal.close();
});

newBookForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (newBookForm.checkValidity()) {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('done').checked;

    addBookToLibrary(title, author, pages, read);
    showLibrary();
    newBookForm.reset();
    newBookModal.close();
  }
});

newBookSubmitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  newBookForm.dispatchEvent(new Event('submit'));
});

loadLibrary();
showLibrary();
