const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  // // Iteration 2
  //   .then(() => {
  //     const newRecipe = Recipe.create(data[0]).then(() => {
  //       console.log(newRecipe);
  //     });
  //   })

  // Iteration 3
  .then(() => {
    Recipe.insertMany(data);
    data.forEach((data) => {
      console.log(data.title);
    });
  })

  .then(() => {
    // Iteration 4 - Update recipe
    const filter = { title: "Rigatoni alla Genovese" };
    const update = { duration: 100 };
    return Recipe.findOneAndUpdate(filter, update);
  })
  // Iteration 5
  .then((updatedRecipe) => {
    console.log("Recipe updated!");
  })

  .then(() => {
    return Recipe.deleteOne({ title: "Carrot Cake" });
  })
  .then(() => {
    console.log("Recipe deleted!");
    // Iteration 6
    return mongoose.connection.close();
  })
  .then(() => {
    console.log("Database connection closed!");
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
