//API Module
class API{
    constructor(){

    }

    // 1. GET all gasStations
    async getStations(){
        
        //total Gas Stations
        const total = 11000;

        //request
        const request = await fetch('https://api.datos.gob.mx/v1/precio.gasolina.publico?pageSize=1000');
        
        //Format
        const response = await request.json();

        return response;
    }
}