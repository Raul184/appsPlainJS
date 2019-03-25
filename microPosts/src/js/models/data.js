//DATA-WORK Module

//Import UI methos
import {ui} from '../views/ui';

//GET
export const getPosts = library => {
    //Get request to Fake RestApi 
    library.get('http://localhost:3000/posts') //promise
    .then( data => ui.showPosts(data))
    .catch( err => console.log(err));
} 

//DELETE
export const deletePost = (library , id) => {

    //Remove && 
    library.delete(`http://localhost:3000/posts/${id}`)
    .then( data => {
        ui.showAlert('Post Removed' , 'alert alert-success');
        
        //update whatever is left
        getPosts(library);
    })
    .catch(err => console.log(err));
}

//UPDATE
export const updatePost = (library , id) => {
    //Get data from Updated form
    const data = input();

    library.put(`http://localhost:3000/posts/${id}` , data)
    .then( data => {
        //Update last-update just done
        getPosts(library);
    })
    .catch( err => console.log(err));
}




//SUBMIT
export const submitPost = library => {
    //Get data from Submit form
    const data = input();

    //POST request for data
    library.post('http://localhost:3000/posts' , data)
        .then( data => {
            //Update last one submitted just now
            getPosts(library);
        })
        .catch( err => console.log(err));
}


// FACILITATORS 

const input = () => {
    const title = document.querySelector('#title').value;
    const body = document.querySelector('#body').value;
    const data = {
        title,
        body
    }

    return data;
}
