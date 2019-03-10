//EVENTS
document.querySelector('.get-jokes').addEventListener('click', getJokes);

// API 
function getJokes(e){
      const number = document.querySelector('input[type="number"]').value;

      //Create instance of the XML Obj along with Http protocol
      const xhr = new XMLHttpRequest();

      //CALL                     
      //                                                              Asynchronous
      xhr.open('GET', `http://api.icndb.com/jokes/random/${number}` , true);

      //CHECK for response status && type 'ONLOAD'

      xhr.onload = function(){
            if(this.status === 200){
                  const response = JSON.parse(this.responseText);
                  console.log(response);
                  let output = '';
                  if(response.type === 'success'){
                        response.value.forEach(jokObj => {
                              output += `<li>${jokObj.joke}`;
                        });
                  }
                  else
                  {
                        output += `<li>Something went wrong</li>`;
                  }
                  document.querySelector('.jokes').insertAdjacentHTML('afterbegin', output);
            }
      }

      //SEND

      xhr.send();

      e.preventDefault();
};