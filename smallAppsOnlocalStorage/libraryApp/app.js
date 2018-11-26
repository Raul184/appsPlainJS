console.log('justChecking');
// Book Constructor
function Book (title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}


// UI Constructor
function UI(){

}
// ADD
UI.prototype.addBookToList = function(book){
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
UI.prototype.showAlert = (message, className) =>{
    //create Div
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
// CLEAR
UI.prototype.clearFields = function(){
  document.getElementById('title').value = ' ';
  document.getElementById('author').value = ' ';
  document.getElementById('isbn').value = ' ';
}
// Event Listeners
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
      // CLEAR input fields
      ui.clearFields();
      //CONFIRM input
      ui.showAlert('New title stored, thanks!', 'success');
    }
    e.preventDefault();
});
