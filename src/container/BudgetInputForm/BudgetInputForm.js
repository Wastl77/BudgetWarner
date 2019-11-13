import React, { Component } from "react";
import { connect } from "react-redux";

import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";

import styles from "./BudgetInputForm.module.css";
import * as actions from "../../store/actions/index";
import months from "../../assets/data/months";

class BudgetInputForm extends Component {
  onStoreBudgetHandler = event => {
    event.preventDefault();
    const budget = { ...this.props.budget };
    const idToken = this.props.idToken;
    const payload = [budget, idToken];
    this.props.onStoreBudget(payload);
  };

  inputChangedHandler = (event, elementId) => {
    const { value } = event.target;
    this.props.onBudgetInputChanged({ value: value, elementId: elementId });
  };

  render() {
    let form = (
      <form onSubmit={this.onStoreBudgetHandler}>
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
        <div className={styles.BudgetInput}>
          <label>Tanken</label>
          <input
            type="number"
            value={this.props.budget["fuel"]}
            onChange={event => this.inputChangedHandler(event, "fuel")}
          />
          <p className={styles.BudgetInputEuroLabel}>€</p>
          <label style={{ "margin-top": "10px" }}>Supermarkt/Drogerie</label>
          <input
            type="number"
            value={this.props.budget["supermarket"]}
            onChange={event => this.inputChangedHandler(event, "supermarket")}
          />
          <p className={styles.BudgetInputEuroLabel}>€</p>
        </div>
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
    loading: state.main.loading,
    idToken: state.auth.idToken
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onBudgetInputChanged: payload =>
      dispatch(actions.onBudgetInputChanged(payload)),
    onStoreBudget: payload => dispatch(actions.onStoreBudget(payload))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BudgetInputForm);
