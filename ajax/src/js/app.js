class UI {
    constructor(){
        this.name = document.querySelector('#origen').options;
        this.genre = document.querySelector('#genero').options;
        this.number = document.querySelector('#numero').value;
        this.result = document.querySelector('#result');
    }

    loadNames(){
        let name,genre,number, dom;
        name = this.name[this.name.selectedIndex].value;
        genre = this.genre[this.genre.selectedIndex].value;
        number = parseInt(this.number);
        
        dom = this.result;
        
        //AJAX
        const xhr = new XMLHttpRequest();
        
        xhr.open('GET', `https://uinames.com/api/?region=${name}&gender=${genre}&amount=${number}`, true);

        xhr.onload = function(){
            if(this.status === 200)
            {
                const nomes = JSON.parse(this.responseText);

                //html
                let markUp = `<h2>Names</h2>`;
                
                markUp += `<ul class="list">`;

                //injection
                nomes.forEach(elem => {
                    markUp +=`
                        <li>${elem.name}</li>
                    `;
                });

                markUp +=`</ul>`;

                //DOM
                dom.innerHTML = markUp;

            }
            else
            {
                console.log('Sorry, something went wrong');
            }
        };

        xhr.send();
    }
}





//Events
document.querySelector('.button-primary').addEventListener('click', (e) => {
    const ui = new UI();
    ui.loadNames();
    e.preventDefault();
})
