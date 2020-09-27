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

class EditIngredientModal extends Component {
  constructor(props) {
    super(props);
  }

  updateIngredient() {
    if (!this.validateName(this.props.editIngredientData.name) || !this.validatePrice(this.props.editIngredientData.price) || !this.validateStock(this.props.editIngredientData.stock)) {
      return;
    }
    let url =
      "https://txxvc3m1zd.execute-api.ap-southeast-1.amazonaws.com/dev/api/ingredients/" +
      this.props.editIngredientData.id;
    let updated = {
      name: this.props.editIngredientData.name,
      price: this.props.editIngredientData.price,
      stock: this.props.editIngredientData.stock,
    };

    // do a put request
    axios
      .put(url, updated, {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      })
      .then((response) => {
        if (typeof response.data.data != "undefined") {
          this.props.clearEdit();
          this.props.refreshData();
          this.props.toggleEditModal();
        }
      });
  }

  updateName(e) {
    let { editIngredientData } = this.state;
    editIngredientData.name = e;
    this.setState({ editIngredientData });
    this.props.updateName(e);
  }

  validatePrice(target) {
    return target.match("^[0-9]+([,.][0-9]+)?$");
  }

  validateStock(target) {
    var stock = target.toString();
    if (stock == "") {
      return false;
    }
    return stock.match("^[0-9]*$");
  }

  validateName(target) {
    return !(target == ""); //non-empty
  }

  render() {
    return (
      <Modal isOpen={this.props.editModal} toggle={this.props.toggleEditModal}>
        <ModalHeader toggle={this.props.toggleEditModal}>
          Update a new ingredient or food item
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input
              id="name"
              type="text"
              valid={this.validateName(this.props.editIngredientData.name)}
              invalid={!this.validateName(this.props.editIngredientData.name)}
              value={this.props.editIngredientData.name}
              onChange={this.props.updateName}
            />
          </FormGroup>
          <FormGroup>
            <Label for="price">Price</Label>
            <Input
              id="price"
              type="text"
              valid={this.validatePrice(this.props.editIngredientData.price)}
              invalid={!this.validatePrice(this.props.editIngredientData.price)}
              value={this.props.editIngredientData.price}
              onChange={this.props.updatePrice}
            />
          </FormGroup>
          <FormGroup>
            <Label for="stock">Stock</Label>
            <Input
              id="stock"
              type="text"
              valid={this.validateStock(this.props.editIngredientData.stock)}
              invalid={!this.validateStock(this.props.editIngredientData.stock)}
              value={this.props.editIngredientData.stock}
              onChange={this.props.updateStock}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.updateIngredient.bind(this)}>
            Update
          </Button>{" "}
          <Button color="secondary" onClick={this.props.toggleEditModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default EditIngredientModal;
