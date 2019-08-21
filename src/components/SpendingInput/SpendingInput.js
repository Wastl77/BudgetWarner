import React from 'react';

import styles from './SpendingInput.module.css';

const spendingInput = (props) => (
  <div>
    <div className={styles.SpendingInput}>
      <input type="number" onChange={props.inputValue}></input>
      <label>€</label>
    </div>
    <button 
      className={styles.Button}
      onClick={props.applySpending}>Übernehmen</button>
  </div>
);

export default spendingInput;