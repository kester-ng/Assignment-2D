import React, { Component } from 'react';
import { Table, Button } from 'reactstrap'; 
import axios from 'axios';

class App extends Component {
  state = {
    ingredients: []
  }

  componentWillMount() {
    axios.get("https://pyyz2y0tzg.execute-api.us-east-1.amazonaws.com/dev/ingredients", {
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    }).then((response) => {
      this.setState({
        ingredients: response.data.ingredients
      })
    });
  }

  render() {
    let ingredients = this.state.ingredients.map((ingredient) => {
      return (
        <tr key={ingredient._id}>
          <td>{ingredient._id}</td>
          <td>{ingredient.name}</td>
          <td>{ingredient.price.$numberDecimal}</td>
          <td>{ingredient.stock}</td>
          <td>
            <Button color="success" size="small" className="mr-2">Edit</Button>
            <Button color="danger" size="small">Delete</Button>
          </td>
        </tr>
      );
    });

    return (
      <div className="App Container">
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
  
          <tbody>
            {ingredients}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default App;
