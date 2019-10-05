import React, { Component } from "react";
import { connect } from "react-redux";

import Button from "../../components/UI/Button/Button";

import styles from "./BudgetInputForm.module.css";
import * as actionTypes from "../../store/actions";

class budgetInputForm extends Component {
  // state = {
  //   januar: "",
  //   februar: "",
  //   märz: "",
  //   april: "",
  //   mai: "",
  //   juni: "",
  //   juli: "",
  //   august: "",
  //   september: "",
  //   oktober: "",
  //   november: "",
  //   dezember: ""
  // };

  storeBudget = event => {
    event.preventDefault();
    console.log("aufgerufen");
  };

  inputChangedHandler = (event, elementId) => {
    const { value } = event.target;
    this.props.onBudgetInputChanged({ value: value, elementId: elementId });
  };

  render() {
    let inputArray = [];

    // object.keys lieber verwenden
    let key = "";
    for (key in this.props.budget) {
      inputArray.push({
        id: key
      });
    }

    let form = (
      <form onSubmit={this.storeBudget}>
        {inputArray.map(inputElement => (
          <div key={inputElement.id + "_div"} className={styles.BudgetInput}>
            <label key={inputElement.id + "_label"}>{inputElement.id}</label>
            <input
              key={inputElement.id}
              type="number"
              value={this.props.budget[inputElement.id]}
              onChange={event =>
                this.inputChangedHandler(event, inputElement.id)
              }
            />
            <p
              key={inputElement.id + "_euroLabel"}
              className={styles.BudgetInputEuroLabel}
            >
              €
            </p>
          </div>
        ))}
        <Button btnType="Continue">Übernehmen</Button>
      </form>
    );

    return <div>{form}</div>;
  }
}

const mapStateToProps = state => {
  return {
    budget: state.budget
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onBudgetInputChanged: payload =>
      dispatch({ type: actionTypes.ON_BUDGET_INPUT_CHANGED, payload: payload })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(budgetInputForm);
