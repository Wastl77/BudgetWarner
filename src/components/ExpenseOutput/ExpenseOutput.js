import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";

import months from "../../assets/data/months";
import * as helper from "../../helper/helper";

const ExpenseOutput = props => {
  const [selectValue, setSelectValue] = useState(helper.getActualMonthString());
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = () => {
      let allExpenses = [];
      axios
        .get(
          `/singleExpenses.json?auth=${props.idToken}&orderBy="month"&equalTo="${selectValue}"`
        )
        .then(res => {
          let key;
          for (key in res.data) {
            allExpenses.push({
              ...res.data[key],
              id: key
            });
          }
        })
        .then(result => {
          setExpenses(allExpenses);
        });
    };

    fetchExpenses();
  }, [selectValue, props.idToken]);

  const onMonthSelectChange = event => {
    setSelectValue(event.target.value);
  };

  let output;

  if (expenses !== []) {
    output = expenses.map(exp => {
      return (
        <SingleExpenseOutput
          date={exp.dateOfExpense}
          value={exp.expenseValue}
          id={exp.id}
          key={exp.id}
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
        defaultValue={selectValue}
        onChange={onMonthSelectChange}
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
    idToken: state.auth.idToken
  };
};

export default connect(mapStateToProps)(ExpenseOutput);
