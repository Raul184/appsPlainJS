// Data Module
const data = (function(){
// Private
  return{
    // PUBLIC
    saveLocal: function(item){
      let stock;
      if(localStorage.getItem('tweets') === null){
        stock = []; //set ready to storage
      } else{
        stock =  JSON.parse(localStorage.getItem('tweets'));
        }
        //stock new one
        stock.push(item);
        //dabase only str
        localStorage.setItem('tweets', JSON.stringify(stock));
        // localStorage.setItem('tweets', item);
    }
  }
})();

// UI Module
const UI = (function(){
  // PRIVATE
  // DOM
  const listTweets = document.getElementById('list-tweets');
  return{
    // PUBLIC
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
      //localStorage
      data.saveLocal(item);

      e.preventDefault();
      return item;
    },
    removeTweet: function(e){
      if(e.target.className === 'delete-button'){
        console.log('clickaste');
        e.target.parentElement.remove();
      }


      e.preventDefault();
    }
  }
})();

// Event Listeners IIFE
const runners = (function (){
    let item = document.getElementById('tweet').value.length;
    // formulario
    document.getElementById('form').addEventListener('submit',UI.agregaTweet);
    document.getElementById('list-tweets').addEventListener('click', UI.removeTweet);
})();
