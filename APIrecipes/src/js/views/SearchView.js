//DOM
import {elements} from './base';
//UI methods

//1.Input getter
export const getInput = () => {elements.searchInput.value };

//2. Input UiCleaner
export const clearInput = () => { 
      elements.searchInput.value = '';
      console.log('done');
};

//4. Previous Inputs list UiCleaner
export const clearInpList = () => {
      elements.resultsInput.innerHTML = '';
}

//3.Results displayer
export const renderResults = (arr) => {
      arr.forEach(renderRecipe);
}

//3. Helper => Results displayer
const renderRecipe = recipe =>{
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
      elements.resultsInput.insertAdjacentElement("beforeend", markUp);
}