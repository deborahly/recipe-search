# FORKIFY (recipes-website)

### CONCEPT
Forkify is a website to search for recipes from an API, which in its turn aggregates recipes from many different sources on the internet. The app also allows users to add their own recipes to the application, which will, however, only be visible to them. Other app features are the possibility to bookmark your favourite recipes, and the ability to change the servings, reflecting on the recipe's ingredients measure.

App deployed in: [https://forkify-delight.netlify.app/](https://forkify-delight.netlify.app/)

### PROJET CHARACTERISTICS 
The project is a SPA built using ES6 modern features, like classes, modules and async/await, and following the Model-View-Controller (MVC) architecture. For bundling the files, the project uses Parcel, and for styling, Sass.

The Fetch API is used to fetch the search results, as well as to upload new recipes to the API. As for the bookmarks, they are stored in the browser local storage.  

### KEY FEATURES
- Search for recipes and see the results on a side list, with pagination
- Visualize the selected recipe in the center of the page, with the title, an image, the preparation time, the number of servings, the ingredients and the link to the recipe's original page, for further instructions on how to prepare it
- On the recipe view, change the number of servings to get the ingredients measure updated accordingly
- On the recipe view, click on the bookmark icon to add/remove the recipe to/from the bookmarks
- On the navigation bar, click on "ADD RECIPE" to add a recipe of your own creation
- On the navigation bar, click on "BOOKMARKS" to check all the recipes on the bookmarks drop-down

### INSTALL AND RUN
Clone branch and install all dependencies:

```bash
git clone https://github.com/deborahly/recipes-website.git
cd recipes-website
npm install
```

To run the application, execute:

```bash
npm start
```
The app is going to run on [127.0.0.1:1234](http://127.0.0.1:1234/).
