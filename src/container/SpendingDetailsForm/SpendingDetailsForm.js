import React, { Component } from "react";
import { connect } from "react-redux";

import Aux from "../../hoc/Aux/Aux";
import Button from "../../components/UI/Button/Button";
import styles from "./index.module.css";
import Radio from "../../components/UI/Radio/Radio";
import Error from "../../components/UI/Error/Error";

import * as helper from "../../helper/helper";
import * as actions from "../../store/actions/index";

class SpendingDetailsForm extends Component {
  state = {
    selectedCategory: "keine",
    selectedPaymentType: "bar",
    selectedDate: new Date().toLocaleDateString("en-CA")
  };

  storeSpendingHandler = () => {
    let expense = parseFloat(this.props.spendingValue).toFixed(2);
    let category = this.state.selectedCategory;
    let paymentType = this.state.selectedPaymentType;
    let dateOfExpense = new Intl.DateTimeFormat("de-DE").format(
      new Date(this.state.selectedDate)
    );
    let monthOfExpense = new Intl.DateTimeFormat("de-DE", {
      month: "long"
    }).format(new Date(this.state.selectedDate));
    monthOfExpense =
      monthOfExpense.charAt(0).toLowerCase() + monthOfExpense.slice(1);
    let userId = this.props.userId;
    let newTotalExpenditure = (
      parseFloat(this.props.totalExpenditure) + parseFloat(expense)
    ).toFixed(2);
    let available = helper.calculateAvailable(
      +this.props.monthlyBudget,
      newTotalExpenditure
    );

    const storageExpenseData = {
      dateOfStorage: new Date(),
      expenseValue: expense,
      category: category,
      paymentType: paymentType,
      dateOfExpense: dateOfExpense,
      userId: userId
    };

    const idToken = this.props.idToken;

    const payload = [
      storageExpenseData,
      newTotalExpenditure,
      available,
      idToken,
      monthOfExpense
    ];

    this.props.onStoreSpending(payload);
  };

  handleCategoryChange = event => {
    this.setState({
      selectedCategory: event.target.value
    });
  };

  handlePaymentTypeChange = event => {
    this.setState({
      selectedPaymentType: event.target.value
    });
  };

  handleDateChange = event => {
    this.setState({
      selectedDate: event.target.value
    });
  };

  onErrorConfirmed = () => {
    this.props.onErrorConfirmation();
  };

  render() {
    let content = (
      <Aux>
        <div>
          <h2 className={styles.header}>Kategorie</h2>

          <Radio
            label="Keine"
            value="keine"
            name="category"
            currentlySelected={this.state.selectedCategory}
            onChange={this.handleCategoryChange}
          />

          <Radio
            label="Supermarkt"
            value="supermarkt"
            name="category"
            currentlySelected={this.state.selectedCategory}
            onChange={this.handleCategoryChange}
          />

          <Radio
            label="Drogerie"
            value="drogerie"
            name="category"
            currentlySelected={this.state.selectedCategory}
            onChange={this.handleCategoryChange}
          />

          <Radio
            label="Tanken"
            value="tanken"
            name="category"
            currentlySelected={this.state.selectedCategory}
            onChange={this.handleCategoryChange}
          />
        </div>

        <div>
          <h2 className={styles.header}>Zahlungsart</h2>

          <Radio
            label="Bar"
            value="bar"
            name="paymentType"
            currentlySelected={this.state.selectedPaymentType}
            onChange={this.handlePaymentTypeChange}
          />
          <Radio
            label="EC-Karte"
            value="ec-karte"
            name="paymentType"
            currentlySelected={this.state.selectedPaymentType}
            onChange={this.handlePaymentTypeChange}
          />
        </div>

        <div>
          <h2 className={styles.header}>Datum der Ausgabe</h2>

          <input
            type="date"
            value={this.state.selectedDate}
            onChange={this.handleDateChange}
            className={styles.input}
          />
        </div>

        <Button btnType="Cancel" clicked={this.props.toggleModal}>
          Abbrechen
        </Button>

        <Button btnType="Continue" clicked={this.storeSpendingHandler}>
          Übernehmen
        </Button>
      </Aux>
    );

    if (this.props.error) {
      content = (
        <Error
          errorMessage={this.props.error}
          errorConfirmedHandler={this.onErrorConfirmed}
        />
      );
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
    idToken: state.auth.idToken,
    userId: state.auth.userId,
    error: state.main.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onStoreSpending: payload => dispatch(actions.onStoreSpending(payload)),
    onErrorConfirmation: () => dispatch(actions.confirmError()),
    toggleModal: () => dispatch(actions.toggleModal())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SpendingDetailsForm);
