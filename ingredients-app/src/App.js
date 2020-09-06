import React, { Component } from 'react';
import { Table, Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'; 
import axios from 'axios';

class App extends Component {
  state = {
    ingredients: [],
    addModal: false
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

  toggleAddModal() {
    this.setState({
      addModal: !this.state.addModal
    })
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
        <Button color="primary" onClick={this.toggleAddModal.bind(this)}>Add</Button>
        <Modal isOpen={this.state.addModal} toggle={this.toggleAddModal.bind(this)}>
        <ModalHeader toggle={this.toggleAddModal.bind(this)}>Modal title</ModalHeader>
          <ModalBody>
            Cats are the cutest thing alive!
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggleAddModal.bind(this)}>Do Something</Button>{' '}
            <Button color="secondary" onClick={this.toggleAddModal.bind(this)}>Cancel</Button>
          </ModalFooter>
        </Modal>
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
