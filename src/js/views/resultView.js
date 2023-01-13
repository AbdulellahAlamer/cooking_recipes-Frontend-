import View from './View.js';
import PreviewView from './previewsVew.js';
import icons from '../../img/icons.svg';

class ResultView extends View {
  _parentEL = document.querySelector('.results');
  _errorMassage = 'we can not find this recipe, please try another one';
  _massage = '';
  _generateMarkup() {
    return this._data.map(result => PreviewView.render(result, false)).join('');
  }
}
export default new ResultView();

// _generateMarkupPreview(data) {
//     const id = window.location.hash.slice(1);
//     return `
//         <li class="preview">
//             <a class="preview__link${
//               data.id === id ? ' preview__link--active' : ''
//             }" href="#${data.id}">
//               <figure class="preview__fig">
//                 <img src="${data.image}" alt="${data.title}" />
//               </figure>
//               <div class="preview__data">
//                   <h4 class="preview__title">${data.title}</h4>
//                   <p class="preview__publisher">${data.publisher}</p>
//               </div>
//             </a>
//         </li>
//         `;
//   }
