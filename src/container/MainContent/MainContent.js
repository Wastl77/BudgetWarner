import React, { Component } from 'react';

import Aux from '../../hoc/Aux/Aux';
import BudgetOutputs from '../../components/BudgetOutputs/BudgetOutputs';
import SpendingInput from '../../components/SpendingInput/SpendingInput';

import * as helper from '../../helper/helper';

class MainContent extends Component {
  state = helper.getInitialState();

  acceptSpendingHandler = () => {
    let expense = this.state.spendingInputValue;
    let newTotalAvailable = helper.calculateTotalAvailable(this.state.totalAvailable, expense);
    let newTotalExpenditure = parseFloat(this.state.totalExpenditure)+parseFloat(expense);
    let newDailyAvailable = helper.calculateDailyAvailable(newTotalAvailable);
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
    return(
      <Aux>
        <BudgetOutputs
          monthlyBudget={this.state.monthlyBudget}
          totalAvailable={this.state.totalAvailable}
          dailyAvailable={this.state.dailyAvailable}/>
        <SpendingInput
          applySpending={this.acceptSpendingHandler}
          inputValue={this.spendingInputValueHandler}/>
      </Aux>
    )
  }
}

export default MainContent;