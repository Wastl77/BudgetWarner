import React, { Component } from "react";

import Aux from "../../hoc/Aux/Aux";
import Button from "../UI/Button/Button";
import styles from "./index.module.css";
import Radio from "../UI/Radio/Radio";

class spendingDetailsForm extends Component {
  render() {
    return (
      <Aux>
        <div>
          <h2 className={styles.header}>Kategorie</h2>

          <Radio
            label="Keine"
            value="keine"
            name="category"
            currentlySelected={this.props.selectedCategory}
            onChange={this.props.handleCategoryChange}
          />

          <Radio
            label="Supermarkt"
            value="supermarkt"
            name="category"
            currentlySelected={this.props.selectedCategory}
            onChange={this.props.handleCategoryChange}
          />

          <Radio
            label="Drogerie"
            value="drogerie"
            name="category"
            currentlySelected={this.props.selectedCategory}
            onChange={this.props.handleCategoryChange}
          />

          <Radio
            label="Tanken"
            value="tanken"
            name="category"
            currentlySelected={this.props.selectedCategory}
            onChange={this.props.handleCategoryChange}
          />
        </div>

        <div>
          <h2 className={styles.header}>Zahlungsart</h2>

          <Radio
            label="Bar"
            value="bar"
            name="paymentType"
            currentlySelected={this.props.selectedPaymentType}
            onChange={this.props.handlePaymentTypeChange}
          />
          <Radio
            label="EC-Karte"
            value="ec-karte"
            name="paymentType"
            currentlySelected={this.props.selectedPaymentType}
            onChange={this.props.handlePaymentTypeChange}
          />
        </div>

        <div>
          <h2 className={styles.header}>Datum der Ausgabe</h2>

          <input
            type="date"
            value={this.props.selectedDate}
            onChange={this.props.handleDateChange}
            className={styles.input}
          />
        </div>

        <Button btnType="Cancel" clicked={this.props.cancelSpending}>
          Abbrechen
        </Button>

        <Button btnType="Continue" clicked={this.props.continueSpending}>
          Übernehmen
        </Button>
      </Aux>
    );
  }
}

export default spendingDetailsForm;
