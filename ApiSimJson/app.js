//ES NEXT.JS

console.log('app');

async function getAll(){
    //await for response
    const response = await fetch('https://my-json-server.typicode.com/typicode/demo/db');

    //parse 
    const datos = await response.json();

    //Check if response meets what I need
    console.log(datos);

    //return the promise
    return datos;
}

getAll()
    .then(data => console.log(data));
