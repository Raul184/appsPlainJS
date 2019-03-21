
//WEATHER Module

class Weather{
      constructor(city , state){
            this.apikey = 'FNVAEXE01vwCugsDqokvRvTr5pmtoBsi';
            this.city = city;
            this.state = state;
      }

      //Fetch weather from API
      async getWeather(){

            const response = fetch(`http://dataservice.accuweather.com/locations/v1/regions`);
            
            const responseData = await response.json();

            return responseData;
      }
}

