'use strict';

// Via Fetch gewerkt, omdat in VS het niet zo lekker werkt met een prompt.

async function loadCakeRecipes() {
  try {
    const response = await fetch('./cake-recipes.json');
    if (!response.ok) {
      throw new Error('An error occurred while loading the file');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Something went wrong:', error);
    return null;
  }
}
      loadCakeRecipes();


// Your functions here

/* 1. Create a function that returns all authors of a given recipe list. Use the .forEach method. The function takes recipes, such as cakeRecipes, as arguments and returns a list of unique authors. 
This means that each author can only be found once in the returned list.  */

function getUniqueAuthors(recipes) {
  const authors = [];

  recipes.forEach(recipe => {
    const author = recipe.Author;
    if (author && !authors.includes(author)) {
      authors.push(author);
    }
  });

  return authors;
}

/* 2. Log this list to the console. */

// loadCakeRecipes().then(cakeRecipes => {
//   const uniqueAuthors = getUniqueAuthors(cakeRecipes);
//   console.log(uniqueAuthors);
// });

/* 3. Create a function that logs the name of each recipe. As input, it takes in a list of recipes with the same format as cakeRecipes. 
Use object destructuring in this function. If there are no recipes found in the input, then log that there are no recipes found. */

function logRecipeNames(recipes) {
  if (recipes.length === 0) {
    console.log('No recipes found');
    return;
  }

  recipes.forEach(({ Name }) => {
    console.log(Name);
  });
}

/* 4. Now, create a function that returns all recipes of a given author. Use the .filter method. 
The function takes recipes and author (string) as arguments and returns all recipes from the given author. */

function getRecipeNamesByAuthor(recipes, author) {
  return recipes
    .filter(recipe => recipe.Author === author)
    .map(recipe => recipe.Name);
}

/* 5. Log the names of these recipes to the console using the print function you just created. */

// loadCakeRecipes().then(cakeRecipes => {
//   if (cakeRecipes) {
//     const author = "James Martin";
//     const recipeNames = getRecipeNamesByAuthor(cakeRecipes, author);
//     if (recipeNames.length > 0) {
//       console.log(`All recipes from ${author} (${recipeNames.length}):`, recipeNames);
//     } else {
//       console.log(`No recipes found for ${author}`);
//     }
//   }
// });

/* 6. Create a function that returns a list of recipes that contain a given ingredient. 
The function takes a list of recipes as input and an ingredient as a string. 
Use the .filter() method to filter the recipes and the .some() method to check if the ingredient list contains the given ingredient (input).  */

function getRecipesByIngredient(recipes, ingredient) {
  return recipes.filter(recipe =>
    recipe.Ingredients &&
    recipe.Ingredients.some(item =>
      item.toLowerCase().includes(ingredient.toLowerCase())
    )
  );
}

/* 7. Log the names of the found recipes that contain a specific ingredient using your print function. 
For example, when you give the cakeRecipes list as input and “140g caster sugar” it should return: Christmas pud cupcakes, Baby buttermilk pancakes with sticky bananas & Brazils, Fruit-filled clementine cake. */

// loadCakeRecipes().then(cakeRecipes => {
//   if (cakeRecipes) {
//     const ingredient = "140g caster sugar";
//     const matchingRecipes = getRecipesByIngredient(cakeRecipes, ingredient);

//     if (matchingRecipes.length > 0) {
//       console.log(`Recipes with the ingredient "${ingredient}" (${matchingRecipes.length}):`);
//       matchingRecipes.forEach(({ Name }) => console.log(Name));
//     } else {
//       console.log(`No recipes found with the ingredient "${ingredient}".`);
//     }
//   }
// });

/* 8. Now, create a function that takes a list of recipes and a name (string) as input. The function returns a single recipe that matches the given name. 
Use the .find() and .includes() method.  */

function findRecipeByName(recipes, name) {
  return recipes.find(recipe =>
    recipe.Name && recipe.Name.toLowerCase().includes(name.toLowerCase())
  );
}

/* 9. Log the recipe into the console. */

// loadCakeRecipes().then(cakeRecipes => {
//   if (cakeRecipes) {
//     const name = ("chocolate");
//     const foundRecipe = findRecipeByName(cakeRecipes, name);

//     if (foundRecipe) {
//       console.log('Recipe found:', foundRecipe);
//     } else {
//       console.log(`No recipe found with a name matching "${name}".`);
//     }
//   }
// });

/* 10. Finally, create a function that returns all ingredients of a given recipe list into a single array. 
You can use this function, for example, when you want to create a grocery list. 
Use the .reduce() method to flatten the recipe array. */

function getAllIngredientsFromRecipeList(recipes) {
  return recipes.reduce((allIngredients, recipe) => {
    if (Array.isArray(recipe.Ingredients)) {
      return allIngredients.concat(recipe.Ingredients);
    }
    return allIngredients;
  }, []);
}

/* 11. Also log the output of the above function into the console. 
As input, we recommend using a shorter array than cakeRecipes. 
For example, you can use the list of recipes of a given author from one of the previous made functions. */

// loadCakeRecipes().then(cakeRecipes => {
//   if (cakeRecipes) {
//     const tomsRecipes = cakeRecipes.filter(recipe => recipe.Author === "Tom Kerridge");
//     const allIngredients = getAllIngredientsFromRecipeList(tomsRecipes);
//     console.log("All ingredients from recipes by Tom Kerridge:", allIngredients);
//   }
// });






// Part 2

const displayMenu = () => {
  console.log("\nRecipe Management System Menu:");
  console.log("1. Show All Authors");
  console.log("2. Show Recipe names by Author");
  console.log("3. Show Recipe names by Ingredient");
  console.log("4. Get Recipe by Name");
  console.log("5. Get All Ingredients of Saved Recipes");
  console.log("0. Exit");
  const choice = prompt("Enter a number (1-5) or 0 to exit: ");
  return parseInt(choice);
}

async function runMenu() {
let choice;
let savedRecept = [];

do {
  choice = displayMenu();

  switch (choice) {

    case 1: 
      const cakeRecipes = await loadCakeRecipes();
      const uniqueAuthors = getUniqueAuthors(cakeRecipes);
      console.log(`Show all Authors (${uniqueAuthors.length}):`, uniqueAuthors);
      break;

    case 2: {
      const author = prompt('Enter the name of an author:');
      const cakeRecipes = await loadCakeRecipes();
      const recipeNames = getRecipeNamesByAuthor(cakeRecipes, author);
      if (recipeNames.length > 0) {
        console.log(`All recipes from ${author} (${recipeNames.length}):`, recipeNames);
      } else {
        console.log(`No recipes found for ${author}`);
      }
      break;
    }

   case 3: {
      const ingredient = prompt('Enter the name of the ingredient:');
      const cakeRecipes = await loadCakeRecipes();
      const matchingRecipes = getRecipesByIngredient(cakeRecipes, ingredient);
      if (matchingRecipes.length > 0) {
        console.log(`Recipes with "${ingredient}" (${matchingRecipes.length}):`);
        matchingRecipes.forEach(r => console.log(r.Name));
      } else {
        console.log(`No recipes found with ingredient "${ingredient}".`);
      }
      break;
    }

    case 4: {
        const name = prompt('Enter the name of the recipe:');
        const cakeRecipes = await loadCakeRecipes();
        const foundRecipe = findRecipeByName(cakeRecipes, name);
        if (foundRecipe) {
          console.log('Recipe found:', foundRecipe);
          const save = confirm('Do you want to save this recipe?');
          if (save) {
            savedRecept.push(foundRecipe);
            console.log('Recipe saved.');
          }
        } else {
          console.log(`No recipe found with name "${name}".`);
        }
        break;
      }

    case 5: {
        if (savedRecept.length > 0) {
          console.log('Saved recipes:');
          savedRecept.forEach((r, i) => {
            console.log(`\n${i + 1}. ${r.Name}`);
            console.log(`Ingredients:\n${r.Ingredients.join('\n')}`);
          });
        } else {
          console.log('No recipes have been saved yet.');
        }
        break;
      }

    case 0:
        console.log('Exiting...');
        break;

      default:
        console.log('Invalid input. Please enter a number between 0 and 5.');
    }

  } while (choice !== 0);
}

runMenu();