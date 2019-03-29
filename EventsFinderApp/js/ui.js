// UI MODULE

class UI{
    constructor(){
        
        //DOM
        this.eventsList = document.querySelector('#resultado-eventos');
        //Select Category input
        this.select = document.getElementById('listado-categorias');
        
        
    }

    // 1. Display Categories on SELECT input
    categorySelect(data){
        
        //html
        let markUp= '';

        //appending Categories
        data.forEach( category => {
            
            markUp += `
                <option value="${category.id}">${category.name}</option>
            `;

        });

        //Inject
        this.select.innerHTML = markUp;
    }

    // 2. Display Events
    displayEvents(results){
        
    }
}