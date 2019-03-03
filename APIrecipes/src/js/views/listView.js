import {elements} from './base';

//------------------------------------------------------------------------

//ADD 
export const itemsRender = item =>{
      const markUp = `
            <li class="shopping__item" data-itemId="${item.id}">
                  <div class="shopping__count">
                        <input type="number" value="${item.count}" step="${item.count}" class="shopping_countValue">
                        <p>${item.unit}</p> 
                  </div> 
                  <p class="shopping__description">${item.ingredient}</p> 
                  <button class="shopping__delete btn-tiny">
                        <svg>
                              <use href = "img/icons.svg#icon-circle-with-cross"></use> 
                        </svg> 
                  </button> 
            </li>`;
      elements.shopping.insertAdjacentHTML('beforeend', markUp);
};

//-----------------------------------------------------------------------------

//REMOVE
export const itemRemover = id => {
      const item = document.querySelector(`[data-itemId="${id}"]`);
      if(item) item.parentElement.removeChild(item);
};
