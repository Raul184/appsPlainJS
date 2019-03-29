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
        
        //Create HTML
        results.forEach( evento => {
            this.eventsList.innerHTML +=`
                <div class="col-md-4 mb-4">
                    <div class="card">
                        <div class="card-body">
                            <img class="img-fluid mb-2" src="${evento.logo !== null ? evento.logo.url : ''}">
                        </div>
                        <div class="card-body">
                            <div class="card-text">
                              <h2 class="text-center">${evento.name.text}</h2>
                              <p class="lead text-info">Evento</p>
                              <p>${evento.description.text.substring(0 , 280)}...</p>
                              <span class="badge badge-primary">
                                Capacidad:${evento.capacity}
                              </span>
                              <span class="badge badge-primary">
                                Fecha/Hora: ${evento.start.local}
                              </span>
                             <a href="${evento.url}"target="_blank"class="btn btn-primary btn-block mt-4">Comprar Boletos</a>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });
    }
}