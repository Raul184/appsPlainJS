//API Class
import Search from './models/Search';
//Methods
import * as SearchVista from './views/SearchView';
//DOM
import {elements, renderLoader} from './views/base';


//GLOBAL APP  >>  CONTROLLERS
const state = {
      //Search output
      //Recipes obj from Search Output
      //Shopping list for Recipe Obj
      //Liked-recipes 
};


const controlSearch = async() => {
      //Get Query from View
      const query = SearchVista.getInput();
      if(query){
            //storage new Instance obj from Search method
            state.search = new Search(query);

            //UI display
            SearchVista.clearInput();
            SearchVista.clearInpList();

            renderLoader(elements.results);
            //Recipes
            await state.search.getResults();
            
            //Render results
            SearchVista.renderResults(state.search.results);
      }
}

elements.searchForm.addEventListener('submit', e => {
      e.preventDefault();
      controlSearch();
});
