
//UI MODULE


class UI{
    constructor(){
        this.post = document.querySelector('#posts');           //to display
        this.titleInput = document.querySelector('#title');
        this.bodyInput = document.querySelector('#body');
        this.idInput = document.querySelector('#id');
        this.postSubmit = document.querySelector('.post-submit');
        //default state
        this.forState = 'add';   
    }

//CLEAR Id input
    clearIdInput(){
        this.idInput.value = '';
    }
//DISPLAY METHOD
    showPosts(posts){
        let output = '';
        posts.forEach( post => {
            output += `
                <div class="card mb-3">
                    <div class="card-body">
                        <h4 class="card-title">${post.title}</h4>
                        <p class="card-text">${post.body}</p>
                        <a href="#" class="edit card-link" data-id="${post.id}">
                            <i class="fa fa-pencil"></i>
                        </a>
                        <a href="#" class="delete card-link" data-id="${post.id}">
                            <i class="fa fa-remove"></i>
                        </a>
                    </div>
                </div>
            `;
        });
        //HTML Injection
        this.post.innerHTML = output;
    }
//UI REMOVE Method
    removePost(post){
        post.remove();
    }

//UI EDIT Method
    enableEdit(data){
        //HIDE current element in position 
        this.titleInput.value = data.title;
        this.bodyInput.value = data.body;
        this.idInput.value = data.id;

        this.changeFormState('edit');
    }

//FORM STATE CHANGER
    changeFormState(type){
        if(type === 'edit')
        {
            //Submit btn >>>> Update btn
            this.postSubmit.textContent = 'Update Post';
            this.postSubmit.style.background = 'Orange';

            //Create new btn
            const btn = document.createElement('button');
            btn.className = 'post-cancel btn btn-light btn-block';
            btn.appendChild(document.createTextNode('Back'));

            //Injection
            const cardForm = document.querySelector('.card-form');
                //before
            const before = document.querySelector('.form-end');

            cardForm.insertBefore(btn , before);
        }
        else
        {
            if(document.querySelector('.post-cancel'))
            {
                //Remove Back btn if it's there
                document.querySelector('.post-cancel').remove();

                //Put Submit Btn back
                this.postSubmit.textContent = 'Post It';
                this.postSubmit.className = 'post-submit btn btn-primary btn-block';
                this.postSubmit.style.background = '#1A6DCA';
                //Clean Ui
                this.cleanerUI();

                //Clean Id 
                this.clearIdInput();
            }
        }
    }
//UI CLEANER METHOD
    cleanerUI(){
        this.titleInput.value = '';
        this.bodyInput.value = '';
    }
//ALERT on Added item to Fake DB
    showAlert(msg, className){
        const markUp =`
            <div class="${className}">
                ${msg}
            </div>
        `;

        //Select
        const container = document.querySelector('.card-body');
        
        //Injection
        container.insertAdjacentHTML('afterend', markUp);

        //End Alert
        setTimeout(() => this.clearAlert(), 2500);
    }
//ALERT Clearer once it's been added
    clearAlert(){
        const currentAlert = document.querySelector('.alert');
        if(currentAlert) currentAlert.remove();
    }
}

export const ui = new UI();