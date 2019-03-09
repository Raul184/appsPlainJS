const http = new EasyHTTP;


//Get Users
//const users = http.get('https://jsonplaceholder.typicode.com/users');

//console.log(users);     //Synchronous way >>    var const is declared and assigned Before data is fetched 


//SOLUTION        >> Asynchronous ES6 programming

//GET             >> 10 Ids
// http.get('https://jsonplaceholder.typicode.com/users')
//       .then(data => console.log(data) )
//       .catch(err => console.log(err));


//POST            >> +1 = 11Ids.
const data = {
      'test': 'Does it work?',
      'answer': 'Yes or No'
}

// http.post('https://jsonplaceholder.typicode.com/users', data)
//       .then(data => console.log(data))
//       .catch(err => console.log(err));


//UPDATE
// http.put('https://jsonplaceholder.typicode.com/users/2', data)
//       .then(data => console.log(data))
//       .catch(err => console.log(err));


//DELETE
http.delete('https://jsonplaceholder.typicode.com/users/5')
      .then(data => console.log(data) )
      .catch(err => console.log(err));



