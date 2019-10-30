import React, { Fragment, useState } from "react";
import { connect } from "react-redux";

import months from "../../assets/data/months";

const ExpenseOutput = props => {
  const [selectValue, setSelectValue] = useState("januar");

  let output;
  let expenseArray;

  if (props.allExpenses[selectValue] !== "undefined") {
    expenseArray = Object.keys(props.allExpenses[selectValue]).map(exp => {
      props.allExpenses[selectValue][exp].id = exp;
      return props.allExpenses[selectValue][exp];
    });
    output = expenseArray.map(expense => {
      return (
        <SingleExpenseOutput
          date={expense.dateOfExpense}
          value={expense.expenseValue}
          id={expense.id}
          key={expense.id}
        />
      );
    });
  } else {
    output = <p>Keine Ausgaben vorhanden!</p>;
  }

  return (
    <Fragment>
      {output}
      <label htmlFor="monthSelect">Monat wählen: </label>
      <select
        id="monthSelect"
        onChange={event => setSelectValue(event.target.value)}
      >
        {months.map(month => (
          <option value={month} key={month}>
            {month}
          </option>
        ))}
      </select>
    </Fragment>
  );
};

const SingleExpenseOutput = props => {
  return (
    <div onClick={() => console.log(props.id)}>
      <p>{props.date}</p>
      <p>{props.value}</p>
      <p>{props.id}</p>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    allExpenses: state.main.allExpenses
  };
};

export default connect(mapStateToProps)(ExpenseOutput);
