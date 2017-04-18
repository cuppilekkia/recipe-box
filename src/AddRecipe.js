import React from 'react'

class AddRecipe extends React.Component {
  constructor(props) {
      super(props);
      this.addNewRecipe = this.addNewRecipe.bind(this)
  }

  addNewRecipe() {
    if (this.refs.addname.value === '') return false;
    if (this.refs.addingredients.value === '') return false;
    this.props.addRecipe(this.refs);
    this.refs.addname.value = '';
    this.refs.addingredients.value = '';
  }

  render() {
    return (
      <nav className="panel">
        <h4 className="panel-heading">
          <p className="control">
            <input className="input" type="text" name="addname"
              ref="addname"
              />
          </p>
        </h4>

          <div className="panel-block">
            <div className="block">Ingredients:</div>
            <p className="control">
              <input className="input" type="text" name="addingredients"
                ref="addingredients"
                />
            </p>
          </div>
          <div className="panel-block">

            <button
              className="button is-success"
              onClick={this.addNewRecipe} >
              Save
            </button>
            <button
              className="button is-warning"
              onClick={this.props.toggleAdd} >
              Cancel
            </button>


          </div>

      </nav>
    )
  }
}

export default AddRecipe;
