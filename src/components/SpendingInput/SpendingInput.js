import React from 'react';

import styles from './SpendingInput.module.css';

const spendingInput = () => (
  <div>
    <div className={styles.SpendingInput}>
      <input type="number" name="spending"></input>
      <label for="spending">€</label>
    </div>
    <button className={styles.Button}>Übernehmen</button>
  </div>
);

export default spendingInput;