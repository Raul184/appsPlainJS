//API MODULE

class EventBrite{
    constructor(){
        //OAuth token for API
        this.authToken = 'KFM7XFXJUPTD5AOUJQBJ';
        // Ordered by Date
        this.ordenar = 'date';
    }

    // 1 Categories FINDER for Select Input
    async categoriesGet (){
        
        //Request
        const request = await fetch(`https://www.eventbriteapi.com/v3/categories/?token=${this.authToken}`);

        // Formatted response
        const response = await request.json();

        return response.categories ;
    }

    // 2 Events FINDER based on Category & City
    async eventsFinder(city, category){
        
        //Request
        const response = await fetch(`https://www.eventbriteapi.com/v3/events/search/?categories=${category}&location.address=${city}&location.within=10km&expand=venue&token=${this.authToken}`);

        //Format
        const format = await response.json();

        console.log(format);

        return format.events;
    }
}