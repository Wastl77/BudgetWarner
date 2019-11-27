import React from 'react';

import styles from './SpendingInput.module.css';

const spendingInput = props => {
  const isInvalid = isNaN(parseFloat(props.inputValue));

  return (
    <div className={styles.SpendingInput}>
      <input
        type='number'
        onChange={props.inputChanged}
        value={props.inputValue}
        style={{
          backgroundColor: isInvalid === true ? 'rgba(232, 9, 24, 0.6)' : ''
        }}></input>
      <label>€</label>
    </div>
  );
};

export default spendingInput;
