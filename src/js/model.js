import { Get_Json, sendJSON } from './helpers.js';
import { API_URL, RES_PER_PAGE } from './config';

export const state = {
  recipe: {},
  search: {
    query: '', // the input ex:"pizza"
    result: [], // array of the objects
    curentPage: 1, // what page your are at
    resultPerPage: RES_PER_PAGE, // who much recipe you want to be in the page
  },
  bookmarks: [],
};

const creatRecipeObject = function (data) {
  const { recipe } = data.data;
  return {
    title: recipe.title,
    id: recipe.id,
    publisher: recipe.publisher,
    image: recipe.image_url,
    sourceUrl: recipe.source_url,
    servings: recipe.servings,
    ingredients: recipe.ingredients,
    cookingTime: recipe.cooking_time,
    // ...(recipe.key && { key: recipe.key }), // the post request does not work
  };
};

export const loadRecipe = async function (id) {
  try {
    const data = await Get_Json(`${API_URL}/${id}`);
    state.recipe = creatRecipeObject(data);

    if (state.bookmarks.some(bookmark => bookmark.id === id)) {
      state.recipe.bookmarked = true;
    } else {
      state.recipe.bookmarked = false;
    }

    // console.log(recipe);
  } catch (err) {
    alert('Error in model.js > loadRecipe()');
    throw err;
  }
};
export const loadSearch = async function (item) {
  try {
    const data = await Get_Json(`${API_URL}?search=${item}`);
    state.search.query = item;
    state.search.result = data.data.recipes.map(el => {
      return {
        id: el.id,
        title: el.title,
        publisher: el.publisher,
        image: el.image_url,
        // ...(el.key && { key: el.key }), // the post request does not work
      };
    });
    state.search.curentPage = 1;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getSearchResultPage = function (page = state.search.curentPage) {
  state.search.curentPage = page;
  const start = (page - 1) * state.search.resultPerPage;
  const end = page * state.search.resultPerPage;
  return state.search.result.slice(start, end);
};

export const servings = function (newServing) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServing) / state.recipe.servings;
  });
  state.recipe.servings = newServing;
};

const persistBookMarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const addBookmark = function (recipe) {
  // add the recipe to the bookmark array
  state.bookmarks.push(recipe);

  // give the recipe a mark
  if (state.recipe.id === recipe.id) state.recipe.bookmarked = true;

  // store in the localStorage
  persistBookMarks();
};
export const deleteBookmark = function (id) {
  // Delete bookmark
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);

  // Mark current recipe as NOT bookmarked
  if (id === state.recipe.id) state.recipe.bookmarked = false;

  // delete in the localStorage
  persistBookMarks();
};

const init = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
};
init();

const clearBookmarks = function () {
  localStorage.clear('bookmarks');
};
// clearBookmarks();

export const uploadReicpe = async function (newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ing => {
        const ingArr = ing[1].split(',').map(el => el.trim());
        // const ingArr = ing[1].replaceAll(' ', '').split(',');
        if (ingArr.length !== 3)
          throw new Error(
            'Wrong ingredient fromat! Please use the correct format :)'
          );

        const [quantity, unit, description] = ingArr;

        return { quantity: quantity ? +quantity : null, unit, description };
      });

    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };
    console.log(recipe);

    // const data = await AJAX(`${API_URL}?key=${KEY}`, recipe);
    // state.recipe = creatRecipeObject(data);
    state.recipe = recipe;
    // addBookmark(state.recipe);
  } catch (err) {
    throw err;
  }
};
