//IMPORTS

//API Methods 1
import Search from './models/Search';
//2
import Recipe from './models/Recipe';
// List Purchases
import List from './models/List';
//DOM & GIF
import { elements as DOM, loaderGif, lightMarker } from './views/base';
//DOM Search Methods
import * as SearchView from './views/searchView';
//DOM Recipe Methods
import * as RecipeView from './views/recipeView';
//DOM List Methods
import * as ListView from './views/listView';


// Global app controller      >>    Application State (at any given moment)
const state = {};                   //1. Search Obj.   2. Current recipe   3. Shopping list  4. Liked recipes

//-- -- -- -- -- -- -- -- ---- -- -- -- -- -- -- -- SEARCH CONTROLLER ---- -- -- -- -- --  -- -- -- -- -- -- -- --
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
//-- -- -- -- -- -- -- -- ---- -- -- -- -- -- -- -- ---- --RECIPE CONTROLLER -- -- -- ---- -- -- -- -- -- -- -- --
const controlRecipe = async () =>{
      //Grab id from URL
      const id = window.location.hash.replace('#', ''); //erase # symbol
      if(id){
      //UI changes
            lightMarker(id);
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
                  RecipeView.recipeCleaner();
                  RecipeView.singleRecipe(state.recipe);

            }catch(error)
            {
                  alert('Recipe not found , sorry!');
            }
            
      }
}
//EVENT FOR RECIPE CONTROLLER
//                       Id finder
window.addEventListener('hashchange', controlRecipe);
//['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));


//-- -- -- -- -- -- -- -- ---- -- -- -- -- -- -- -- ---- --LIST CONTROLLER -- -- -- ---- -- -- -- -- -- -- -- --

const controlList = () => {
      //Create List
      if(!state.list) state.list = new List();

      //Add Ingredients & update UI
      state.recipe.ingredients.forEach(el => {
            const item = state.list.addItem(el.count, el.unit. el.format);
            ListView.itemsRender(item);
      });
}

//EVENTs for List Controller
DOM.shopping.addEventListener('click', e => {
      const id = e.target.closest('.shopping__item').dataset.itemId;

      //Delete
      if(e.target.matches('.shopping__delete, .shopping__delete *'))
      {
            state.list.itemRemover(id);
            //UI
            listView.itemRemover(id);
      }
});

//Recipe buttons for Servings
window.addEventListener('click', e =>{
      if(e.target.matches('.btn-decrease, .btn-decrease *'))
      {
            state.recipe.servings > 1 ? state.recipe.updateServings('dec') : '';
      } 
      else if (e.target.matches('.btn-increase, .btn-increase *')) 
      {
            state.recipe.updateServings('inc');
      }
      else if (e.target.matches('.recipeBtnAdd , .recipeBtnAdd *'))
      {
            controlList();
      }
});

// LIST purchases
window.l = new List();  //instance in window to use List's methods

