//APP Controller Module

const m = (function(){
    //Modules
    const ui = new UI();
    const api = new API();

    return {
        init(){
            
            //Events
            document.addEventListener('DOMContentLoaded', () => {
                
                //Get Gas Stations & display them in UI
                api.getStations()
                .then( data => ui.showGasStations(data))

                //set PINS location on Map 
                .then( result => ui.showPins(result));
            });
        }
    }
})();

//StartUp APP
m.init();