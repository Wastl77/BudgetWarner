import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
// import axios from "axios";

import Aux from "../../hoc/Aux/Aux";
import BudgetOutputs from "../../components/BudgetOutputs/BudgetOutputs";
import SpendingInput from "../../components/SpendingInput/SpendingInput";
import Modal from "../../components/UI/Modal/Modal";
import SpendingDetailsForm from "../SpendingDetailsForm/SpendingDetailsForm";
import Spinner from "../../components/UI/Spinner/Spinner";

import * as actions from "../../store/actions/index";
// import * as helper from "../../helper/helper";

class MainContent extends Component {
  state = {
    spendingInputValue: 0
  };

  componentDidMount() {
    if (this.props.isAuthenticated) {
      this.props.onSetInitialState();
    }
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
    if (this.props.error) {
      content = (
        <p>
          Es ist ein Fehler aufgetreten! Bei fehlender Internetverbindung später
          erneut versuchen!
        </p>
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
    showModal: state.main.showModal,
    isAuthenticated: state.auth.idToken !== null,
    loading: state.main.loading,
    error: state.main.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSetInitialState: () => dispatch(actions.onSetInitialState()),
    toggleModal: () => dispatch(actions.toggleModal())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainContent);
