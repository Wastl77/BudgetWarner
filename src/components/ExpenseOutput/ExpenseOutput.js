import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";

import SingleExpenseOutput from "./SingleExpenseOutput";
import Button from "../UI/Button/Button";

import months from "../../assets/data/months";
import * as helper from "../../helper/helper";
import styles from "./ExpenseOutput.module.css";
import * as actions from "../../store/actions/index";

const ExpenseOutput = props => {
  const [selectValue, setSelectValue] = useState(helper.getActualMonthString());
  const [expenses, setExpenses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

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

  const onDeleteSpending = id => {
    axios
      .delete(`/singleExpenses/${id}.json?auth=${props.idToken}`)
      .then(res => {
        props.onSetInitialState(props.idToken);
        props.history.push("/");
      });
  };

  const expensesPerPage = 20;
  const indexOfLastExpense = currentPage * expensesPerPage;
  console.log(indexOfLastExpense);
  const indexOfFirstExpense = indexOfLastExpense - expensesPerPage;
  console.log(indexOfFirstExpense);
  const currentExpenses = expenses.slice(
    indexOfFirstExpense,
    indexOfLastExpense
  );
  console.log(currentExpenses);
  const lastPage = Math.ceil(expenses.length / expensesPerPage);

  const pageDown = () => {
    let newPage = currentPage - 1;
    setCurrentPage(newPage);
  };

  const pageUp = () => {
    let newPage = currentPage + 1;
    setCurrentPage(newPage);
  };

  let output;

  if (expenses.length) {
    output = currentExpenses.map(exp => {
      return (
        <SingleExpenseOutput
          date={exp.dateOfExpense}
          value={exp.expenseValue}
          category={exp.category}
          paymentType={exp.paymentType}
          note={exp.note}
          id={exp.id}
          key={exp.id}
          clicked={() => onDeleteSpending(exp.id)}
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
      <Button clicked={pageDown} isDisabled={currentPage <= 1}>
        &#x2190;
      </Button>
      <Button clicked={pageUp} isDisabled={currentPage >= lastPage}>
        &#x2192;
      </Button>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    idToken: state.auth.idToken
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSetInitialState: payload => dispatch(actions.onSetInitialState(payload))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExpenseOutput);
