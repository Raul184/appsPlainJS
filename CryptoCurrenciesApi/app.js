//DOM
const app = (function() {
    const DOM = {
        // form
        form : document.querySelector('#formulario'),
        //Read Currency Selected
        $currency : document.querySelector('#moneda'),
        //Read Crypto Selected
        $crypto : document.querySelector('#criptomoneda'),
        $spinner: document.querySelector('.contenido-spinner')
    }
    //StartUp Status Check
    console.log('Init');

    //PUBLIC
    return {
        init: function(){

            //CLASSES
            const ui = new UI();
            const api = new Crypto();            
            
            //EVENTS

            // 1 Select Input
            DOM.$crypto.addEventListener('click', () => {
                // Fetch data from RESTapi && Display Data on UI
                api.getCryptos()
                    .then(cryptos => ui.displayer(cryptos));
            });

            // 2 Submit Btn
            DOM.form.addEventListener('submit', e => {

                //Traditional Currencies
                let selections = DOM.$currency.options[DOM.$currency.selectedIndex].value;

                //Crypto
                let selects = DOM.$crypto.options[DOM.$crypto.selectedIndex].value;

                if (selections === '' && selects === '') {
                    //Error Alert
                    ui.alert('Please select currencies', 'alert bg-danger text-center');
                }
                else 
                {

                    //Spinner
                    DOM.$spinner.style.display = 'block';
                    
                    setTimeout(() => {

                        //Hide Spinner
                        DOM.$spinner.style.display = 'none';
                        
                        // Fetch data from RESTapi && Display Data on UI
                        
                        api.compareCurrencies(DOM.$currency.value, DOM.$crypto.value)
                        .then(crypto => ui.cotizations(DOM.$currency.value , crypto));
                        
                        
                    }, 2000);
                    
                    setTimeout(() => {
                        //CLEAN UI
                        DOM.$crypto.innerHTML = '';
                    }, 2500);
                }
                e.preventDefault();
            });
        }
    }
})();

//StartUP
app.init();




