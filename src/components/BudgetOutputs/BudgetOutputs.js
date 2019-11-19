import React from "react";

import styles from "./BudgetOutputs.module.css";

import BudgetOutput from "./BudgetOutput/BudgetOutput";
import BudgetDiagrammOutput from "./BudgetDiagrammOutput/BudgetDiagrammOutput";

const budgetOutputs = props => {
  const budgetAfterBudgetSubstract = (
    parseFloat(props.monthlyBudget) -
    (parseFloat(props.fuelBudget) + parseFloat(props.supermarketBudget))
  ).toFixed(2);

  return (
    <div className={styles.BudgetOutputs}>
      <BudgetOutput value={props.monthlyBudget}>
        Monatsbudget gesamt:
      </BudgetOutput>
      <BudgetDiagrammOutput
        budget={props.monthlyBudget}
        usedFromBudget={props.totalAvailable}
        isTotalAvailable={true}
      >
        noch gesamt verfügbar:
      </BudgetDiagrammOutput>
      <BudgetDiagrammOutput
        budget={budgetAfterBudgetSubstract}
        usedFromBudget={50}
        isTotalAvailable={true}
      >
        verfügbar nach Abzug Budgets:
      </BudgetDiagrammOutput>
      <BudgetDiagrammOutput
        budget={props.fuelBudget}
        usedFromBudget={props.usedFromFuelBudget}
      >
        Budget Tanken:
      </BudgetDiagrammOutput>
      <BudgetDiagrammOutput
        budget={props.supermarketBudget}
        usedFromBudget={props.usedFromSupermarketBudget}
      >
        Budget Lebensmittel/Drogerie:
      </BudgetDiagrammOutput>
    </div>
  );
};

export default budgetOutputs;
