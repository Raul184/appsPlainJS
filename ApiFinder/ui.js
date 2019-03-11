//UI Class 

class UI{
      constructor(){
            //Where to be rendered
            this.profile = document.getElementById('profile');
      }

      //RENDER    USER Profile
      showProfile(user){
            this.profile.innerHTML = `
                  <div class="card card-body mb-3">
                        <div class="row">
                              <div class="col-md-3">
                                    <img class="img-fluid mb-2" src="${user.avatar_url}">
                                          <a href="${user.html_url}" target="_blank" class="btn btn-primary btn-block mb-4">
                                                View Profile
                                          </a>
                              </div>
                              <div class="col-md-9">
                                    <span class="badge badge-primary">Public Repos: ${user.public_repos}</span>
                                    <span class="badge badge-primary">Public Gists: ${user.public_gists}</span>
                                    <span class="badge badge-primary">Followers: ${user.followers}</span>
                                    <span class="badge badge-primary">Following: ${user.following}</span>
                                    <br><br>
                                    <ul class="list-group">
                                          <li class="list-group-item">Company: ${user.company}</li>
                                          <li class="list-group-item">Website/Blog: ${user.blog}</li>
                                          <li class="list-group-item">Location: ${user.location}</li>
                                          <li class="list-group-item">Member since: ${user.created_at}</li>
                                    </ul>
                              </div>
                        </div>
                  </div>
                  <h3 class="page-heading mb-3">Latest Repos</h3>
                  <div id="repos"></div>
            `;
      }

      //SHOW ALERT 
      showAlert(msg , nome){
            //Just 1 alert
            this.clearAlert();

            //Alert creation
            const div = document.createElement('div');
            div.className = nome;
            div.appendChild(document.createTextNode(msg));

            //Injection
            const parent = document.querySelector('.searchContainer');
            const end = document.querySelector('.search');
            parent.insertBefore(div, end);

            //Timeout 
            setTimeout(() => {
                  this.clearAlert();
            }, 1500);
      }

      //ALERT Message cleaner
      clearAlert(){
            const currentAlert = document.querySelector('.alert');

            if(currentAlert){
                  currentAlert.remove();
            }
      }

      //PROFILE CLEANER
      clearProfile(){
            this.profile.innerHTML = '';
      }

      //RENDER    USER Repos
      showRepos(repos){
            let output;
            repos.forEach(repo => {
                  output += `
                        <div class="card card-body mb-2">
                              <div class="row">
                                    <div class="col-md-6">
                                          <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                                    </div>
                                    <div class="col-md-6">
                                          <span class="badge badge-primary">Watchers: ${repo.stargazers_count}</span>
                                          <span class="badge badge-primary">Stars: ${repo.watchers}</span>
                                          <span class="badge badge-primary">Forks: ${repo.forks_count}</span>
                                    </div>
                              </div>
                        </div>   
                  `;
            });
            
            //Injection
            document.querySelector('#repos').innerHTML = output;
      }
};
