// For general polyfiling
import 'core-js/stable';
// For polyfilling async await
import { async } from 'regenerator-runtime';

import * as model from './model.js';
import { MODAL_CLOSE_SEC } from './config.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';

if (module.hot) {
  module.hot.accept();
}

const controlRecipes = async function () {
  try {
    // Get id:
    const id = window.location.hash.slice(1);

    // Guard clause:
    if (!id) return;

    // Render spinner:
    recipeView.renderSpinner();

    // Update resultsView style:
    resultsView.update(model.getSearchResultsPage());

    // Update bookmarksView style:
    bookmarksView.update(model.state.bookmarks);

    // Load recipe:
    await model.loadRecipe(id);

    // Render recipe:
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.error(err);
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    // Get query:
    const query = searchView.getQuery();

    // Guard clause:
    if (!query) return;

    // Fetch results:
    await model.loadSearchResults(query);

    // Render spinner:
    resultsView.renderSpinner();

    // Render results:
    resultsView.render(model.getSearchResultsPage(1));

    // Render pagination:
    paginationView.render(model.state.search);
  } catch (err) {
    console.error(err);
    recipeView.renderError();
  }
};

const controlPagination = function (goToPage) {
  // Render results:
  resultsView.render(model.getSearchResultsPage(goToPage));

  // Render pagination:
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // Update recipe servings in state:
  model.updateServings(newServings);

  // Render updated recipe:
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // When btn is clicked, update state:
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // Update recipe view:
  recipeView.update(model.state.recipe);

  // Update bookmarks view:
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // Render spinner
    addRecipeView.renderSpinner();

    // Upload the new recipe
    await model.uploadRecipe(newRecipe);

    // Render the new recipe
    recipeView.render(model.state.recipe);

    // Display success message
    addRecipeView.renderMessage();

    // Render bookmarks view
    bookmarksView.render(model.state.bookmarks);

    // Change ID in URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // Close form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error(err);
    addRecipeView.renderError(err.message);
  }
};

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
