import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Aux from "../../hoc/Aux/Aux";
import BudgetOutputs from "../../components/BudgetOutputs/BudgetOutputs";
import SpendingInput from "../../components/SpendingInput/SpendingInput";
import Modal from "../../components/UI/Modal/Modal";
import SpendingDetailsForm from "../SpendingDetailsForm/SpendingDetailsForm";
import Spinner from "../../components/UI/Spinner/Spinner";
import Error from "../../components/UI/Error/Error";

import * as actions from "../../store/actions/index";

class MainContent extends Component {
  state = {
    spendingInputValue: 0
  };

  spendingInputChangedHandler = event => {
    const { value } = event.target;
    this.props.onSpendingInputChanged({ value: value });
  };

  onErrorConfirmed = () => {
    this.props.onErrorConfirmation();
  };

  render() {
    const isInvalid =
      parseFloat(this.props.spendingInputValue) <= 0 ||
      this.props.spendingInputValue === "";

    let content = (
      <Aux>
        <Modal show={this.props.showModal} modalClosed={this.props.toggleModal}>
          <SpendingDetailsForm spendingValue={this.props.spendingInputValue} />
        </Modal>
        <BudgetOutputs
          monthlyBudget={this.props.monthlyBudget}
          totalAvailable={this.props.totalAvailable}
          dailyAvailable={this.props.dailyAvailable}
        />
        <SpendingInput
          applySpending={this.props.toggleModal}
          inputChanged={this.spendingInputChangedHandler}
          inputValue={this.props.spendingInputValue}
          isInvalid={isInvalid}
        />
      </Aux>
    );
    if (this.props.loading) {
      content = <Spinner />;
    }
    if (this.props.error) {
      content = (
        <Error
          errorMessage={this.props.error}
          errorConfirmHandler={this.onErrorConfirmed}
        />
      );
    }
    if (!this.props.isAuthenticated) {
      content = <Redirect to="auth" />;
    }

    return content;
  }
}

const mapStateToProps = state => {
  return {
    monthlyBudget: state.main.monthlyBudget,
    totalExpenditure: state.main.totalExpenditure,
    totalAvailable: state.main.totalAvailable,
    dailyAvailable: state.main.dailyAvailable,
    spendingInputValue: state.main.spendingInputValue,
    showModal: state.main.showModal,
    isAuthenticated: state.auth.idToken !== null,
    loading: state.main.loading,
    error: state.main.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSpendingInputChanged: payload =>
      dispatch(actions.onSpendingInputChanged(payload)),
    onErrorConfirmation: () => dispatch(actions.confirmError()),
    toggleModal: () => dispatch(actions.toggleModal())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainContent);
