//DOM
import {elements as DOM} from './base';

//1.Input getter
 export const getInput = () => DOM.searchInput.value;


 //-- -- -- -- -- -- -- -- ---- -- -- -- -- -- -- -- ---- -- -- -- -- -- -- -- ---- -- -- -- -- -- -- -- --
 //2. Input render 
 export const inputRender = (recipes, page=1, resPerpage=10) => {
       //pagination
       const start = (page - 1) * resPerpage;
       console.log(start);
       const end = (page * resPerpage);
       console.log(end);
       //results
       recipes.slice(start, end).forEach(renderRecipes);
      //render buttons
      //renderButtons(page, recipes.length, resPerpage);
 };

 //2.HELPER for inputRender
 const renderRecipes = (recipe) =>{
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
 
 //2. HELPER for inputRender >> buttons on Pagination
 //Pagination buttons maker
 const maker = (page, type) => {
      return `<button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1: page + 1}>
                  <svg class="search__icon">
                        <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
                  </svg>
                  <span>${type === 'prev' ? page - 1: page + 1}</span>
            </button>
      `;
}
  
 //2. HELPER for Buttons on Pagination
 const renderButtons = (page, numResults, resPpage) => {
       const pages = Math.ceil(numResults / resPpage);
       
       let button;
       if (page === 1 && pages > 1) {
             //next
             button = maker(page, 'next');
       } else if (page < pages) {
             //next & previous
             button = `
            ${maker(page, 'prev')}
            ${maker(page, 'next')}
        `;
       } else if (page === pages && pages > 1) {
             //previous
             button = maker(page, 'prev');
       }

      DOM.resultPages.insertAdjacentHTML('afterbegin', button);
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
