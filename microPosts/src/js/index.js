//SASS
import "../styles/style.scss";

//Hand-coded API Library
import {http} from './http';

//Import methods from data Module
import {getPosts , submitPost , deletePost} from './models/data';

//Import from UI
import {ui} from './views/ui';

//GET posts on Load
document.addEventListener('DOMContentLoaded', () => {
    //Get request && display
    getPosts(http);
    ui.cleanerUI();
});


//ADD a new Post on Submit
document.querySelector('.post-submit').addEventListener('click', () => {
    if(document.querySelector('#title').value !== '' && document.querySelector('#body').value !== '')
    {
        //Add new post
        submitPost(http);
        //Clean ui
        ui.cleanerUI();
        //Confirm submitted
        ui.showAlert('Post added', 'alert alert-success')   //Bootstrap className
    }
});

//REMOVE a post
document.querySelector('#posts').addEventListener('click', (e) => {
    if(e.target.parentElement.classList.contains('delete'))
    {
        //ID
        const id = e.target.parentElement.dataset.id;
        
        if(confirm('Are you sure?'))
        {
            //Remove from DB
            deletePost(http, id)
            
            //Remove from UI
            ui.removePost(e.target.parentElement.parentElement.parentElement);
        }
    }
    e.preventDefault();
});

//UPDATE a post
document.querySelector('#posts').addEventListener('click', (e) => {
    if(e.target.parentElement.classList.contains('edit'))
    {
        let title, bod, id, container;
        //Update DB

        //Update UI
        title = e.target.parentElement.parentElement.firstElementChild.textContent;
        body = e.target.parentElement.parentElement.children[1].textContent;
        id = e.target.parentElement.dataset.id;
        //container = e.target.parentElement.parentElement;
        const data = {
            id,
            title,
            body
        }
        ui.enableEdit(data);
    }
    e.preventDefault();
});

//CANCEL update on a Post

document.querySelector('.card-form').addEventListener('click', e => {
   //Run on back btn
   if(e.target.classList.contains('post-cancel'))
   {
       ui.changeFormState('add');
   }

   e.preventDefault(); 
});
