//IMPORTS

//API Methods 1
import Search from './models/Search';
//2
import Recipe from './models/Recipe';
//DOM & GIF
import { elements as DOM, loaderGif } from './views/base';
//DOM Search Methods
import * as SearchView from './views/searchView';
//DOM Recipe Methods
import * as RecipeView from './views/recipeView';


// Global app controller      >>    Application State (at any given moment)
const state = {};                   //1. Search Obj.   2. Current recipe   3. Shopping list  4. Liked recipes

//-- -- -- -- -- -- -- -- ---- -- -- -- -- -- -- -- ---- -- -- -- -- -- -- -- ---- -- -- -- -- -- -- -- --
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
            try{
                  //4 Provide Recipes from query
                  await state.search.getResults(); //await fro promise result

                  //5 Render results on UI
                  SearchView.inputRender(state.search.result);
            }catch(error)
            {
                  alert('Sorry, Recipes not available at this moment');
            }
      }
}

// EVENTS FOR SEARCH CONTROLLER
//          1. SUBMIT Query & rendering 
DOM.searchForm.addEventListener('submit', e =>{
      e.preventDefault();
      controlSearch();
});

//          1.2 PAGINATION on rendering 
DOM.resultPages.addEventListener('click', e =>{
      const btn = e.target.closest('.btn-inline');
      if(btn){
            const goToPg = parseInt(btn.dataset.id);
            SearchView.clearList();

            SearchView.inputRender(state.search.result, goToPg);
            
      }
});
//-- -- -- -- -- -- -- -- ---- -- -- -- -- -- -- -- ---- -- -- -- -- -- -- -- ---- -- -- -- -- -- -- -- --
const controlRecipe = async () =>{
      //Grab id from URL
      const id = window.location.hash.replace('#', ''); //erase # symbol
      if(id){
      //UI changes

      //Create instance of recipe from id
            state.recipe = new Recipe(id);

      //GET recipe data
            try{
                  await state.recipe.getRecipe();
      //SORT recipe data
                  state.recipe.parseIngredients();

      //Calculate servings & cooking time
                  state.recipe.calcTime();
                  state.recipe.calcServings();

      //Render recipe
                  console.log(state.recipe);
                  RecipeView.recipeCleaner();
                  RecipeView.singleRecipe(state.recipe);
            }catch(error)
            {
                  alert('Recipe not found , sorry!');
            }
            
      }
}
//          2. Single recipes Id FINDER FOR RECIPE CONTROLLER
window.addEventListener('hashchange', controlRecipe);
//['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

