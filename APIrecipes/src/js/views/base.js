//DOM
export const elements = {
      searchForm: document.querySelector('.search'),
      searchInput: document.querySelector('.search__field'),
      resultsFrame: document.querySelector('.results'),
      leftResults: document.querySelector('.results__list'),
      resultPages: document.querySelector('.results__pages')
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
export const renderButtons = (page, numResults, resPpage) => {
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
