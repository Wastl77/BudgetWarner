import React, { Component } from 'react';
import axios from 'axios';

import Aux from '../../hoc/Aux/Aux';
import BudgetOutputs from '../../components/BudgetOutputs/BudgetOutputs';
import SpendingInput from '../../components/SpendingInput/SpendingInput';
import Spinner from '../../components/UI/Spinner/Spinner';
import Modal from '../../components/UI/Modal/Modal';
import SpendingDetailsForm from '../../components/SpendingDetailsForm/SpendingDetailsForm';

import * as helper from '../../helper/helper';

class MainContent extends Component {
  state = {
    monthlyBudget: 0,
    totalExpenditure: 0,
    totalAvailable: 0,
    dailyAvailable: 0,
    spendingInputValue: 0,
    loading: false,
    showModal: false,
    selectedCategory: "keine",
    selectedPaymentType: "bar",
    selectedDate: ''
  };

  componentDidMount() {
    this.setState({
      loading: true
    });

    let actualDate = new Date().toLocaleDateString('en-CA');

    axios.get('/expenditure/-LoUWQkmjyAhwPsPHU6l/totalExpenditure.json')
      .then(result => {
        const totalExpenditure = (+(result.data.totalExpenditure)).toFixed(2);
        const monthlyBudget = +(354).toFixed(2);
        const totalAvailable = (helper.calculateTotalAvailable(monthlyBudget, totalExpenditure)).toFixed(2);
        const dailyAvailable = (helper.calculateDailyAvailable(totalAvailable)).toFixed(2);

        this.setState({
          monthlyBudget: monthlyBudget,
          totalExpenditure: totalExpenditure,
          totalAvailable: totalAvailable,
          dailyAvailable: dailyAvailable,
          spendingInputValue: 0,
          selectedDate: actualDate,
          loading: false
        })
      })
      .catch(error => {
        console.log(error);
        this.setState({
          loading: false
        })
      });
  };

  acceptSpendingHandler = () => {
    this.setState({
      showModal: true
    })
  };

  cancelSpendingHandler = () => {
    this.setState({
      showModal: false
    })
  };

  storeSpendingHandler = () => {
    // if value = 0 Check adden und Modal mit Fehlermeldung zeigen falls 0
    this.setState({
      loading: true,
      showModal:false
    })

    let expense = this.state.spendingInputValue;
    let category = this.state.selectedCategory;
    let paymentType = this.state.selectedPaymentType;
    let dateOfExpense = this.state.selectedDate;
    let newTotalAvailable = (helper.calculateTotalAvailable(this.state.totalAvailable, expense)).toFixed(2);
    let newTotalExpenditure = (parseFloat(this.state.totalExpenditure)+parseFloat(expense)).toFixed(2);
    let newDailyAvailable = (helper.calculateDailyAvailable(newTotalAvailable)).toFixed(2);

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

    axios.post('/singleExpenses.json', storageExpenseData)
    // .then(response => console.log(response))
    .catch(error => {
      console.log(error);
      this.setState({
        loading: false
      })});
    axios.put('/expenditure/-LoUWQkmjyAhwPsPHU6l/totalExpenditure.json', storageTotalExpenditureData)
    .then(response => {
      // console.log(response);
      this.setState({
        loading: false
      })
    })
    .catch(error => {
      console.log(error);
      this.setState({
        loading: false
      })
    });
    
    this.setState({
      totalAvailable: newTotalAvailable,
      totalExpenditure: newTotalExpenditure,
      dailyAvailable: newDailyAvailable,
      spendingInputValue: 0,
      selectedCategory: "keine"
    })
  };

  spendingInputValueHandler = (event) => {
    this.setState({
      spendingInputValue: event.target.value
    })
  };

  handleCategoryChange = (event) => {
    this.setState({
      selectedCategory: event.target.value
    })
  };

  handlePaymentTypeChange = (event) => {
    this.setState({
      selectedPaymentType: event.target.value
    })
  };

  handleDateChange = (event) => {
    this.setState({
      selectedDate: event.target.value
    })
  }; 

  render () {
    let mainContent = (
      <div>
        <BudgetOutputs
            monthlyBudget={this.state.monthlyBudget}
            totalAvailable={this.state.totalAvailable}
            dailyAvailable={this.state.dailyAvailable}/>
        <SpendingInput
          applySpending={this.acceptSpendingHandler}
          inputValue={this.spendingInputValueHandler}/>
      </div>
    )
    if (this.state.loading) {
      mainContent = (
          <Spinner />
      )
    };

    return(
      <Aux>
        <Modal show={this.state.showModal} modalClosed={this.cancelSpendingHandler}>
          <SpendingDetailsForm
            selectedCategory={this.state.selectedCategory}
            handleCategoryChange={this.handleCategoryChange}
            selectedPaymentType={this.state.selectedPaymentType}
            handlePaymentTypeChange={this.handlePaymentTypeChange}
            selectedDate={this.state.selectedDate}
            handleDateChange={this.handleDateChange}
            cancelSpending={this.cancelSpendingHandler}
            continueSpending={this.storeSpendingHandler} />
        </Modal>
        {mainContent}
      </Aux>
    )
  }
}

export default MainContent;