import React from "react";

import styles from "./BudgetOutputs.module.css";

import BudgetOutput from "./BudgetOutput/BudgetOutput";
import BudgetDiagrammOutput from "./BudgetDiagrammOutput/BudgetDiagrammOutput";

const budgetOutputs = props => (
  <div className={styles.BudgetOutputs}>
    <BudgetOutput value={props.monthlyBudget}>
      Monatsbudget gesamt:
    </BudgetOutput>
    <BudgetOutput value={props.totalAvailable}>
      noch gesamt verfügbar:
    </BudgetOutput>
    <BudgetOutput value={props.dailyAvailable}>pro Tag verfügbar:</BudgetOutput>
    <BudgetDiagrammOutput
      budget={props.fuelBudget}
      usedFromBudget={props.usedFromFuelBudget}
    >
      Tanken:
    </BudgetDiagrammOutput>
    <BudgetDiagrammOutput
      budget={props.supermarketBudget}
      usedFromBudget={props.usedFromSupermarketBudget}
    >
      Lebensmittel/Drogerie:
    </BudgetDiagrammOutput>
  </div>
);

export default budgetOutputs;
