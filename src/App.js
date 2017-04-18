import React from 'react';
import Box from './Box';
import update from 'react-addons-update';
import './App.css';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      recipes: [
        {
          name: "Lasagna",
          ingredients: ["pomodoro","mozzarella"]
        },
        {
          name: "Focaccia",
          ingredients: ["farina","olio"]
        }
      ]
    }

    this.updateRecipe = this.updateRecipe.bind(this)
    this.removeRecipe = this.removeRecipe.bind(this)
  }
  componentWillMount() {
    var localrecipes = (typeof localStorage["_cuppilekkia_recipes"] !== "undefined") ? JSON.parse(localStorage["_cuppilekkia_recipes"]) : null;
    if (localrecipes) {
      this.setState({recipes: localrecipes});
    }
    console.log(localrecipes);
  }
  removeRecipe(id){
    const newrecipes = this.state.recipes.filter((recipe, index) => {
      if(index !== id) return recipe;
      return false;
    });
    this.setState({recipes: newrecipes});
  }
  updateRecipe(recipe, id) {
    this.setState({
      recipes: update(this.state.recipes, {[id]: {$set: recipe}})
    });
  }
  componentDidUpdate() {
    localStorage.setItem("_cuppilekkia_recipes", JSON.stringify(this.state.recipes));
  }
  render() {
    return (
      <div className="container">
        <div className="">
          <h2 className="title is-2">Recipe Box</h2>
        </div>
        <Box
          recipes={this.state.recipes}
          updateRecipe={this.updateRecipe}
          removeRecipe={this.removeRecipe}
          />
        <div className="block"></div>
        <button className="button is-primary">Add Recipe</button>
      </div>
    );
  }
}

export default App;
