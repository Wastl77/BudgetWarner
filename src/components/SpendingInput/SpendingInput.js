import React from "react";

import styles from "./SpendingInput.module.css";

const spendingInput = props => (
  <div className={styles.SpendingInput}>
    <input
      type="number"
      onChange={props.inputChanged}
      value={props.inputValue}
    ></input>
    <label>€</label>
  </div>
);

export default spendingInput;
