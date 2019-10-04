import React, { Component } from "react";

import Button from "../../components/UI/Button/Button";

import styles from "./BudgetInputForm.module.css";

class budgetInputForm extends Component {
  state = {
    januar: "23",
    februar: "",
    märz: "",
    april: "",
    mai: "",
    juni: "",
    juli: "",
    august: "",
    september: "",
    oktober: "",
    november: "",
    dezember: ""
  };

  storeBudget = event => {
    event.preventDefault();
    console.log("clicked");
  };

  inputChangedHandler = (event, elementId) => {
    this.setState({
      [elementId]: event.target.value
    });
  };

  render() {
    let inputArray = [];

    for (let key in this.state) {
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
              value={this.state[inputElement.id]}
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

export default budgetInputForm;
