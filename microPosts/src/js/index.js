//SASS
import "../styles/style.scss";

//Hand-coded Library
import {http} from './http';

//Import methods from data Module
import {getPosts} from './models/data';




//GET posts on Load
document.addEventListener('DOMContentLoaded', () => {
    //Get request && display
    let data = getPosts(http);
});


