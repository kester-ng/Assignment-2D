import React, { Component } from "react";
import axios from "axios";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Input,
  FormGroup,
  Label,
} from "reactstrap";

class CreateIngredientModal extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      newIngredientData: {
        name: "",
        price: "",
        stock: "",
      },
    };
  }

  addIngredient() {
    axios
      .post(
        "https://txxvc3m1zd.execute-api.ap-southeast-1.amazonaws.com/dev/api/ingredients",
        this.state.newIngredientData,
        {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        }
      )
      .then((response) => {
        // push it to the props ingredients data
        if (typeof response.data.data != "undefined") {
          this.props.ingredients.push(response.data.data);
          this.setState({
            newIngredientData: {
              name: "",
              price: "",
              stock: "",
            },
          });
        }
        this.props.toggleAddModal();
      });
  }

  render() {
    return (
      <div>
        <Modal isOpen={this.props.addModal} toggle={this.props.toggleAddModal}>
          <ModalHeader toggle={this.props.toggleAddModal}>
            Add a new ingredient or food item
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                id="name"
                value={this.state.newIngredientData.name}
                onChange={(e) => {
                  let { newIngredientData } = this.state;
                  newIngredientData.name = e.target.value;
                  this.setState({ newIngredientData });
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label for="price">Price</Label>
              <Input
                id="price"
                value={this.state.newIngredientData.price}
                onChange={(e) => {
                  let { newIngredientData } = this.state;
                  newIngredientData.price = e.target.value;
                  this.setState({ newIngredientData });
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label for="stock">Stock</Label>
              <Input
                id="stock"
                value={this.state.newIngredientData.stock}
                onChange={(e) => {
                  let { newIngredientData } = this.state;
                  newIngredientData.stock = e.target.value;
                  this.setState({ newIngredientData });
                }}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.addIngredient.bind(this)}>
              Add
            </Button>{" "}
            <Button color="secondary" onClick={this.props.toggleAddModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default CreateIngredientModal;
