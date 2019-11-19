import React from "react";

import styles from "../BudgetOutput/BudgetOutput.module.css";

const budgetDiagrammOutput = props => {
  let width = ((props.usedFromBudget * 100) / props.budget).toFixed(2);

  if (props.isTotalAvailable) {
    width = (100 - (props.usedFromBudget / props.budget) * 100).toFixed(2);
  }

  if (width >= 100) {
    width = 100;
  }

  const budgetWidth = width.toString() + "%";

  return (
    <div className={styles.BudgetOutput}>
      <p>{props.children}</p>
      <p>
        <span
          style={{
            color: props.usedFromBudget > props.budget ? "red" : "black",
            fontWeight: props.usedFromBudget > props.budget ? "bold" : ""
          }}
        >
          {props.usedFromBudget}
        </span>{" "}
        € / {props.budget} €
      </p>
      <div className={styles.BudgetBox}>
        <div className={styles.BudgetUsed} style={{ width: budgetWidth }}></div>
      </div>
    </div>
  );
};

export default budgetDiagrammOutput;
