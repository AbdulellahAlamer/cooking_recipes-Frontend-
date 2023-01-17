import icons from 'url:../../img/icons.svg';
// import * as model from '../model.js';
import View from './View';

class Pagination extends View {
  _parentEL = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentEL.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goto = +btn.dataset.goto;
      handler(goto);
    });
  }

  _generateMarkup() {
    const curPage = this._data.curentPage;
    const numPages = Math.ceil(
      this._data.result.length / this._data.resultPerPage
    );
    const viewCurentPage = `
    <div class="message">
      <span>${curPage} of ${numPages}</span>
    </div>
    `;

    //  'Page1 , and there are other pages';
    if (curPage === 1 && numPages > 1) {
      return `
        <button data-goto="${
          curPage + 1
        }" class="btn--inline pagination__btn--next">
                <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
        ${viewCurentPage}
        `;
    }
    //  'last page';
    if (curPage === numPages && numPages > 1) {
      return `
      <button data-goto="${
        curPage - 1
      }" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
          </svg>
              <span>Page ${curPage - 1}</span>
      </button>
      ${viewCurentPage}
      `;
    }
    //  'other pages';
    if (curPage < numPages) {
      return `
        <button data-goto="${
          curPage + 1
        }" class="btn--inline pagination__btn--next">
                <span>Page${curPage + 1}</span>
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
        <button data-goto="${
          curPage - 1
        }" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
          </svg>
              <span>Page ${curPage - 1}</span>
        </button>
        ${viewCurentPage}
        `;
    }
    //  'only  1 page';
    return '';
  }
}
export default new Pagination();
