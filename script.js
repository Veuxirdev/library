const htmlLibrary = document.getElementById('libraryTable');
const registerBtn = document.getElementById('registerBtn');
const nameInput = document.getElementById('name');
const authorInput = document.getElementById('author');
const publishYearInput = document.getElementById('publishYear');
publishYear.setAttribute('max', new Date().getFullYear().toString());
const genreInput = document.getElementById('genre');
const numOfPagesInput = document.getElementById('numOfPages');
const copiesSold = document.getElementById('copiesSold');
const readInput = document.getElementById('read');
const addBookBtn = document.getElementById('addBookBtn');
let myLibrary = [];
 

function Book(name, author, publishYear, genre, numOfPages, copiesSold, read) {
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
}

function addBookToLibrary(name, author,publishYear, genre, numOfPages, copiesSold,read) {
  const bookObj = new Book(name,author,publishYear,genre,numOfPages,copiesSold,read);
  myLibrary.push(bookObj);
  return 'done';
}

addBookToLibrary('harry potter', 'J.K. Rowling', 1996, 'Fiction', 400, 'Millions', true);
addBookToLibrary('b', 'd', 1996, 'Fiction', 400, 'Millions', false);

function addBookToTable(object){
  if(!object){
    return 'invalid or undefined Object'
  }
  const tableRow = document.createElement('tr');
  tableRow.setAttribute('id', object.id);
    tableRow.innerHTML = `
                      <td>${object.name}</td>
                      <td>${object.author}</td>
                      <td>${object.publishYear}</td>
                      <td>${object.genre}</td>
                      <td>${object.numOfPages}</td>
                      <td>${object.copiesSold}</td>
                      <td class="readTD">${object.read?
                      `<svg class='icon green' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>check-bold</title><path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z" /></svg>`:
                      `<svg class='icon red' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>close-circle</title><path d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z" /></svg>`
                    }</td>
                    `;

  const readButton = document.createElement('button');
  readButton.textContent = 'Read';

  readButton.addEventListener('click', () =>{
    const readTD = document.querySelector(`table tr[id="${object.id}"] > td.readTD`);
    object.toggleRead();
    readTD.innerHTML = object.read?
                      `<svg class='icon green' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>check-bold</title><path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z" /></svg>`:
                      `<svg class='icon red' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>close-circle</title><path d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z" /></svg>`;
                      console.log(object.read);
  });

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';

  deleteButton.addEventListener('click',(e)=>{
    const tableSelected = document.getElementById(object.id);
    tableSelected.remove();
    myLibrary = myLibrary.filter((obj) => obj.id === object.id);
  });

  let buttonTd = document.createElement('td');
  buttonTd.appendChild(deleteButton);
  tableRow.appendChild(buttonTd);

  buttonTd = document.createElement('td');
  buttonTd.appendChild(readButton);
  tableRow.appendChild(buttonTd);

  htmlLibrary.appendChild(tableRow);
}
myLibrary.forEach(element => {
  addBookToTable(element);
});

