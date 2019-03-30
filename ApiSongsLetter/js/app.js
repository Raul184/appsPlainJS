//Modules IMPORT
import * as ui  from './UI.js';     //.js added in case NOT Webpack Included



const init = (function(){
    const DOM = {
        artist : document.querySelector('#artista'),
        song : document.querySelector('#cancion')
    }
    //EVENTS
    ui.form.addEventListener('click', (e) => {

        //Get input
        let artist = DOM.artist.value;
        let song = DOM.song.value;

        //Validations
        if(artist === '' || song === '')
        {
            //Print Error 
            ui.mensajes.innerHTML = "Please fill in all fields";
            ui.mensajes.classList.add('error'); //bootstrap

                //Erase error after 2s
            setTimeout(() => {
                ui.mensajes.innerHTML = "";
                ui.mensajes.classList.remove('error');
                 
            }, 1500)
        }
        else
        {

        }

        e.preventDefault();
    })
})();

