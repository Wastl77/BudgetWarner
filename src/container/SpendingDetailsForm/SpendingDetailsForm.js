import React, { Component } from "react";
import { connect } from "react-redux";

import Aux from "../../hoc/Aux/Aux";
import Button from "../../components/UI/Button/Button";
import styles from "./index.module.css";
import Radio from "../../components/UI/Radio/Radio";

import * as helper from "../../helper/helper";
import * as actions from "../../store/actions/index";

class SpendingDetailsForm extends Component {
  state = {
    selectedCategory: "keine",
    selectedPaymentType: "bar",
    selectedDate: new Date().toLocaleDateString("en-CA")
  };

  storeSpendingHandler = () => {
    // if value = 0 Check adden und Modal mit Fehlermeldung zeigen falls 0

    let expense = this.props.spendingValue;
    let category = this.state.selectedCategory;
    let paymentType = this.state.selectedPaymentType;
    let dateOfExpense = this.state.selectedDate;
    let newTotalExpenditure = (
      parseFloat(this.props.totalExpenditure) + parseFloat(expense)
    ).toFixed(2);
    let available = helper.calculateAvailable(
      +this.props.monthlyBudget,
      newTotalExpenditure
    );

    const storageExpenseData = {
      singleExpense: {
        dateOfStorage: new Date(),
        expenseValue: expense,
        category: category,
        paymentType: paymentType,
        dateOfExpense: dateOfExpense
      }
    };
    const storageTotalExpenditureData = {
      totalExpenditure: newTotalExpenditure
    };

    const idToken = this.props.idToken;

    const payload = [
      storageExpenseData,
      storageTotalExpenditureData,
      available,
      idToken
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
        <p>
          Es ist ein Fehler aufgetreten! Bei fehlender Internetverbindung später
          erneut versuchen!
        </p>
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
    idToken: state.auth.idToken
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onStoreSpending: payload => dispatch(actions.onStoreSpending(payload)),
    toggleModal: () => dispatch(actions.toggleModal())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SpendingDetailsForm);
