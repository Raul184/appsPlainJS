//Instances
const ui = new UI;
const gitH = new Github;

//Search input
const searchUser = document.getElementById('searchUser');



//EVENTS
searchUser.addEventListener('keyup', (e) => {
       
      //get Input from UI
      const userText = e.target.value;
      if(userText !== ''){

            //Make http call > R a P
            gitH.getUser(userText)
            .then( data => {
                  if(data.profile.message === "Not Found"){
                        
                        //Show UI alert                    Bootstrap
                        ui.showAlert('User not found', 'alert alert-danger');
                  } 
                  else 
                  {
                        //Show profile 
                        ui.showProfile(data.profile);

                        //Show repos
                        ui.showRepos(data.repos); 
                  }
            })
      } else {
            // if Empty , CLEAR UI from User
            ui.clearProfile();
      }
});