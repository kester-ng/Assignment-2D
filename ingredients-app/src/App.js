import React, { Component } from 'react';
import { Table, Button, Modal, ModalBody, ModalFooter, ModalHeader, Input, FormGroup, Label } from 'reactstrap'; 
import axios from 'axios';

class App extends Component {
  state = {
    ingredients: [],
    addModal: false,
    editModal: false,
    newIngredientData: {
      name: '',
      price: '',
      stock: ''
    },
    editIngredientData: {
      id: '',
      name: '',
      price: '',
      stock: ''
    }
  }

  // POST to AWS lambda
  addIngredient() {
    axios.post("https://pyyz2y0tzg.execute-api.us-east-1.amazonaws.com/dev/ingredients", this.state.newIngredientData, {
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    }).then((response) => {
      let { ingredients } = this.state;
      ingredients.push(response.data.ingredients);
      this.setState({
        addModal: false,
        newIngredientData: {
          name: '',
          price: '',
          stock: ''
        }
      });
    });
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

  editIngredient(id, name, price, stock) {
    this.setState ({
      editIngredientData: {id, name, price, stock},
      editModal: true
    });
  }

  toggleEditModal() {
    this.setState({
      editModal: !this.state.editModal
    });
  }

  deleteIngredient(id) {
    let url = "https://pyyz2y0tzg.execute-api.us-east-1.amazonaws.com/dev/ingredients/" + id;
    axios.delete(url, {
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    }).then((response) => {
      this.refreshData();
      this.setState({
        addModal: false
      });
    });
  }

  updateIngredient() {
    console.log(this.state.editIngredientData);
    let url = "https://pyyz2y0tzg.execute-api.us-east-1.amazonaws.com/dev/ingredients/" + this.state.editIngredientData.id;
    let updated = {
      name: this.state.editIngredientData.name,
      price: this.state.editIngredientData.price,
      stock: this.state.editIngredientData.stock
    };

    // do a put request
    axios.put(url, updated, {
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    }).then((response) => {
      this.refreshData();
      this.setState({
        editIngredientData: {
          _id: '',
          name: '',
          price: '',
          stock: ''
        },
        editModal: false
      });
    })
  }

  refreshData() {
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
            <Button color="success" size="small" className="mr-2" onClick={this.editIngredient.bind(this, ingredient._id, ingredient.name, ingredient.price.$numberDecimal, ingredient.stock)}>Edit</Button>
            <Button color="danger" size="small" onClick={this.deleteIngredient.bind(this, ingredient._id)}>Delete</Button>
          </td>
        </tr>
      );
    });

    return (
      <div className="App Container">
        <h1>Keep check of your ingredients or food items here!</h1>
        <Button className="my-3 ml-2" color="primary" onClick={this.toggleAddModal.bind(this)}>Add</Button>
        <Modal isOpen={this.state.addModal} toggle={this.toggleAddModal.bind(this)}>
          <ModalHeader toggle={this.toggleAddModal.bind(this)}>Add a new ingredient or food item</ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input id="name" value={this.state.newIngredientData.name} onChange={(e) => {
                  let { newIngredientData } = this.state;
                  newIngredientData.name = e.target.value;
                  this.setState({ newIngredientData });
                }}/>
              </FormGroup>
              <FormGroup>
                <Label for="price">Price</Label>
                <Input id="price" value={this.state.newIngredientData.price} onChange={(e) => {
                  let { newIngredientData } = this.state;
                  newIngredientData.price = e.target.value;
                  this.setState({ newIngredientData });
                }}/>
              </FormGroup>
              <FormGroup>
                <Label for="stock">Stock</Label>
                <Input id="stock" value={this.state.newIngredientData.stock} onChange={(e) => {
                  let { newIngredientData } = this.state;
                  newIngredientData.stock = e.target.value;
                  this.setState({ newIngredientData });
                }}/>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.addIngredient.bind(this)}>Add</Button>{' '}
              <Button color="secondary" onClick={this.toggleAddModal.bind(this)}>Cancel</Button>
            </ModalFooter>
        </Modal>
        <Modal isOpen={this.state.editModal} toggle={this.toggleEditModal.bind(this)}>
          <ModalHeader toggle={this.toggleEditModal.bind(this)}>Update a new ingredient or food item</ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input id="name" value={this.state.editIngredientData.name} onChange={(e) => {
                  let { editIngredientData } = this.state;
                  editIngredientData.name = e.target.value;
                  this.setState({ editIngredientData });
                }}/>
              </FormGroup>
              <FormGroup>
                <Label for="price">Price</Label>
                <Input id="price" value={this.state.editIngredientData.price} onChange={(e) => {
                  let { editIngredientData } = this.state;
                  editIngredientData.price = e.target.value;
                  this.setState({ editIngredientData });
                }}/>
              </FormGroup>
              <FormGroup>
                <Label for="stock">Stock</Label>
                <Input id="stock" value={this.state.editIngredientData.stock} onChange={(e) => {
                  let { editIngredientData } = this.state;
                  editIngredientData.stock = e.target.value;
                  this.setState({ editIngredientData });
                }}/>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.updateIngredient.bind(this)}>Update</Button>{' '}
              <Button color="secondary" onClick={this.toggleEditModal.bind(this)}>Cancel</Button>
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
