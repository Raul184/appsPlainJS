class UI {
    constructor() {

        // Iniciar el mapa cuando se instancia
        this.mapa = this.inicializarMapa();

        //layerGroup
        this.pins = new L.LayerGroup();

    }

    // 1. SET Map
    inicializarMapa() {
        // Inicializar y obtener la propiedad del mapa
        const map = L.map('mapa').setView([ 19.390519, -99.3739778], 6);
        const enlaceMapa = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
        L.tileLayer(
            'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; ' + enlaceMapa + ' Contributors',
                maxZoom: 18,
            }).addTo(map);
        return map;
    }

    // 2. SET Locations
    showGasStations(data){

        //Stock data from REst APi
        const result = data.results;

        return result;
    }

    // 3. SHOW PINS for locations
    showPins(result){

        //Clean former pins
        this.pins.clearLayers();

        //Show current ones in determined location
        result.forEach( pin => {
            
            //Extract needed Data
            const {latitude , longitude, calle, regular, premium } = pin;

            // Create PopUP for pins
            const Popups = L.popup()
                .setContent(`<p> Calle: ${calle}</p>
                             <p><b> Regular: $ ${regular}</p>
                             <p><b> Premium: $ ${premium}</p>
                `);

            // Append pin
            const marker = new L.marker([
                parseFloat(latitude),
                parseFloat(longitude)
            ]).bindPopup(Popups);    //Data-Binding > Markers & popups

            //Appending to layerGroup
            this.pins.addLayer(marker);
        });

        //Appending layerGroup to Map
        this.pins.addTo(this.mapa);
    }

    // 4. GET location input in SEARCH
    getInputLocations(patron , apiSearch){

        //Filter
        const filter = apiSearch.results.filter( y => y.calle.indexOf(patron) !== -1);

        //Display filtered locations
        this.showPins(filter);
    }
}


















