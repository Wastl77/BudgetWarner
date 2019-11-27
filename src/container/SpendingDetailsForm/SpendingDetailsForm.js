import React, { Component } from 'react';
import { connect } from 'react-redux';

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
    selectedCategory: 'keine',
    selectedPaymentType: 'Bar',
    type: 'spending',
    selectedDate: new Date().toLocaleDateString('en-CA'),
    note: ''
  };

  storeSpendingHandler = () => {
    let expense = parseFloat(this.props.spendingInputValue).toFixed(2);
    let category = this.state.selectedCategory;
    let paymentType = this.state.selectedPaymentType;
    let dateOfExpenseISO = new Date(this.state.selectedDate);
    let dateOfExpense = new Intl.DateTimeFormat('de-DE').format(
      new Date(this.state.selectedDate)
    );
    let monthOfExpense = new Intl.DateTimeFormat('de-DE', {
      month: 'long'
    }).format(new Date(this.state.selectedDate));
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

    this.props.onStoreSpending(payload);
    this.props.history.push('/');
  };

  spendingInputChangedHandler = event => {
    const { value } = event.target;
    this.props.onSpendingInputChanged({ value: value });
  };

  handleCategoryChange = event => {
    this.setState({
      selectedCategory: event.target.value
    });
  };

  handlePaymentTypeChange = event => {
    this.setState({
      selectedPaymentType: event.target.value
    });
  };

  handleTypeChange = event => {
    this.setState({
      type: event.target.value
    });
  };

  handleDateChange = event => {
    this.setState({
      selectedDate: event.target.value
    });
  };

  handleNoteChange = event => {
    this.setState({
      note: event.target.value
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
      parseFloat(this.props.spendingInputValue) <= 0 ||
      this.props.spendingInputValue === '' ||
      isNaN(this.props.spendingInputValue);
    console.log(isInvalid);
    let content = (
      <Aux>
        <div>
          <h2 className={styles.header}>Ausgabe</h2>

          <SpendingInput
            inputChanged={this.spendingInputChangedHandler}
            inputValue={this.props.spendingInputValue}
          />

          <h2 className={styles.header}>Kategorie</h2>

          <Radio
            label='Keine'
            value='keine'
            name='category'
            currentlySelected={this.state.selectedCategory}
            onChange={this.handleCategoryChange}
          />

          <Radio
            label='Supermarkt'
            value='supermarkt'
            name='category'
            currentlySelected={this.state.selectedCategory}
            onChange={this.handleCategoryChange}
          />

          <Radio
            label='Drogerie'
            value='drogerie'
            name='category'
            currentlySelected={this.state.selectedCategory}
            onChange={this.handleCategoryChange}
          />

          <Radio
            label='Tanken'
            value='tanken'
            name='category'
            currentlySelected={this.state.selectedCategory}
            onChange={this.handleCategoryChange}
          />
        </div>

        <div>
          <h2 className={styles.header}>Zahlungsart</h2>

          <Radio
            label='Bar'
            value='Bar'
            name='paymentType'
            currentlySelected={this.state.selectedPaymentType}
            onChange={this.handlePaymentTypeChange}
          />
          <Radio
            label='EC-Karte'
            value='EC-Karte'
            name='paymentType'
            currentlySelected={this.state.selectedPaymentType}
            onChange={this.handlePaymentTypeChange}
          />
        </div>

        <div>
          <h2 className={styles.header}>Typ</h2>

          <Radio
            label='Ausgabe'
            value='spending'
            name='type'
            currentlySelected={this.state.type}
            onChange={this.handleTypeChange}
          />
          <Radio
            label='Einnahme'
            value='taking'
            name='type'
            currentlySelected={this.state.type}
            onChange={this.handleTypeChange}
          />
        </div>

        <div>
          <h2 className={styles.header}>Datum der Ausgabe</h2>

          <input
            type='date'
            value={this.state.selectedDate}
            onChange={this.handleDateChange}
            className={styles.input}
          />
        </div>

        <div>
          <h2 className={styles.header}>Notiz</h2>

          <textarea
            style={{ width: '80%' }}
            value={this.state.note}
            onChange={this.handleNoteChange}
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
          errorConfirmedHandler={this.onErrorConfirmed}
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
    error: state.main.error,
    spendingInputValue: state.main.spendingInputValue
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSpendingInputChanged: payload =>
      dispatch(actions.onSpendingInputChanged(payload)),
    onStoreSpending: payload => dispatch(actions.onStoreSpending(payload)),
    onErrorConfirmation: () => dispatch(actions.confirmError())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SpendingDetailsForm);
