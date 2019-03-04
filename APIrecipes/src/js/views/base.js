//DOM
export const elements = {
      searchForm: document.querySelector('.search'),
      searchInput: document.querySelector('.search__field'),
      resultsFrame: document.querySelector('.results'),
      leftResults: document.querySelector('.results__list'),
      resultPages: document.querySelector('.results__pages'),
      oneRecipe: document.querySelector('.recipe'),
      wholeList: document.querySelectorAll('.results__link'),
      shopping: document.querySelector('.shopping__list'),
      likesMenu: document.querySelector('.likes__field'),
      likesPanel: document.querySelector('.likes__list')
};

//GIF-Loader
export const loaderGif = parent => {
      const loader = `
            <div class="loader">
                  <svg>
                        <use href="img/icons.svg#icon-cw"></use>
                  </svg>
            </div>
      `;
      parent.insertAdjacentHTML('afterbegin', loader);
      //HIDE animation
      setTimeout(() => {
            document.querySelector('.loader').remove();
      },1700);
};

//SEARCHVIEW HELPERS
 //2. HELPER for inputRender >> buttons on Pagination
 //Pagination buttons maker
const maker = (page, type) => `
      <button class="btn-inline results__btn--${type}" data-id=${type === 'prev' ? page - 1: page + 1}>
                  <svg class="search__icon">
                        <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
                  </svg>
                  <span>Page ${type === 'prev' ? page - 1: page + 1}</span>
            </button>
`;
 //2. HELPER for Buttons on Pagination
export const renderButtons = (numResults, page, resPpage) => {
       const pages = Math.ceil(numResults / resPpage);
       let button;
       if (page === 1 && pages > 1) {
             //next
             button = maker(page, 'next');
       } else if (page < pages) {
             //next & previous
             button = `${maker(page, 'prev')} ${maker(page, 'next')}`;
       } else if (page === pages && pages > 1) {
             //previous
             button = maker(page, 'prev');
       }

       elements.resultPages.insertAdjacentHTML('afterbegin', button);
 };

// HIGHLIGHTED MARKER
export const lightMarker = id => {
      const arrAll = Array.from(elements.wholeList); //bunch of nodes   >> Array
      arrAll.forEach(el => {  //disable selected Actives
            el.classList.remove('results__link--active');
      });
      document.querySelector(`.results__link[href="#${id}"]`).classList.add('results__link--active'); //current active Checked
};

