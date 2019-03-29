//APP Controller Module

const m = (function(){
    //Modules
    const ui = new UI();
    const api = new API();

    //DOM
    const DOM = {
        input: document.querySelector('#buscar input') 
    }

    return {
        init(){
            
            //Events 
            //for MAP loading
            document.addEventListener('DOMContentLoaded', () => {
                
                //Get Gas Stations & display them in UI
                api.getStations()
                .then( data => ui.showGasStations(data))

                //set PINS location on Map 
                .then( result => ui.showPins(result));
            });

            // for SEARCH on MAP
            DOM.input.addEventListener('input' , () => {
                
                // Input
                if(DOM.input.value.length > 4){

                    //API
                    api.getStations()
                        .then(data => ui.getInputLocations(DOM.input.value, data)); // Search in API
                };
            });
        }
    }
})();

//StartUp APP
m.init();