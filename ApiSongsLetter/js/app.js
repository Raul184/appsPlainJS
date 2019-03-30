//Modules IMPORT

//ui
import * as ui  from './UI.js';     //.js added in case NOT Webpack Included

//api
import { API } from './api.js';


const init = (function(){
    const DOM = {
        artist : document.querySelector('#artista'),
        song : document.querySelector('#cancion')
    }
    //EVENTS
    ui.form.addEventListener('submit', (e) => {
        e.preventDefault();
        //Get input
        let artist = DOM.artist.value;
        let song = DOM.song.value;

        //Validations
        if(artist === '' || song === '') //Empty
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
            const api = new API();
            //Fetch data & print in UI 
            api.getLyrics(artist, song)
            .then( data => {
                if(data.lyrics)
                {
                    let lyric = data.lyrics;
                    ui.resultado.textContent = lyric;
                }
                else 
                {
                    //Print Error 
                    ui.mensajes.innerHTML = "Sorry , we could not find the song";
                    ui.mensajes.classList.add('error'); //bootstrap

                    //Erase error after 2s
                    setTimeout(() => {
                        ui.mensajes.innerHTML = "";
                        ui.mensajes.classList.remove('error');

                    }, 1500)
                }
            });
        }
    });
})();

