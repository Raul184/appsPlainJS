import { elements } from './base';

//ICON LIKED OR NOT Method
export const toggleLikes = isLiked => {
      //on & off toogle method
      const iconStr = isLiked ? 'icon-heart' : 'icon-heart-outlined';
      //select component and mofidy base on previous statement
      document.querySelector('.recipe__love use').setAttribute('href', `img/icons.svg#${iconStr}`);
};

//LIKES Menu displayed or not 
export const tooggleLikesMenu = numLikes => {
      elements.likesMenu.style.visibility = numLikes > 0 ? 'visible' : 'hidden';
};

// LIKES ADD function on Likes dropDown
export const renderLikes = like => {
      const markUp = `
             <li>
                  <a class="likes__link" href="#${like.id}">
                        <figure class="likes__fig">
                              <img src="${like.img}" alt="${like.title}">
                        </figure>
                        <div class="likes__data">
                              <h4 class="likes__name">${like.title}</h4>
                              <p class="likes__author">${like.author}</p>
                        </div>
                  </a>
            </li>
      `;
      elements.likesPanel.insertAdjacentHTML('beforeend', markUp);
};

// LIKES REMOVE function on Likes dropDown
export const deleteLikes = id => {             
      const el = document.querySelector(`.likes__link[href*="${id}"]`).parentElement;
      if(el) el.parentElement.removeChild(el); 
}
