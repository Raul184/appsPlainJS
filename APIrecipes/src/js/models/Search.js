// https://www.food2fork.com/api/search Search Option for API
//promise with Fetch
//const result = await fetch(`https://www.food2fork.com/api/search?key=${key}&q=${query}`); 
//result.json();

import axios from 'axios';

export default class Search{
      constructor(query){
            this.query = query;
      }
      //Search method
      async getResults() {
            // API Key
            const key = '4e90fbbc5eda059662e35254ffec4bbf';
            try
            {
                  const res = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
                  this.results = res.data.recipes;
            } catch (error)
            {
                  alert(error);
            }
      }
}