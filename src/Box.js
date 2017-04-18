import React from 'react'
import Recipe from './Recipe'

class Box extends React.Component {
  render() {
    let recipelist = this.props.recipes.map( (recipe, index) => {
      return (
        <Recipe
          recipe={recipe}
          key={index}
          id={index}
          updateRecipe={this.props.updateRecipe}
          removeRecipe={this.props.removeRecipe}
          />
      )
    });
    return (
      <div>
        <div className="block"></div>
        <div className="">
          {recipelist}
        </div>
      </div>
    )
  }
}

export default Box
