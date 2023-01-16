class Nutrition {
  _parentEL = document.querySelector('.recipe__details');

  render(data) {
    const markup = this._generateMarkup(data);
    console.log('rrrrrrrrr');
    this._parentEL.insertAdjacentHTML('afterbegin', markup);
  }

  _generateMarkup(data) {
    return `
    <a class="btn--small recipe__btn" href="${data}">
        <span>Nutrition</span>
        <svg class="search__icon">
        </svg>
    </a>
    `;
  }
}

export default new Nutrition();
