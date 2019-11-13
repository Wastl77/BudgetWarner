import React from "react";

import styles from "../BudgetOutput/BudgetOutput.module.css";

const budgetDiagrammOutput = props => {
  const width = ((props.usedFromBudget * 100) / props.budget).toFixed(2);
  const budgetWidth = width.toString() + "%";

  return (
    <div className={styles.BudgetOutput}>
      <p>{props.children}</p>
      <p>
        {props.usedFromBudget} € / {props.budget} €
      </p>
      <div className={styles.BudgetBox}>
        <div className={styles.BudgetUsed} style={{ width: budgetWidth }}></div>
      </div>
    </div>
  );
};

export default budgetDiagrammOutput;
