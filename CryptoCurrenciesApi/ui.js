//DOM
class UI {
    constructor(){  
        //display error msg
        this.messages = document.querySelector('.mensajes');
        //submit btn
        this.submit = document.querySelector('.btn-success');
        //display results from RestApi
        this.apiResults = document.querySelector('#resultado');
        //Select Input
        this.select = document.querySelector('#criptomoneda');
    }

    //Display Error Message -------------------------------
    alert( msg, clases){

        //Creation
        const div = document.createElement('div');
        
        div.className = clases;
        
        div.appendChild(document.createTextNode(msg));

        this.messages.appendChild(div);
        
        //Temporary disabling Submit btn
        this.submit.style.display = 'none';

        //Remove after 2s
        setTimeout( () => {

            document.querySelector('.bg-danger').remove();

            //Enable Submit again

            this.submit.style.display = 'block';
        }, 2000);
    }

    //Display data From REstApi -------------------------------
    displayer(data){
        
        // Html element 
        
        // Sorting Api data out
        for ( const [key, value] of Object.entries(data)){
            if(key === 'BTC' || key === 'LTC' || key === 'DASH' || key === 'ETH' 
               || key === 'BCH' || key === 'XRP' || key === 'XLM' || key === 'XMR')            
            {
                //Html 
                const opcion = document.createElement('option');
                
                //attribute
                opcion.value = value.Symbol;

                //Content
                opcion.appendChild(document.createTextNode(value.CoinName));

                //Append
                this.select.appendChild(opcion);
            }
        }
    }
}








