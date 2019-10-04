import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

import Aux from "../../hoc/Aux/Aux";
import BudgetOutputs from "../../components/BudgetOutputs/BudgetOutputs";
import SpendingInput from "../../components/SpendingInput/SpendingInput";
import Modal from "../../components/UI/Modal/Modal";
import SpendingDetailsForm from "../SpendingDetailsForm/SpendingDetailsForm";
import Spinner from "../../components/UI/Spinner/Spinner";

import * as actionTypes from "../../store/actions";

class MainContent extends Component {
  state = {
    spendingInputValue: 0
  };

  componentDidMount() {
    this.props.toggleLoading();

    axios
      .get("/expenditure/-LoUWQkmjyAhwPsPHU6l/totalExpenditure.json")
      .then(result => {
        this.props.setInitialState({
          monthlyBudget: 354,
          totalExpenditure: result.data.totalExpenditure
        });
        this.props.toggleLoading();
      })
      .catch(error => {
        console.log(error);
        this.props.toggleLoading();
      });
  }

  spendingInputValueHandler = event => {
    this.setState({
      spendingInputValue: event.target.value
    });
  };

  render() {
    let content = (
      <Aux>
        <Modal show={this.props.showModal} modalClosed={this.props.toggleModal}>
          <SpendingDetailsForm spendingValue={this.state.spendingInputValue} />
        </Modal>
        <BudgetOutputs
          monthlyBudget={this.props.monthlyBudget}
          totalAvailable={this.props.totalAvailable}
          dailyAvailable={this.props.dailyAvailable}
        />
        <SpendingInput
          applySpending={this.props.toggleModal}
          inputValue={this.spendingInputValueHandler}
        />
      </Aux>
    );
    if (this.props.loading) {
      content = <Spinner />;
    }

    return content;
  }
}

const mapStateToProps = state => {
  return {
    monthlyBudget: state.monthlyBudget,
    totalExpenditure: state.totalExpenditure,
    totalAvailable: state.totalAvailable,
    dailyAvailable: state.dailyAvailable,
    showModal: state.showModal,
    loading: state.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setInitialState: payload =>
      dispatch({ type: actionTypes.SET_INITIAL_STATE, payload: payload }),
    toggleModal: () => dispatch({ type: actionTypes.TOGGLE_MODAL }),
    toggleLoading: () => dispatch({ type: actionTypes.TOGGLE_LOADING })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainContent);
