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






//SUBMIT
export const submitPost = library => {
    const title = document.querySelector('#title').value;
    const body = document.querySelector('#body').value;
    //const id = document.querySelector('#id').value;

    const data = {
        title,
        body
    }

    //POST request
    library.post('http://localhost:3000/posts' , data)
        .then( data => {
            //Update last one submitted just now
            getPosts(library);
        })
        .catch( err => console.log(err));
}