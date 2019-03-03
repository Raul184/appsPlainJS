//DOM
import { elements as DOM } from './base';
//Fraction.js Library
import {Fraction} from 'fractional';
//-- -- -- -- -- -- -- -- ---- -- -- -- -- -- -- -- ---- -- -- -- -- -- -- -- ---- -- -

//SINGLE RECIPE CLEANER
export const recipeCleaner = () => { DOM.oneRecipe.innerHTML = ' '; }

// FRACTION MAKER
const fractMaker = count => { // LIBRARY USED >> FRACTIONAL
      if(count){
            const [int, dec] = count.toString().split('.').map(el => parseInt(el, 10));
            if(!dec) return count;
            if(int ===0){
                  const fr = new Fraction(count);
                  return `${fr.numerator}/${fr.denominator}`;
            }else{
                  const fr = new Fraction(count - int);
                  return `${int} ${fr.numerator}/${fr.denominator}`;
            }
      }
      return '?';
};

//-- -- -- -- -- -- -- -- ---- -- -- -- -- -- -- -- ---- -- -- -- -- -- -- -- ---- -- --
//HELPER FOR Single Recipe View Method
const makeDomIngredients = objIng => `
      <li class="recipe__item">
            <svg class="recipe__icon">
                  <use href="img/icons.svg#icon-check"></use>  
            </svg>  
            <div class="recipe__count">${fractMaker(objIng.count)}</div>  
            <div class="recipe__ingredient">
                  <span class="recipe__unit">${objIng.unit}</span>
                  ${objIng.format} 
            </div>  
      </li>
`;

//SINGLE RECIPE VIEW

export const singleRecipe = one => {
      const markUp = `
            <figure class="recipe__fig">
                           <img src="${one.img}" alt="${one.title}" class="recipe__img">
                           <h1 class="recipe__title">
                           <span>"${one.title}"</span>
                           </h1> 
            </figure> 
            <div class="recipe__details">
                  <div class="recipe__info">
                        <svg class="recipe__info-icon">
                           <use href="img/icons.svg#icon-stopwatch"></use> 
                        </svg> 
                        <span class="recipe__info-data recipe__info-data--minutes">${one.time}</span> 
                        <span class="recipe__info-text">minutes</span> 
                  </div> 
                  <div class="recipe__info">
                        <svg class="recipe__info-icon">
                              <use href="img/icons.svg#icon-man"></use> 
                        </svg> 
                        <span class="recipe__info-data recipe__info-data--people">${one.servings}</span> 
                        <span class="recipe__info-text">servings</span>
                        
                        <div class="recipe__info-buttons">
                              <button class="btn-tiny btn-decrease">
                                    <svg>
                                          <use href="img/icons.svg#icon-circle-with-minus"> </use> 
                                    </svg> 
                              </button> 
                              <button class="btn-tiny btn-increase">
                                    <svg>
                                          <use href="img/icons.svg#icon-circle-with-plus"> </use> 
                                    </svg> 
                              </button> 
                        </div>
                  </div> 
                  <button class="recipe__love">
                        <svg class="header__likes">
                              <use href="img/icons.svg#icon-heart-outlined"></use> 
                        </svg> 
                  </button> 
            </div>
            <div class="recipe__ingredients">
                  <ul class="recipe__ingredient-list">
                  ${one.ingredients.map(el => makeDomIngredients(el)).join('')}
                  </ul>

                  <button class="btn-small recipe__btn recipeBtnAdd">
                        <svg class="search__icon">
                              <use href="img/icons.svg#icon-shopping-cart"></use> 
                        </svg> 
                        <span>Add to shopping list</span> 
                  </button> 
            </div>

            <div class="recipe__directions">
                  <h2 class="heading-2">How to cook it</h2> 
                  <p class="recipe__directions-text">
                        This recipe was carefully designed and tested by
                        <span class="recipe__by">${one.author}</span>. 
                        Please check out directions at their website. 
                  </p> 
                  <a class="btn-small recipe__btn" href="${one.url}" target="_blank">
                        <span>Directions</span> 
                        <svg class="search__icon">
                              <use href="img/icons.svg#icon-triangle-right"></use> 
                        </svg>
                  </a> 
            </div>
      `;
      DOM.oneRecipe.insertAdjacentHTML('afterbegin', markUp);
};
 //-- -- -- -- -- -- -- -- ---- -- -- -- -- -- -- -- ---- -- -- -- -- -- -- -- ---- -- -
//Service/Ingredients UI UPDATER
export const updateServIngred = recipe => {
      //update Servings
      document.querySelector('.recipe__info-data--people').textContent = recipe.servings;

      //update Ingredients
      const allIngred = Array.from(document.querySelectorAll('.recipe__count'));
      countElements.forEach((el, i) =>{
            el.textContent = fractMaker(recipe.ingredients[i].count);
      });
}

