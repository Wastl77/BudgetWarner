import React from "react";

import styles from "./BudgetOutputs.module.css";

import BudgetOutput from "./BudgetOutput/BudgetOutput";
import BudgetDiagrammOutput from "./BudgetDiagrammOutput/BudgetDiagrammOutput";

const budgetOutputs = props => {
  const budgetAfterBudgetsSubstract = (
    parseFloat(props.monthlyBudget) -
    (parseFloat(props.fuelBudget) + parseFloat(props.supermarketBudget))
  ).toFixed(2);

  return (
    <div className={styles.BudgetOutputs}>
      <BudgetOutput value={props.monthlyBudget}>
        Monatsbudget gesamt:
      </BudgetOutput>
      <BudgetDiagrammOutput
        budget={parseFloat(props.monthlyBudget).toFixed(2)}
        usedFromBudget={parseFloat(props.totalAvailable).toFixed(2)}
        isTotalAvailable={true}
      >
        noch gesamt verfügbar:
      </BudgetDiagrammOutput>
      <BudgetDiagrammOutput
        budget={budgetAfterBudgetsSubstract}
        usedFromBudget={props.usedFromBudgetAfterBudgetsSubstract}
      >
        verfügbar nach Abzug Budgets:
      </BudgetDiagrammOutput>
      <BudgetDiagrammOutput
        budget={parseFloat(props.fuelBudget).toFixed(2)}
        usedFromBudget={parseFloat(props.usedFromFuelBudget).toFixed(2)}
      >
        Budget Tanken:
      </BudgetDiagrammOutput>
      <BudgetDiagrammOutput
        budget={parseFloat(props.supermarketBudget).toFixed(2)}
        usedFromBudget={parseFloat(props.usedFromSupermarketBudget).toFixed(2)}
      >
        Budget Lebensmittel/Drogerie:
      </BudgetDiagrammOutput>
    </div>
  );
};

export default budgetOutputs;
