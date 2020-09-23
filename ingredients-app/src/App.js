import React, { Component } from 'react';
import { Table, Button } from 'reactstrap'; 
import axios from 'axios';
import CreateIngredientModal from './components/CreateIngredientModal';
import EditIngredientModal from './components/EditIngredientModal';

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

  componentWillMount() {
    axios.get("https://txxvc3m1zd.execute-api.ap-southeast-1.amazonaws.com/dev/api/ingredients", {
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    }).then((response) => {
      console.log(response);
      this.setState({
        ingredients: response.data.data
      })
    });

    this.toggleAddModal = this.toggleAddModal.bind(this);
    this.toggleEditModal = this.toggleEditModal.bind(this);
    this.updateName = this.updateName.bind(this);
    this.updatePrice = this.updatePrice.bind(this);
    this.updateStock = this.updateStock.bind(this);
    this.refreshData = this.refreshData.bind(this);
    this.clearEdit = this.refreshData.bind(this);
  }

  toggleAddModal() {
    this.setState({
      addModal: !this.state.addModal
    });
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

  updateName = (e) => {
    let { editIngredientData } = this.state;
    editIngredientData.name = e.target.value;
    this.setState({ editIngredientData });
  }

  updatePrice = (e) => {
    let { editIngredientData } = this.state;
    editIngredientData.price = e.target.value;
    this.setState({ editIngredientData });
  }

  updateStock = (e) => {
    let { editIngredientData } = this.state;
    editIngredientData.stock = e.target.value;
    this.setState({ editIngredientData });
  }

  clearEdit() {
    this.setState({
      editIngredientData: {
        _id: '',
        name: '',
        price: '',
        stock: ''
      },
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
    let url = "https://txxvc3m1zd.execute-api.ap-southeast-1.amazonaws.com/dev/api/ingredients" + this.state.editIngredientData.id;
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
    axios.get("https://txxvc3m1zd.execute-api.ap-southeast-1.amazonaws.com/dev/api/ingredients", {
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    }).then((response) => {
      this.setState({
        ingredients: response.data.data
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
        <CreateIngredientModal addModal={this.state.addModal} toggleAddModal={this.toggleAddModal} ingredients={this.state.ingredients}></CreateIngredientModal>
        <EditIngredientModal editModal={this.state.editModal} toggleEditModal={this.toggleEditModal} editIngredientData={this.state.editIngredientData} updateName={this.updateName} updatePrice={this.updatePrice} updateStock={this.updateStock} clearEdit={this.clearEdit} refreshData={this.refreshData}></EditIngredientModal>
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
