
// APP CONTROLLER MODULE

const start = (function(){

    //DOM
    const DOM = {
        //Submit
        submit: document.getElementById('buscarBtn'),
        // City Events
        city: document.getElementById('evento'),
        // Category
        category: document.getElementById('listado-categorias')
    }

    // MODULES
    const ui = new UI();
    const api = new EventBrite();


    //EVENTS
    
    // 1. On Submit
    DOM.submit.addEventListener('click', e => {
        
        //EVENTS FINDER based on Category & Location Selected
        if(DOM.city.value !== '')
        {
            //Get events
            api.eventsFinder(DOM.city.value, DOM.category.value)

            //Display them in UI
            .then( events => ui.displayEvents(events));
        }
        else
        {
            //Show Error Alert
            DOM.city.style.border = '3px solid red';
            DOM.city.placeholder = "Por favor, no olvides escribir la ciudad";
            
            // Hide Error Alert
            setTimeout(() => {
                DOM.city.style.border = '';
                DOM.city.placeholder = "Busca por nombre de evento o ciudad";
            }, 1500)
        }

        e.preventDefault();
    });

    return{
        
        //StartUp APP
         init(){

            // 1 CATEGORIES FOR SELECT INPUT

        // Get 
            api.categoriesGet()

        // Update Select on UI with Categories
            .then( data => ui.categorySelect(data));

            console.log('init');
        }
    }
})();



// RUN on StartUp App
const y = start.init();