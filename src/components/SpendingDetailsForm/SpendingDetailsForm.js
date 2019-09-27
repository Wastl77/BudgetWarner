import React, { Component } from 'react';

import Aux from '../../hoc/Aux/Aux';
import Button from '../UI/Button/Button';
import { Test } from '../../helper/helper';

class spendingDetailsForm extends Component {
  render() {
    return (
      <Aux>
        <div>
          <h1>Kategorie</h1>
          <label>
          <input
            type="radio"
            name="category"
            value="keine"
            checked={this.props.selectedCategory === "keine"}
            onChange={this.props.handleCategoryChange}
            />
            Keine
          </label>
          <label>
          <input
            type="radio"
            name="category"
            value="supermarkt"
            checked={this.props.selectedCategory === "supermarkt"}
            onChange={this.props.handleCategoryChange}
            />
            Supermarkt
          </label>
          <label>
          <input
            type="radio"
            name="category"
            value="drogerie"
            checked={this.props.selectedCategory === "drogerie"}
            onChange={this.props.handleCategoryChange}
            />
            Drogerie
          </label>
          <label>
          <input
            type="radio"
            name="category"
            value="tanken"
            checked={this.props.selectedCategory === "tanken"}
            onChange={this.props.handleCategoryChange}
            />
            Tanken
          </label>
        </div>
        <div>
          <h1>Zahlungsart</h1>
          <label>
          <input
            type="radio"
            name="paymentType"
            value="bar"
            checked={this.props.selectedPaymentType === "bar"}
            onChange={this.props.handlePaymentTypeChange}
            />
            Bar
          </label>
          <label>
          <input
            type="radio"
            name="paymentType"
            value="ec-karte"
            checked={this.props.selectedPaymentType === "ec-karte"}
            onChange={this.props.handlePaymentTypeChange}
            />
            EC-Karte
          </label>
        </div>
        <div>
          <h1>Datum der Ausgabe</h1>
          <input
            type="date"
            value={this.props.selectedDate}
            onChange={this.props.handleDateChange}
          />
        </div>
        <Button btnType="Cancel" clicked={this.props.cancelSpending}>Abbrechen</Button>
        <Button btnType="Continue" clicked={this.props.continueSpending}>Übernehmen</Button>
      </Aux>
    );
  };
};

export default spendingDetailsForm;