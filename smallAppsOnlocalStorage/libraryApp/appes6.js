// 1. CLASS for BOOKs input
class Book {
  constructor(title, author, ispn){
    this.title = title;
    this.author = author;
    this.ispn = ispn;
  }
}
// 2. UI CLASS
class UI {
  addBookToList(book){
    const list = document.getElementById('book-list');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href =" " class = 'delete'>X</a></td>
        `;
    list.appendChild(row);
  }
  showAlert(message , className){
    const div = document.createElement('div');
    // + class
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));
    // Parent
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');//before this one
    //Insert
    container.insertBefore(div, form);
    //        for 3 seconds
    setTimeout(function(){
        document.querySelector('.alert').remove(); //remove div
    }, 3000);
  }
  deleteBook(target){
    if(target.className === 'delete'){
        target.parentElement.parentElement.remove();
    }
  }
  clearFields(){
    document.getElementById('title').value = ' ';
    document.getElementById('author').value = ' ';
    document.getElementById('isbn').value = ' ';
  }
}
// 3. LOCAL STORAGE CLASS
class Store {
  static getBooks(){ //from local storage
    let books;
    //check
    if(localStorage.getItem('books') === null) { //if empty
      books = [];
    } else{
      books = JSON.parse(localStorage.getItem('books')); //parse the str and returns a jsObj so I can storage it on localStorage
    }
    return books;
  }
  static displayBooks(){ //ui

  }
  static addBook(){ // + localStorage
    const books = Store.getBooks(); //static method
    console.log(books);
    console.log('explained');
    books.push(book);
    // and set it in localStorage
    localStorage.setItem('books', JSON.stringify(books)); //just accept strings so I got to use stringify
  }
  static removeBook(){

  }
}
// EVENT LISTENERS
// 1. form
document.getElementById('book-form').addEventListener('submit', function(e){
    // FORM
    const title = document.getElementById('title').value,
           author = document.getElementById('author').value,
           isbn = document.getElementById('isbn').value;
    //INSTANCES OF BOOK
    const book = new Book (title, author, isbn);
    // INSTANCES created ON UI
    const ui = new UI();
    // VALIDATE INPUT
    if(title === ' ' || author === ' ' || isbn === ' '){
        ui.showAlert('Please fill in all fields ', 'error');
    }else{
      // APPEND method for UI
      ui.addBookToList(book);
      //add to storage
      Store.addBook(book);
      // CLEAR input fields
      ui.clearFields();
      //CONFIRM input
      ui.showAlert('New title stored, thanks!', 'success');
    }
    e.preventDefault();
});

// 2. DELETE EVENT
document.getElementById('book-list').addEventListener('click', function(e){
  // INSTANCES created ON UI
    const ui = new UI();
    //delete that book
    ui.deleteBook(e.target);
    //show alert
    ui.showAlert('Book removed', 'success');
    e.preventDefault();
});
