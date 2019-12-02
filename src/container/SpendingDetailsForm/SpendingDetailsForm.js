import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import Aux from '../../hoc/Aux/Aux';
import Button from '../../components/UI/Button/Button';
import styles from './index.module.css';
import Radio from '../../components/UI/Radio/Radio';
import Error from '../../components/UI/Error/Error';
import SpendingInput from '../../components/SpendingInput/SpendingInput';

import * as helper from '../../helper/helper';
import * as actions from '../../store/actions/index';

class SpendingDetailsForm extends Component {
  state = {
    category: this.props.editExpenseData
      ? this.props.editExpenseData.category
      : 'keine',
    paymentType: this.props.editExpenseData
      ? this.props.editExpenseData.paymentType
      : 'Bar',
    type: this.props.editExpenseData
      ? this.props.editExpenseData.type
      : 'spending',
    date: this.props.editExpenseData
      ? new Date(
          this.props.editExpenseData.dateOfExpenseISO
        ).toLocaleDateString('en-ca')
      : new Date().toLocaleDateString('en-CA'),
    note: this.props.editExpenseData ? this.props.editExpenseData.note : '',
    spendingInput: this.props.editExpenseData
      ? this.props.editExpenseData.expenseValue
      : ''
  };

  storeSpendingHandler = () => {
    let expense = parseFloat(this.state.spendingInput).toFixed(2);
    let category = this.state.category;
    let paymentType = this.state.paymentType;
    let dateOfExpenseISO = new Date(this.state.date);
    let dateOfExpense = new Intl.DateTimeFormat('de-DE').format(
      new Date(this.state.date)
    );
    let monthOfExpense = new Intl.DateTimeFormat('de-DE', {
      month: 'long'
    }).format(new Date(this.state.date));
    monthOfExpense =
      monthOfExpense.charAt(0).toLowerCase() + monthOfExpense.slice(1);
    let userId = this.props.userId;
    let newTotalExpenditure;
    if (this.state.type === 'spending') {
      newTotalExpenditure =
        parseFloat(this.props.totalExpenditure) +
        parseFloat(expense).toFixed(2);
    } else {
      newTotalExpenditure =
        parseFloat(this.props.totalExpenditure) -
        parseFloat(expense).toFixed(2);
    }
    let available = helper.calculateAvailable(
      +this.props.monthlyBudget,
      newTotalExpenditure
    );

    const storageExpenseData = {
      dateOfStorage: new Date(),
      expenseValue: expense,
      category: category,
      paymentType: paymentType,
      dateOfExpense: dateOfExpense,
      dateOfExpenseISO: dateOfExpenseISO,
      month: monthOfExpense,
      userId: userId,
      note: this.state.note,
      type: this.state.type
    };

    const idToken = this.props.idToken;

    const payload = [
      storageExpenseData,
      newTotalExpenditure,
      available,
      idToken,
      monthOfExpense
    ];

    if (!this.props.isEditMode) {
      this.props.onStoreSpending(payload);
      this.props.history.push('/');
    } else {
      axios
        .patch(
          `/singleExpenses/${this.props.editExpenseData.id}.json?auth=${this.props.idToken}`,
          storageExpenseData
        )
        .then(res => {
          this.props.onSetInitialState(this.props.idToken);
          this.props.history.push('/');
        })
        .catch(err => {
          this.props.fetchDataFail({ error: err.message });
        });
    }
  };

  setter = event => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  };

  onErrorConfirmed = () => {
    this.props.onErrorConfirmation();
  };

  onCancelButtonClicked = () => {
    this.props.history.push('/');
  };

  render() {
    const isInvalid =
      parseFloat(this.state.spendingInput) <= 0 ||
      this.state.spendingInput === '' ||
      isNaN(this.state.spendingInput);
    let content = (
      <Aux>
        <div>
          <h2 className={styles.header}>Ausgabe</h2>

          <SpendingInput
            inputChanged={this.setter}
            inputValue={this.state.spendingInput}
          />

          <h2 className={styles.header}>Kategorie</h2>

          <Radio
            label='Keine'
            value='keine'
            name='category'
            currentlySelected={this.state.category}
            onChange={this.setter}
          />

          <Radio
            label='Supermarkt'
            value='supermarkt'
            name='category'
            currentlySelected={this.state.category}
            onChange={this.setter}
          />

          <Radio
            label='Drogerie'
            value='drogerie'
            name='category'
            currentlySelected={this.state.category}
            onChange={this.setter}
          />

          <Radio
            label='Tanken'
            value='tanken'
            name='category'
            currentlySelected={this.state.category}
            onChange={this.setter}
          />
        </div>

        <div>
          <h2 className={styles.header}>Zahlungsart</h2>

          <Radio
            label='Bar'
            value='Bar'
            name='paymentType'
            currentlySelected={this.state.paymentType}
            onChange={this.setter}
          />
          <Radio
            label='EC-Karte'
            value='EC-Karte'
            name='paymentType'
            currentlySelected={this.state.paymentType}
            onChange={this.setter}
          />
        </div>

        <div>
          <h2 className={styles.header}>Typ</h2>

          <Radio
            label='Ausgabe'
            value='spending'
            name='type'
            currentlySelected={this.state.type}
            onChange={this.setter}
          />
          <Radio
            label='Einnahme'
            value='taking'
            name='type'
            currentlySelected={this.state.type}
            onChange={this.setter}
          />
        </div>

        <div>
          <h2 className={styles.header}>Datum der Ausgabe</h2>

          <input
            type='date'
            name='date'
            value={this.state.date}
            onChange={this.setter}
            className={styles.input}
          />
        </div>

        <div>
          <h2 className={styles.header}>Notiz</h2>

          <textarea
            style={{ width: '80%' }}
            value={this.state.note}
            name='note'
            onChange={this.setter}
            className={styles.input}></textarea>
        </div>

        <Button btnType='Cancel' clicked={this.onCancelButtonClicked}>
          Abbrechen
        </Button>

        <Button
          btnType='Continue'
          clicked={this.storeSpendingHandler}
          isDisabled={isInvalid}>
          Übernehmen
        </Button>
      </Aux>
    );

    if (this.props.error) {
      content = (
        <Error
          errorMessage={this.props.error}
          errorConfirmHandler={this.onErrorConfirmed}
        />
      );
    }

    return content;
  }
}

const mapStateToProps = state => {
  return {
    monthlyBudget: state.main.monthlyBudget,
    totalExpenditure: state.main.totalExpenditure,
    totalAvailable: state.main.totalAvailable,
    showModal: state.main.showModal,
    idToken: state.auth.idToken,
    userId: state.auth.userId,
    error: state.main.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSetInitialState: payload => dispatch(actions.onSetInitialState(payload)),
    onStoreSpending: payload => dispatch(actions.onStoreSpending(payload)),
    onErrorConfirmation: () => dispatch(actions.confirmError()),
    fetchDataFail: payload => dispatch(actions.fetchDataFail(payload))
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SpendingDetailsForm)
);
