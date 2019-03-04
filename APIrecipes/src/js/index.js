//IMPORTS

//SEARCH Model
import Search from './models/Search';
//RECIPE Model
import Recipe from './models/Recipe';
//LIST Model
import List from './models/List';
//LIKES Model
import Likes from './models/Likes';
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
            const item = state.list.addItem(el.count, el.unit, el.format);
            console.log(item);
            ListView.itemsRender(item);
      });
}

//EVENTs for List Controller
DOM.shopping.addEventListener('click', e => {
      const id = e.target.closest('.shopping__item').dataset.itemId;

      //Delete
      if(e.target.matches('.shopping__delete, .shopping__delete *'))
      {
            state.list.deleteItem(id);
            //UI
            listView.itemRemover(id);
      }
});

// LIST Methods available
window.l = new List();  //instance in window to use List's methods

//Recipe EVENTS
window.addEventListener('click', e =>{
      if(e.target.matches('.btn-decrease, .btn-decrease *'))      
      {     //buttons +/-
            state.recipe.servings > 1 ? state.recipe.updateServings('dec') : '';
      } 
      else if(e.target.matches('.btn-increase, .btn-increase *')) 
      {     //Add & - buttons
            state.recipe.updateServings('inc');
      }
      else if(e.target.matches('.recipeBtnAdd , .recipeBtnAdd *')) 
      {     //List > CONTROLLER
            controlList();
      }
      else if(e.target.matches('.recipe__love, .recipe__love *'))
      {     //Like > CONTROLLER
            controlLike();
      } 
});

//-- -- -- -- -- -- -- -- ---- -- -- -- -- -- -- -- ---- --LIKES CONTROLLER -- -- -- ---- -- -- -- -- -- -- -- --
const controlLike = () => {
      if(!state.likes) state.likes = new Likes();
      const currentID = state.recipe.id;        //state obj to manage current recipes

      if(!state.likes.isLiked(currentID)){
            // + like to state obj
            const liked = state.likes.addLike(currentID, state.recipe.title, state.recipe.author, state.recipe.img)
            // Togle like button

            // + like to UI
            console.log(state.likes);
      } else
      {
            // - like to state obj
            state.likes.deleteLike(currentID);
            // Togle like button

            // - like to UI
            console.log(state.likes);
      }

};



