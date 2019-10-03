import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

import Aux from "../../hoc/Aux/Aux";
import BudgetOutputs from "../../components/BudgetOutputs/BudgetOutputs";
import SpendingInput from "../../components/SpendingInput/SpendingInput";
import Spinner from "../../components/UI/Spinner/Spinner";
import Modal from "../../components/UI/Modal/Modal";
import SpendingDetailsForm from "../../components/SpendingDetailsForm/SpendingDetailsForm";

import * as helper from "../../helper/helper";

class MainContent extends Component {
  state = {
    spendingInputValue: 0,
    loading: false,
    showModal: false,
    selectedCategory: "keine",
    selectedPaymentType: "bar",
    selectedDate: ""
  };

  componentDidMount() {
    this.setState({
      loading: true
    });

    let actualDate = new Date().toLocaleDateString("en-CA");

    axios
      .get("/expenditure/-LoUWQkmjyAhwPsPHU6l/totalExpenditure.json")
      .then(result => {
        this.setState({
          selectedDate: actualDate,
          loading: false
        });
        this.props.setInitialState({
          monthlyBudget: 354,
          totalExpenditure: result.data.totalExpenditure
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({
          loading: false
        });
      });
  }

  storeSpendingHandler = () => {
    // if value = 0 Check adden und Modal mit Fehlermeldung zeigen falls 0
    this.setState({
      loading: true,
      showModal: false
    });

    let expense = this.state.spendingInputValue;
    let category = this.state.selectedCategory;
    let paymentType = this.state.selectedPaymentType;
    let dateOfExpense = this.state.selectedDate;
    let newTotalExpenditure = (
      parseFloat(this.props.totalExpenditure) + parseFloat(expense)
    ).toFixed(2);
    let available = helper.calculateAvailable(
      this.props.monthlyBudget,
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

    axios
      .post("/singleExpenses.json", storageExpenseData)
      // .then(response => console.log(response))
      .catch(error => {
        console.log(error);
        this.setState({
          loading: false
        });
      });
    axios
      .put(
        "/expenditure/-LoUWQkmjyAhwPsPHU6l/totalExpenditure.json",
        storageTotalExpenditureData
      )
      .then(response => {
        // console.log(response);
        this.setState({
          loading: false
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({
          loading: false
        });
      });

    this.setState({
      spendingInputValue: 0,
      selectedCategory: "keine"
    });
    this.props.onStoreSpending({
      totalAvailable: available.totalAvailable,
      totalExpenditure: newTotalExpenditure,
      dailyAvailable: available.dailyAvailable
    });
  };

  acceptSpendingHandler = () => {
    this.setState({
      showModal: true
    });
  };

  cancelSpendingHandler = () => {
    this.setState({
      showModal: false
    });
  };

  spendingInputValueHandler = event => {
    this.setState({
      spendingInputValue: event.target.value
    });
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
    let mainContent = (
      <div>
        <BudgetOutputs
          monthlyBudget={this.props.monthlyBudget}
          totalAvailable={this.props.totalAvailable}
          dailyAvailable={this.props.dailyAvailable}
        />
        <SpendingInput
          applySpending={this.acceptSpendingHandler}
          inputValue={this.spendingInputValueHandler}
        />
      </div>
    );
    if (this.state.loading) {
      mainContent = <Spinner />;
    }

    return (
      <Aux>
        <Modal
          show={this.state.showModal}
          modalClosed={this.cancelSpendingHandler}
        >
          <SpendingDetailsForm
            // state in form-komponente und storage über eigene funktion oder über redux
            selectedCategory={this.state.selectedCategory}
            handleCategoryChange={this.handleCategoryChange}
            selectedPaymentType={this.state.selectedPaymentType}
            handlePaymentTypeChange={this.handlePaymentTypeChange}
            selectedDate={this.state.selectedDate}
            handleDateChange={this.handleDateChange}
            cancelSpending={this.cancelSpendingHandler}
            continueSpending={this.storeSpendingHandler}
          />
        </Modal>
        {/* Main Content als eigene Komponente mit prop loading */}
        {mainContent}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    monthlyBudget: state.monthlyBudget,
    totalExpenditure: state.totalExpenditure,
    totalAvailable: state.totalAvailable,
    dailyAvailable: state.dailyAvailable
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setInitialState: payload =>
      dispatch({ type: "SET_INITIAL_STATE", payload: payload }),
    onStoreSpending: payload =>
      dispatch({ type: "ON_STORE_SPENDING", payload: payload })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainContent);
