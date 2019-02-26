//DOM ELEMENTS 
export const elements = {
      searchInput: document.querySelector('.search__field'),
      searchForm: document.querySelector('.search'),
      resultsInput: document.querySelector('.results__list'),
      results: document.querySelector('.results')
};

//RenderLoader
export const renderLoader = parent =>{
      const loader = `
            <div class="loader">
                  <svg>
                        <use href="img/icons.svg#icon-cw"></use>
                  </svg>
            </div>
            `;
      parent.insertAdjacentHTML('afterbegin', loader);
};