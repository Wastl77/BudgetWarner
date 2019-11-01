import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";

import Button from "../UI/Button/Button";

import months from "../../assets/data/months";
import * as helper from "../../helper/helper";
import styles from "./ExpenseOutput.module.css";

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
          helper.sortArray(allExpenses);
          allExpenses.reverse();
          setExpenses(allExpenses);
        });
    };

    fetchExpenses();
  }, [selectValue, props.idToken]);

  const onMonthSelectChange = event => {
    setSelectValue(event.target.value);
  };

  let output;

  if (expenses.length) {
    output = expenses.map(exp => {
      return (
        <SingleExpenseOutput
          date={exp.dateOfExpense}
          value={exp.expenseValue}
          category={exp.category}
          paymentType={exp.paymentType}
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
      <div className={styles.SelectField}>
        <label htmlFor="monthSelect" className={styles.Label}>
          Monat wählen:{" "}
        </label>
        <select
          id="monthSelect"
          defaultValue={selectValue}
          onChange={onMonthSelectChange}
          className={styles.Select}
        >
          {months.map(month => (
            <option value={month} key={month}>
              {month}
            </option>
          ))}
        </select>
      </div>
      {output}
    </Fragment>
  );
};

const SingleExpenseOutput = props => {
  const [detailsVisible, setDetailsVisible] = useState(false);

  const onDeleteHandler = id => {
    console.log(id);
  };

  return (
    <div
      onClick={() => setDetailsVisible(!detailsVisible)}
      className={styles.ExpenseOutput}
    >
      <p>{props.date}</p>
      <p>{props.value} €</p>
      {detailsVisible ? (
        <Fragment>
          <p>{props.category}</p>
          <p>{props.paymentType}</p>
          <Button btnType={"Cancel"} clicked={() => onDeleteHandler(props.id)}>
            Löschen
          </Button>
        </Fragment>
      ) : null}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    idToken: state.auth.idToken
  };
};

export default connect(mapStateToProps)(ExpenseOutput);
