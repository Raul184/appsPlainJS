// Functions
const proced = (function(){
  return{
    agregaTweet: function(e){
      let item = document.getElementById('tweet').value; //input
      if(item.length > 1) {
      // LI
      const li = document.createElement('li');//html
      li.innerText = item;
      // anchor
      const link = document.createElement('a');//html
      link.classList.add('delete-button');
      link.innerHTML = "X";
      // Appendings
      li.appendChild(link); // a + li
      listTweets.appendChild(li);
      }
      document.getElementById('tweet').value = ' ';
      e.preventDefault();
    }
  }
})();

// DOM var
const listTweets = document.getElementById('list-tweets');




// Event Listeners IIFE
const runners = (function (){
    let item = document.getElementById('tweet').value.length;
    // formulario
    document.getElementById('form').addEventListener('submit',proced.agregaTweet);
})();
