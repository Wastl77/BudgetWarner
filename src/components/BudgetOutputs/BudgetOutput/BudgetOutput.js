import React from 'react';

import styles from './BudgetOutput.module.css';

const budgetOutput = (props) => (
  <div className={styles.BudgetOutput}>
    <p>{props.children}</p>
    <p>{props.value} €</p>
  </div>
);

export default budgetOutput;