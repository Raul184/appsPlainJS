
// GITHUB OPERATIONS Class

class Github{
      //API
      constructor(){
            this.client_id = '82117fb2295baa3295a3';
            this.client_secret = 'f7776601e3aa0357dc47b999205c4369d93ca01d';
            this.repos_count = 5;
            this.repos_sort = 'created: asc' //format I want to give it 
      }
      //DATA Getter
      async getUser(user){
            //Get user 
            const profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`);

            //Pass it to JSON
            const profileData = await profileResponse.json();

            //Get User's repos
            const repoResponse = await fetch(`https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`);
            
            const repos = await repoResponse.json();
      
            return {
                  profile: profileData,
                  repos
            }
      }
};

