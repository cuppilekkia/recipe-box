import React from 'react';
import Box from './Box';
import AddRecipe from './AddRecipe';
import update from 'react-addons-update';
import './App.css';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isAdding: false,
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
    this.toggleAdd = this.toggleAdd.bind(this)
    this.addRecipe = this.addRecipe.bind(this)
  }
  componentWillMount() {
    var localrecipes = (typeof localStorage["_cuppilekkia_recipes"] !== "undefined") ? JSON.parse(localStorage["_cuppilekkia_recipes"]) : null;
    if (localrecipes) {
      this.setState({recipes: localrecipes});
    }
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
  addRecipe(data) {
    this.toggleAdd();
    let temp = this.state.recipes.map(x => x);
    let newrec = {};
    newrec.name = data.addname.value;
    newrec.ingredients = data.addingredients.value.split(",");
    newrec.ingredients = newrec.ingredients.filter((val)=>{
      if(val.trim()) return val.trim();
      return false;
    });
    newrec.ingredients = newrec.ingredients.map((val)=>val.trim());
    temp.push(newrec);
    this.setState({recipes: temp});
  }
  toggleAdd() {
    this.setState({isAdding: !this.state.isAdding});
  }
  componentDidUpdate() {
    localStorage.setItem("_cuppilekkia_recipes", JSON.stringify(this.state.recipes));
  }
  render() {
    let addForm = null;
    if (this.state.isAdding) {
      addForm = <AddRecipe
                  addRecipe={this.addRecipe}
                  toggleAdd={this.toggleAdd}/>
    }
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
        {addForm}
        <button className="button is-primary"
          onClick={this.toggleAdd}>
          Add Recipe
        </button>
      </div>
    );
  }
}

export default App;
