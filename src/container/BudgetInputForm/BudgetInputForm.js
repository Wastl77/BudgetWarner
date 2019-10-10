import React, { Component } from "react";
import { connect } from "react-redux";

import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";

import styles from "./BudgetInputForm.module.css";
import * as actionTypes from "../../store/actions";
import axios from "axios";
import months from "../../assets/data/months";

class BudgetInputForm extends Component {
  storeBudgetHandler = event => {
    event.preventDefault();
    this.props.toggleLoading();

    let budget = { ...this.props.budget };

    axios
      .put("/budget/-Lq_SMZGI0D_kJEoFtPN.json", budget)
      .then(() => {
        this.props.toggleLoading();
      })
      .catch(error => {
        console.log(error);
        this.props.toggleLoading();
      });
  };

  inputChangedHandler = (event, elementId) => {
    const { value } = event.target;
    this.props.onBudgetInputChanged({ value: value, elementId: elementId });
  };

  render() {
    // let inputArray = [];

    // // object.keys lieber verwenden
    // let key = "";
    // for (key in this.props.budget) {
    //   inputArray.push({
    //     id: key
    //   });
    // }

    let form = (
      <form onSubmit={this.storeBudgetHandler}>
        {months.map(inputElement => (
          <div key={inputElement + "_div"} className={styles.BudgetInput}>
            <label key={inputElement + "_label"}>{inputElement}</label>
            <input
              key={inputElement}
              type="number"
              value={this.props.budget[inputElement]}
              onChange={event => this.inputChangedHandler(event, inputElement)}
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

    if (this.props.loading) {
      form = <Spinner />;
    }
    return form;
  }
}

const mapStateToProps = state => {
  return {
    budget: state.main.budget,
    loading: state.main.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onBudgetInputChanged: payload =>
      dispatch({ type: actionTypes.ON_BUDGET_INPUT_CHANGED, payload: payload }),
    toggleLoading: () => dispatch({ type: actionTypes.TOGGLE_LOADING })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BudgetInputForm);
