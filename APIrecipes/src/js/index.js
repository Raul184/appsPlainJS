//API 
import Search from './models/Search';
//DOM & GIF
import { elements as DOM, loaderGif } from './views/base';
//DOM Methods
import * as SearchView from './views/searchView';

// Global app controller      >>    Application State (at any given moment)
const state = {};                   //1. Search Obj.   2. Current recipe   3. Shopping list  4. Liked recipes


const controlSearch = async () =>{
      //1 Get Query
      const query = SearchView.getInput();
      if(query){
            //2 Recipe added to current App state Obj
            state.search = new Search (query);

            //3 UI actions 
            SearchView.clearInput();
            SearchView.clearList();
            loaderGif(DOM.resultsFrame);

            //4 Provide Recipes from query
            await state.search.getResults(); //await fro promise result
            
            //5 Render results on UI
            SearchView.inputRender(state.search.result);
      }
}


DOM.searchForm.addEventListener('submit', e =>{
      e.preventDefault();
      controlSearch();
})
console.log("test");

//const test = new Search('pizza');


