const test = new easyHttp();



//                                              GET all  Request


// test.get('https://jsonplaceholder.typicode.com/posts', 
// function(err, response){
//       if(err){
//             console.log(err);
//       }else
//       {
//             console.log(response);
//       }
// });

//                                              GET 1 item  Request


// test.get('https://jsonplaceholder.typicode.com/posts/1',
//       function (err, response) {
//             if (err) {
//                   console.log(err);
//             } else 
//             {
//                   console.log(response);
//             }
//       }
// );


//                                              POST
const data = {
      title: "Customized post & Updated",
      body: "This is a customized post"
};

// test.post('https://jsonplaceholder.typicode.com/posts', data, function(err, post){
//       if(err){
//             console.log(err);
//       }else
//       {
//             console.log(post);
//       }
// });


//                                              UPDATE

test.put('https://jsonplaceholder.typicode.com/posts/5', data, function (err, put) {
      if(err){
            console.log(err);
      }else
      {
            console.log(put);
      }
});


//                                              DELETE

test.delete('https://jsonplaceholder.typicode.com/posts/5',
      function (err, response) {
            if (err) {
                  console.log(err);
            } else 
            {
                  console.log(response);
            }
      }
);
//---------------------