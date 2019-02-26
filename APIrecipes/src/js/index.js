//API Class
import Search from './models/Search';
//Methods
import * as searchView from './views/SearchView';
//DOM
import {elements} from './views/base';


//GLOBAL APP  >>  CONTROLLERS
const state = {
      //Search output
      //Recipes obj from Search Output
      //Shopping list for Recipe Obj
      //Liked-recipes 
};


const controlSearch = async() => {
      //Get Query from View
      const query = searchView.getInput();
      if(query){
            //storage new Instance obj from Search method
            state.search = new Search(query);
            //UI display

            //Recipes
            await state.search.getResults();
            
            //Render results
            console.log(state.search);
            console.log(state.search.results);
            searchView.renderResults(state.search.results)
      }
}

elements.searchForm.addEventListener('submit', e => {
      e.preventDefault();
      controlSearch();
});
