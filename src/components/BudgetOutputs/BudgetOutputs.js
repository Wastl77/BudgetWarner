import React from 'react';

import styles from './BudgetOutputs.module.css';

import BudgetOutput from './BudgetOutput/BudgetOutput';

const budgetOutputs = (props) => (
  <div className={styles.BudgetOutputs}>
    <BudgetOutput value={props.budget}>Monatsbudget gesamt:</BudgetOutput>
    <BudgetOutput value={props.budget}>noch verfügbar:</BudgetOutput>
    <BudgetOutput value={props.budget}>pro Tag verfügbar:</BudgetOutput>
    <BudgetOutput value={props.budget}>restliche Woche verfügbar:</BudgetOutput>
  </div>
);

export default budgetOutputs;