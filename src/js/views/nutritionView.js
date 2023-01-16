class Nutrition {
  _parentEL = document.querySelector('.recipe__details');

  render(data) {
    const markup = this._generateMarkup(data);
    this._parentEL.insertAdjacentHTML('afterbegin', markup);
  }

  _generateMarkup(data) {
    return `
    <a class="btn--small recipe__btn" href="${data}">
          <span>Nutrition</span>
          <svg class="search__icon">
            <use href="http://localhost:1234/icons.dfd7a6db.svg?1673887752880#icon-arrow-right"></use>
          </svg>
    </a>
    `;
  }
}

export default new Nutrition();
