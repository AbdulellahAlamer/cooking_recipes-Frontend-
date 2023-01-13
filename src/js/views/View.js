import icons from 'url:../../img/icons.svg';
import { Fraction } from 'fractional';

export default class View {
  _data;
  /**
   * Render the received object to the DOM
   * @param {Object | Object[]} data The data to be rendered (e.g. recipe)
   * @param {boolean} [render=true] If false, create markup string instead of rendering to the DOM
   * @returns {undefined | string} A markup string is returned if render=false
   * @description it runs _generateMarkup() and (_clear() the _parentEL if render=true)
   * @this {Object} View instance
   * @author Abdulellah Alamer
   * @todo Finish implementation
   */
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const markup = this._generateMarkup();
    if (!render) return markup;
    this._clear();
    this._parentEL.insertAdjacentHTML('afterbegin', markup);
  }
  update(data) {
    // if (Array.isArray(data) && data.length === 0) return; // it is from me

    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentEL.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      // console.log(curEl, newEl.isEqualNode(curEl));

      // Updates changed TEXT
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        // console.log('💥', newEl.firstChild.nodeValue.trim());
        curEl.textContent = newEl.textContent;
      }

      // Updates changed ATTRIBUES
      if (!newEl.isEqualNode(curEl))
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
    });
  }
  _clear() {
    this._parentEL.innerHTML = '';
  }
  renderSpener() {
    const markup = `
          <div class="spinner">
            <svg>
              <use href="${icons}#icon-loader"></use>
            </svg>
          </div>
          `;
    this._clear();
    this._parentEL.insertAdjacentHTML('afterbegin', markup);
  }
  renderError(massage = this._errorMassage) {
    const markup = `
        <div class="error">
          <div>
            <svg>
              <use href="${icons}#icon-alert-triangle"></use>
            </svg>
          </div>
          <p>${massage}</p>
        </div>
        `;
    this._clear();
    this._parentEL.insertAdjacentHTML('afterbegin', markup);
  }
  renderMassage(massage = this._massage) {
    const markup = `
        <div class="massage">
          <div>
            <svg>
              <use href="${icons}#icon-smile"></use>
            </svg>
          </div>
          <p>${massage}</p>
        </div>
        `;
    this._clear();
    this._parentEL.insertAdjacentHTML('afterbegin', markup);
  }
}
