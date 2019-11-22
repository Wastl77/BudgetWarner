import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Aux from "../../hoc/Aux/Aux";
import BudgetOutputs from "../../components/BudgetOutputs/BudgetOutputs";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import Error from "../../components/UI/Error/Error";

import * as actions from "../../store/actions/index";

class MainContent extends Component {
  onErrorConfirmed = () => {
    this.props.onErrorConfirmation();
  };

  onButtonClick = () => {
    this.props.history.push("/addExpense");
  };

  render() {
    let content = (
      <Aux>
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
        <Button btnType="submit" clicked={this.onButtonClick}>
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
    isAuthenticated: state.auth.idToken !== null,
    loading: state.main.loading,
    error: state.main.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onErrorConfirmation: () => dispatch(actions.confirmError())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContent);
