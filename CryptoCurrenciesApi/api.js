//API 

class Crypto {
    constructor(){
        //key
        this.apiKey = 'd3d8dc45a3d3ab58d2c223d51aef8a134ae6e04b5e7c0debc14f4fd979de0c12';
    }


// 1. Get CryptoCurrencies
    async getCryptos (){
    
        //request
        const response = await fetch(`https://min-api.cryptocompare.com/data/all/coinlist?api_key=${this.apiKey}`);

        //Selected cryptos
        const main = await response.json();

        return main.Data;
    }

// 2. COMPARE Currencies vs Cryptos
    async compareCurrencies(currency , crypto){

        const request = await fetch(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${crypto}&tsyms=${currency}&api_key=${this.apiKey}`);

        const processed = await request.json();

        console.log(processed);

        return processed;
    }
}