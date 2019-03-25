//DATA-WORK Module

//Import UI methos
import {ui} from '../views/ui';

export const getPosts = library => {
    //Get request to Fake RestApi 
    library.get('http://localhost:3000/posts') //promise
    .then( data => ui.showPosts(data))
    .catch( err => console.log(err));
} 