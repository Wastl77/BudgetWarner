import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import BudgetOutputs from '../../components/BudgetOutputs/BudgetOutputs';
import SpendingInput from '../../components/SpendingInput/SpendingInput';

class MainContent extends Component {
  state = {
    budget: 0
  };

  render () {
    return(
      <Aux>
        <BudgetOutputs budget={this.state.budget}/>
        <SpendingInput />
      </Aux>
    )
  }
}

export default MainContent;