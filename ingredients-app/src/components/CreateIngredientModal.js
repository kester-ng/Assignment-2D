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
  FormFeedback
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
    // validate first!
    if (!this.validateName(this.state.newIngredientData.name) || !this.validatePrice(this.state.newIngredientData.price) || !this.validateStock(this.state.newIngredientData.stock)) {
      return; // nothing happens
    }
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

  validatePrice(target) {
    return target.match("^[0-9]+([,.][0-9]+)?$");
  }

  validateStock(target) {
    if (target == "") {
      return false;
    }
    return target.match("^[0-9]*$");
  }

  validateName(target) {
    return !(target == ""); //non-empty
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
                type="text"
                valid={this.validateName(this.state.newIngredientData.name)}
                invalid={!this.validateName(this.state.newIngredientData.name)}
                onChange={(e) => {
                  let { newIngredientData } = this.state;
                  newIngredientData.name = e.target.value;
                  this.setState({ newIngredientData });
                }}
              />
              <FormFeedback>Name must not be empty!</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="price">Price</Label>
              <Input
                id="price"
                type="text"
                value={this.state.newIngredientData.price}
                valid={this.validatePrice(this.state.newIngredientData.price)}
                invalid={!this.validatePrice(this.state.newIngredientData.price)}
                onChange={(e) => {
                  let { newIngredientData } = this.state;
                  newIngredientData.price = e.target.value;
                  this.setState({ newIngredientData });
                }}
              />
              <FormFeedback>Price must be an integer or decimal!</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="stock">Stock</Label>
              <Input
                id="stock"
                value={this.state.newIngredientData.stock}
                type="text"
                valid={this.validateStock(this.state.newIngredientData.stock)}
                invalid={!this.validateStock(this.state.newIngredientData.stock)}
                onChange={(e) => {
                  let { newIngredientData } = this.state;
                  newIngredientData.stock = e.target.value;
                  this.setState({ newIngredientData });
                }}
              />
              <FormFeedback>Stock must be an integer!</FormFeedback>
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
