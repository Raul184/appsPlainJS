//Button 1
document.getElementById('button1').addEventListener('click', getText);

// GET Request with a Text File
function getText(){
      fetch('test.txt')
      .then( res => res.text())
      .then( data => console.log(data) )
      .catch( err => console.log(err) );
};


//Button 2
document.getElementById('button2').addEventListener('click', getJson);


function getJson(){
      fetch('posts.json')
      .then( res => res.json())
      .then( data => console.log(data) )
      .catch( err => console.log(err) );
};





//Button 3
document.getElementById('button3').addEventListener('click', getApiData);


function getApiData() {
      fetch('https://api.github.com/users')
      .then(res => res.json())
      .then(data => {
            let markUp = '';
            data.forEach(elem => {
                markUp += `
                  <li>${elem.login} : ${elem.id}</li>
                `;  
            });
            document.getElementById('output').insertAdjacentHTML('afterbegin', markUp); 
      })
      .catch( err => console.log(err) )
};
