console.log('works');
//SINGLETON PATTERN USE FOR WRAP SPECIFIC CODE IN A WEBSITE
const codepion = window.codepion || {}; //fallback

codepion.registrationPage = {
  //Selectors
  form_Id : document.querySelector('#signupform'),
  output_Id : document.querySelector('#output'),
  //Init method
  init: function(){
    this.form_Id.addEventListener('submit', this.handleSubmit);
  },
  handleSubmit: function(e){
    console.log('checking in');
    e.preventDefault();
    let data = this.form_Id.serializeArray();  //get input sorted
    // send form to server
    this.sendRegistration(data);
  },
  sendRegistration: function(data){
    $.ajax({ //AJAX TO SUBMIT FORM
      url: 'signup.php',
      type: 'POST',
      success: function(response){ //server response
        this.displayResult(response);
      },
      error: function(){
        console.log('There has been an error on the call , please repeat');
      }
    });
  },
  displayResult: function(response){
    this.output_Id.textContent = response;
  }
};
codepion.registrationPage.init();
