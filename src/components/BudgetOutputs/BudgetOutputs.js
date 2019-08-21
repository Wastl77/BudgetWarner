import React from 'react';

import styles from './BudgetOutputs.module.css';

import BudgetOutput from './BudgetOutput/BudgetOutput';

const budgetOutputs = (props) => (
  <div className={styles.BudgetOutputs}>
    <BudgetOutput value={props.monthlyBudget}>Monatsbudget gesamt:</BudgetOutput>
    <BudgetOutput value={props.totalAvailable}>noch verfügbar:</BudgetOutput>
    <BudgetOutput value={props.dailyAvailable}>pro Tag verfügbar:</BudgetOutput>
  </div>
);

export default budgetOutputs;