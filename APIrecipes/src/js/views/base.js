//DOM
export const elements = {
      searchForm: document.querySelector('.search'),
      searchInput: document.querySelector('.search__field'),
      resultsFrame: document.querySelector('.results'),
      leftResults: document.querySelector('.results__list'),
      resultPages: document.querySelector('.result__pages')
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


