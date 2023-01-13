import View from './View.js';
import PreviewView from './previewsVew.js';
import icons from 'url:../../img/icons.svg';

class bookmark extends View {
  _parentEL = document.querySelector('.bookmarks__list');
  _errorMassage = 'you do not save any recipe';
  _massage = '';

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    return this._data
      .map(bookmark => PreviewView.render(bookmark, false))
      .join('');
  }
}

export default new bookmark();
