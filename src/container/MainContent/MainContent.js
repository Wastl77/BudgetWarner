import React, { Component } from 'react';
import axios from 'axios';

import Aux from '../../hoc/Aux/Aux';
import BudgetOutputs from '../../components/BudgetOutputs/BudgetOutputs';
import SpendingInput from '../../components/SpendingInput/SpendingInput';
import Spinner from '../../components/UI/Spinner';

import * as helper from '../../helper/helper';

class MainContent extends Component {
  state = {
    monthlyBudget: 0,
    totalExpenditure: 0,
    totalAvailable: 0,
    dailyAvailable: 0,
    spendingInputValue: 0,
    loading: false 
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
      loading: true
    })

    let expense = this.state.spendingInputValue;
    let newTotalAvailable = helper.calculateTotalAvailable(this.state.totalAvailable, expense);
    let newTotalExpenditure = parseFloat(this.state.totalExpenditure)+parseFloat(expense);
    let newDailyAvailable = helper.calculateDailyAvailable(newTotalAvailable);

    const storageExpenseData = {
      singleExpense: {
        date: new Date(),
        expenseValue: expense
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
      dailyAvailable: newDailyAvailable.toFixed(2)
    })
  };

  spendingInputValueHandler = (event) => {
    this.setState({
      spendingInputValue: event.target.value
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
        {mainContent}
      </Aux>
    )
  }
}

export default MainContent;