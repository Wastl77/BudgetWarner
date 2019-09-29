import React from 'react';

import styles from './SpendingInput.module.css';
import Button from '../UI/Button/Button';

const spendingInput = (props) => (
  <div>
    <div className={styles.SpendingInput}>
      <input type="number" onChange={props.inputValue}></input>
      <label>€</label>
    </div>
    
    <Button
      btnType="submit"
      clicked={props.applySpending}>Übernehmen</Button>
  </div>
);

export default spendingInput;