import View from './View.js';
import icons from 'url:../../img/icons.svg'; // Parcel 2
import { state } from '../model.js';

class PreviewView extends View {
  _parentElement = '';

  _generateMarkup() {
    const id = window.location.hash.slice(1);

    return `
      <li class="preview">
        <a class="preview__link ${
          this._data.id === id ? 'preview__link--active' : ''
        }" href="#${this._data.id ?? ''}">
          <figure class="preview__fig">
            <img src="${this._data.image}" alt="${this._data.title}" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${this._data.title}</h4>
            <p class="preview__publisher">${this._data.publisher}</p>
            <div class="preview__user-generated hidden">
              <svg>
              <use href="${icons}#icon-user"></use>
              </svg>
            </div>
          </div>
          ${
            state.bookmarks.includes(this._data)
              ? `
          <button class="btn--tiny btn--dele">
            <svg>
              <use href="${icons}#icon-trush"></use>
            </svg>
          </button>
          `
              : ''
          }
        </a>
      </li>
    `;
  }
}

export default new PreviewView();
