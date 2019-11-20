import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Aux from "../../hoc/Aux/Aux";
import BudgetOutputs from "../../components/BudgetOutputs/BudgetOutputs";
import Button from "../../components/UI/Button/Button";
import Modal from "../../components/UI/Modal/Modal";
import SpendingDetailsForm from "../SpendingDetailsForm/SpendingDetailsForm";
import Spinner from "../../components/UI/Spinner/Spinner";
import Error from "../../components/UI/Error/Error";

import * as actions from "../../store/actions/index";

class MainContent extends Component {
  onErrorConfirmed = () => {
    this.props.onErrorConfirmation();
  };

  render() {
    let content = (
      <Aux>
        <Modal show={this.props.showModal} modalClosed={this.props.toggleModal}>
          <SpendingDetailsForm />
        </Modal>
        <BudgetOutputs
          monthlyBudget={this.props.monthlyBudget}
          totalAvailable={this.props.totalAvailable}
          usedFromBudgetAfterBudgetsSubstract={
            this.props.usedFromBudgetAfterBudgetsSubstract
          }
          fuelBudget={this.props.fuelBudget}
          usedFromFuelBudget={this.props.totalExpenditureFuel}
          supermarketBudget={this.props.supermarketBudget}
          usedFromSupermarketBudget={this.props.totalExpenditureSupermarket}
        />
        <Button btnType="submit" clicked={this.props.toggleModal}>
          Ausgabe
        </Button>
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
    totalExpenditureFuel: state.main.totalExpenditureFuel,
    totalExpenditureSupermarket: state.main.totalExpenditureSupermarket,
    usedFromBudgetAfterBudgetsSubstract: state.main.totalExpenditureFreeBudget,
    supermarketBudget: state.main.budget.supermarket,
    fuelBudget: state.main.budget.fuel,
    totalAvailable: state.main.totalAvailable,
    showModal: state.main.showModal,
    isAuthenticated: state.auth.idToken !== null,
    loading: state.main.loading,
    error: state.main.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onErrorConfirmation: () => dispatch(actions.confirmError()),
    toggleModal: () => dispatch(actions.toggleModal())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContent);
