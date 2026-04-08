const htmlLibrary = document.getElementById("libraryTable");
const registerBtn = document.getElementById("registerBtn");
const nameInput = document.getElementById("name");
const authorInput = document.getElementById("author");
const publishedYearInput = document.getElementById("publishedYear");
publishedYear.setAttribute("max", new Date().getFullYear().toString());
const genreInput = document.getElementById("genre");
const numOfPagesInput = document.getElementById("numOfPages");
const copiesSoldInput = document.getElementById("copiesSold");
const readInput = document.getElementById("read");
const addBookBtn = document.getElementById("addBookBtn");
const htmlForm = document.getElementById("form");
const htmlDialog = document.getElementById("dialog");
const dialogOpener = document.getElementById("dialogOpener");
const dialogCloser = document.getElementById("dialogCloser");
let myLibrary = [];

/*function Book(name, author, publishYear, genre, numOfPages, copiesSold, read) {
  this.id = crypto.randomUUID();
  this.name = name;
  this.author = author;
  this.publishYear = publishYear;
  this.genre = genre;
  this.numOfPages = numOfPages;
  this.copiesSold = copiesSold;
  this.read = read;
  this.toggleRead = function (){
    if(this.read){
      this.read = false;
    } else if(!this.read){
      this.read = true;
    }
  };
}*/

class Book {
  constructor(
    name,
    author,
    publishedYear,
    genre,
    numOfPages,
    copiesSold,
    read,
  ) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.author = author;
    this.publishedYear = publishedYear;
    this.genre = genre;
    this.numOfPages = numOfPages;
    this.copiesSold = copiesSold;
    this.read = read;
  }
  toggleRead() {
    this.read = this.read ? (this.read = false) : (this.read = true);
  }
}

function addBookToLibrary(
  name,
  author,
  publishedYear,
  genre,
  numOfPages,
  copiesSold,
  read,
) {
  const bookObj = new Book(
    name,
    author,
    publishedYear,
    genre,
    numOfPages,
    copiesSold,
    read,
  );
  myLibrary.push(bookObj);
  return bookObj;
}

addBookToLibrary(
  "Harry Potter and the Philosopher's Stone",
  "J. K. Rowling",
  1997,
  "Fiction",
  223,
  "Millions",
  true,
);
addBookToLibrary("Foo", "Mr.bar", 1996, "Fiction", 400, "Millions", false);

function addBookToTable(object) {
  if (!object) {
    return "invalid or undefined Object";
  }
  const tableRow = document.createElement("tr");
  tableRow.setAttribute("id", object.id);
  tableRow.innerHTML = `
                      <td>${object.name}</td>
                      <td>${object.author}</td>
                      <td>${object.publishedYear}</td>
                      <td>${object.genre}</td>
                      <td>${object.numOfPages}</td>
                      <td>${object.copiesSold}</td>
                      <td class="readTD">${
                        object.read
                          ? `<svg class='icon green' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>check-bold</title><path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z" /></svg>`
                          : `<svg class='icon red' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>close-circle</title><path d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z" /></svg>`
                      }</td>
                    `;

  const readButton = document.createElement("button");
  readButton.textContent = "Toggle Read";

  readButton.addEventListener("click", () => {
    const readTD = document.querySelector(
      `table tr[id="${object.id}"] > td.readTD`,
    );
    object.toggleRead();
    readTD.innerHTML = object.read
      ? `<svg class='icon green' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>check-bold</title><path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z" /></svg>`
      : `<svg class='icon red' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>close-circle</title><path d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z" /></svg>`;
    console.log(object.read);
  });

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";

  deleteButton.addEventListener("click", (e) => {
    const tableSelected = document.getElementById(object.id);
    tableSelected.remove();
    myLibrary = myLibrary.filter((obj) => obj.id === object.id);
  });

  let buttonTd = document.createElement("td");
  buttonTd.appendChild(deleteButton);
  tableRow.appendChild(buttonTd);

  buttonTd = document.createElement("td");
  buttonTd.appendChild(readButton);
  tableRow.appendChild(buttonTd);

  htmlLibrary.appendChild(tableRow);
}
myLibrary.forEach((element) => {
  addBookToTable(element);
});

addBookBtn.addEventListener("click", (e) => {
  console.log(htmlForm.checkValidity());
  if (!htmlForm.checkValidity()) {
    htmlForm.reportValidity();
    return;
  }
  e.preventDefault();
  const bookToAdd = addBookToLibrary(
    nameInput.value,
    authorInput.value,
    publishedYearInput.value,
    genreInput.value,
    numOfPagesInput.value,
    copiesSoldInput.value,
    readInput.value,
  );
  htmlForm.reset();
  addBookToTable(bookToAdd);
  htmlDialog.close();
});

dialogOpener.addEventListener("click", (e) => {
  htmlDialog.showModal();
});

dialogCloser.addEventListener("click", () => {
  htmlDialog.close();
  htmlForm.reset();
});

// Form custom validation

nameInput.setCustomValidity("Please enter a Book Name");
authorInput.setCustomValidity("Please enter a Author Name");
publishedYearInput.setCustomValidity("Please enter the Published year");
numOfPagesInput.setCustomValidity("Please enter the Number of pages");

nameInput.addEventListener("input", (event) => {
  console.log(nameInput.validity);
  if (nameInput.validity.valueMissing) {
    nameInput.setCustomValidity("Please enter a Book Name");
  } else {
    nameInput.setCustomValidity("");
  }
});

authorInput.addEventListener("input", (event) => {
  if (authorInput.validity.valueMissing) {
    authorInput.setCustomValidity("Please enter a Author Name");
  } else if (authorInput.validity.patternMismatch) {
    authorInput.setCustomValidity("Please use only letters");
  } else {
    authorInput.setCustomValidity("");
  }
});

publishedYearInput.addEventListener("input", (event) => {
  if (publishedYearInput.validity.valueMissing) {
    publishedYearInput.setCustomValidity("Please enter the Published year");
  } else if (publishedYearInput.validity.rangeOverflow) {
    publishedYearInput.setCustomValidity(
      "The published year should not be greater than the current year",
    );
  } else if (publishedYearInput.validity.rangeUnderflow) {
    publishedYearInput.setCustomValidity(
      "The publish year should be higher than 1",
    );
  } else {
    publishedYearInput.setCustomValidity("");
  }
});

numOfPagesInput.addEventListener("input", (event) => {
  if (numOfPagesInput.validity.valueMissing) {
    numOfPagesInput.setCustomValidity("Please enter the Number of pages");
  } else if (numOfPagesInput.validity.rangeOverflow) {
    numOfPagesInput.setCustomValidity(
      "The number of pages should be lower than 200000",
    );
  } else {
    numOfPagesInput.setCustomValidity("");
  }
});
