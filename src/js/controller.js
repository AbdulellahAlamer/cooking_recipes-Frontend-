import * as model from './model.js';
import recipeView from './views/recipeView.js';
import ResultView from './views/resultView';
import './views/recipeView.js';
import 'core-js/stable';
import SearchView from './views/searchView';
import 'regenerator-runtime/runtime';
import Pagination from './views/paginationView';
import bookmark from './views//bookmarksView';
import resultView from './views/resultView';
import addRecipeView from './views/addRecipeView.js';
import { MODAL_CLISE_SEC } from './config.js';
import nutritionView from './views/nutritionView.js';
// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
const controllRecipe = async function () {
  try {
    const hach = window.location.hash.slice(1);
    if (!hach) return;
    console.log('hahahahahhahahahha');
    recipeView.renderSpener();

    ResultView.update(model.getSearchResultPage());

    await model.loadRecipe(hach);

    recipeView.render(model.state.recipe);

    console.log(model.state.recipe);

    bookmark.update(model.state.bookmarks); // from me
    // if (!model.state.search.query) return;
    console.log('fdfdfdfdfddfdfd');
    // nutritionView.render(model.CaloriesIMG());
  } catch {
    recipeView.renderError();
    console.log('controllRecipe line 32');
  }
};

const controllSearch = async function () {
  try {
    ResultView.renderSpener();
    const query = SearchView.getquery();
    if (!query) return;

    await model.loadSearch(query);
    console.log(model.state.search.result);
    // ResultView.render(model.state.search.result);
    ResultView.render(model.getSearchResultPage()); // "model.getSearchResultPage()" return an array

    Pagination.render(model.state.search);
  } catch (err) {
    alert('controllSearch \n line 36-40');
  }
};

const controlPagination = function (pageNum) {
  console.log(pageNum);
  ResultView.render(model.getSearchResultPage(pageNum));
  Pagination.render(model.state.search);
};

const controllServings = function (newServing) {
  console.log(model.state.recipe);
  model.servings(newServing);
  recipeView.update(model.state.recipe);
};

const controllBookMark = function () {
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  console.log(model.state.recipe);
  console.log(model.state.bookmarks);
  recipeView.update(model.state.recipe);
  bookmark.render(model.state.bookmarks);
};

const controllRenderBookmarks = function () {
  bookmark.render(model.state.bookmarks);
};

const controllAddRecipe = async function (recipe) {
  try {
    await model.uploadReicpe(recipe);
    console.log(model.state.recipe);
    recipeView.render(model.state.recipe);
    // addRecipeView.renderMassage('you add a recipe');
    // bookmark.render(model.state.bookmarks);
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLISE_SEC * 1000);
  } catch (err) {
    addRecipeView.renderError('wrong input');
  }
};

const int = function () {
  bookmark.addHandlerRender(controllRenderBookmarks);
  recipeView.addHandlerRender(controllRecipe);
  recipeView.addHandlerUpdateServings(controllServings);
  recipeView.addHandlerAddBookmark(controllBookMark);
  SearchView.addEvent(controllSearch);
  Pagination.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controllAddRecipe);
};
int();
