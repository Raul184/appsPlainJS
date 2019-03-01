//DOM
import {elements as DOM, renderButtons} from './base';



//1.Input getter
 export const getInput = () => DOM.searchInput.value;


 //-- -- -- -- -- -- -- -- ---- -- -- -- -- -- -- -- ---- -- -- -- -- -- -- -- ---- -- -- -- -- -- -- -- --

 //2.HELPER for inputRender
 const renderRecipes = (recipe) => {
       const markUp = `<li>
                    <a class="results__link results__link--active" href="#${recipe.recipe_id}">
                        <figure class="results__fig">
                            <img src="${recipe.image_url}" alt="${recipe.title}">
                        </figure>
                        <div class="results__data">
                            <h4 class="results__name">${recipe.title}</h4>
                            <p class="results__author">${recipe.publisher}</p>
                        </div>
                    </a>
                </li>`;
       DOM.leftResults.insertAdjacentHTML('beforeend', markUp);
 };
 //2. Input render 
 export const inputRender = (recipes, page=1, resPerpage=10) => {
       //pagination
       const start = (page - 1) * resPerpage;
       const end = (page * resPerpage);
       //results
       recipes.slice(start, end).forEach(renderRecipes);
      //render buttons
      renderButtons(page, recipes.length, resPerpage);
 };

//-- -- -- -- -- -- -- -- ---- -- -- -- -- -- -- -- ---- -- -- -- -- -- -- -- ---- -- -- -- -- -- -- -- --

 //3. UI Cleaner for Input
 export const clearInput = () => {
       DOM.searchInput.value = '';
 };
 //3.2 UI Cleaner for Recipes list 
 export const clearList = () => {
       DOM.leftResults.innerHTML = '';
 }
 
//-- -- -- -- -- -- -- -- ---- -- -- -- -- -- -- -- ---- -- -- -- -- -- -- -- ---- -- -- -- -- -- -- -- --
