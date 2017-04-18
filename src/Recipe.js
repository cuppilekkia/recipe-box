import React from 'react'
import update from 'react-addons-update';
import Collapse from 'react-collapse';


class Recipe extends React.Component {
  constructor() {
    super();
    this.state = {
      editing: false,
      newRecipe: {
        name: '',
        ingredients: []
      },
      isOpened: false
    }
    this.toggleEdit = this.toggleEdit.bind(this);
    this.saveTitle = this.saveTitle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.toggleOpen = this.toggleOpen.bind(this);
  }
  toggleOpen() {
    if (!this.state.editing) {
      this.setState({isOpened: !this.state.isOpened});
    }
  }
  toggleEdit() {
    this.setState({editing: !this.state.editing});
  }
  componentWillMount() {
    this.setState({
      newRecipe: this.props.recipe
    });
  }
  handleChange(e) {
    let target = e.target;
    let value = target.value;
    let name = target.name;
    if (name === "ingredients") {
      value = value.split(",");
      value = value.filter((val)=>{
        if(val.trim()) return val.trim();
        return false;
      });
      value = value.map((val)=>val.trim());
    }
    this.setState({
      newRecipe: update(this.state.newRecipe, {[name]: {$set: value}})
    });
  }
  handleRemove() {
    this.props.removeRecipe(this.props.id);
  }
  saveTitle() {
    let wrecipe = this.state.newRecipe;
    this.props.updateRecipe(wrecipe, this.props.id);

    this.toggleEdit();
  }
  render() {

    let heading = null;
    if (this.state.editing) {
      heading = <p className="control">
        <input className="input" type="text" name="name"
          ref="name"
          defaultValue={this.props.recipe.name}
          onBlur={this.saveTitle}
          onChange={this.handleChange}
          /></p>
    } else {
      heading = <span>{this.props.recipe.name}</span>;
    }
    let ingredients = null;
    if (this.state.editing) {
      ingredients = <p className="control">
        <input className="input" type="text" name="ingredients"
          ref="ingredients"
          defaultValue={this.props.recipe.ingredients}
          onBlur={this.saveTitle}
          onChange={this.handleChange}
          /></p>
    } else {
      ingredients = this.props.recipe.ingredients.map( (x,i) => {
        return <span className="tag is-primary is-medium" key={i}>{x}</span>
      })
    }

    return (
      <nav className="panel">
        <h4 className="panel-heading"
          onClick={this.toggleOpen}
          >
          {heading}
        </h4>
        <Collapse isOpened={this.state.isOpened}
          springConfig={{stiffness: 250, damping: 15}}>
          <div className="panel-block">
            {ingredients}
          </div>
          <div className="panel-block">

            <button
              className="button is-light"
              onClick={this.toggleEdit} >
              Edit
            </button>
            <button
              className="button is-danger is-outlined"
              onClick={this.handleRemove}>
              Delete
            </button>

          </div>
        </Collapse>

      </nav>
    )
  }
}

export default Recipe;
