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
    // APPEND method for UI
    ui.addBookToList(book);
    // CLEAR input fields
    ui.clearFields();
    e.preventDefault();
});
