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
    selectedPaymentType: "bar"
  };

  componentDidMount() {
    this.setState({
      loading: true
    });

    axios.get('/expenditure/-LoUWQkmjyAhwPsPHU6l/totalExpenditure.json')
      .then(result => {
        const totalExpenditure = +(result.data.totalExpenditure);
        const monthlyBudget = +(354).toFixed(2);
        const totalAvailable = helper.calculateTotalAvailable(monthlyBudget, totalExpenditure);
        const dailyAvailable = helper.calculateDailyAvailable(totalAvailable);

        this.setState({
          monthlyBudget: monthlyBudget,
          totalExpenditure: totalExpenditure.toFixed(2),
          totalAvailable: totalAvailable.toFixed(2),
          dailyAvailable: dailyAvailable.toFixed(2),
          spendingInputValue: 0,
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
    let newTotalAvailable = helper.calculateTotalAvailable(this.state.totalAvailable, expense);
    let newTotalExpenditure = parseFloat(this.state.totalExpenditure)+parseFloat(expense);
    let newDailyAvailable = helper.calculateDailyAvailable(newTotalAvailable);

    const storageExpenseData = {
      singleExpense: {
        date: new Date(),
        expenseValue: expense,
        category: category,
        paymentType: paymentType
      }
    };
    const storageTotalExpenditureData = {
      totalExpenditure: newTotalExpenditure.toFixed(2)
    };

    axios.post('/singleExpenses.json', storageExpenseData)
    .then(response => console.log(response))
    .catch(error => {
      console.log(error);
      this.setState({
        loading: false
      })});
    axios.put('/expenditure/-LoUWQkmjyAhwPsPHU6l/totalExpenditure.json', storageTotalExpenditureData)
    .then(response => {
      console.log(response);
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
      totalAvailable: newTotalAvailable.toFixed(2),
      totalExpenditure: newTotalExpenditure.toFixed(2),
      dailyAvailable: newDailyAvailable.toFixed(2),
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
            cancelSpending={this.cancelSpendingHandler}
            continueSpending={this.storeSpendingHandler} />
        </Modal>
        {mainContent}
      </Aux>
    )
  }
}

export default MainContent;