import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

import Aux from "../../hoc/Aux/Aux";
import BudgetOutputs from "../../components/BudgetOutputs/BudgetOutputs";
import SpendingInput from "../../components/SpendingInput/SpendingInput";
import Modal from "../../components/UI/Modal/Modal";
import SpendingDetailsForm from "../SpendingDetailsForm/SpendingDetailsForm";
import Spinner from "../../components/UI/Spinner/Spinner";

import * as actionCreators from "../../store/actions/actions";
import * as helper from "../../helper/helper";

class MainContent extends Component {
  state = {
    spendingInputValue: 0
  };

  componentDidMount() {
    this.props.toggleLoading();

    axios
      .all([
        axios.get("/expenditure/-Lq_T-H91dNZXUolCPon.json"),
        axios.get("/budget/-Lq_SMZGI0D_kJEoFtPN.json")
      ])
      .then(
        axios.spread((totalExp, budget) => {
          let monthlyBudget = budget.data[helper.getActualMonthString()];
          let totalExpenditure = totalExp.data.totalExpenditure;
          this.props.setInitialState({
            totalExpenditure: totalExpenditure,
            budget: budget.data,
            monthlyBudget: monthlyBudget
          });
          this.props.toggleLoading();
        })
      )
      .catch(error => {
        console.log(error);
        this.props.toggleLoading();
      });
  }

  spendingInputValueHandler = event => {
    this.setState({
      spendingInputValue: event.target.value
    });
  };

  render() {
    let content = (
      <Aux>
        <Modal show={this.props.showModal} modalClosed={this.props.toggleModal}>
          <SpendingDetailsForm spendingValue={this.state.spendingInputValue} />
        </Modal>
        <BudgetOutputs
          monthlyBudget={this.props.monthlyBudget}
          totalAvailable={this.props.totalAvailable}
          dailyAvailable={this.props.dailyAvailable}
        />
        <SpendingInput
          applySpending={this.props.toggleModal}
          inputValue={this.spendingInputValueHandler}
        />
      </Aux>
    );
    if (this.props.loading) {
      content = <Spinner />;
    }

    return content;
  }
}

const mapStateToProps = state => {
  return {
    monthlyBudget: state.main.monthlyBudget,
    totalExpenditure: state.main.totalExpenditure,
    totalAvailable: state.main.totalAvailable,
    dailyAvailable: state.main.dailyAvailable,
    showModal: state.main.showModal,
    loading: state.main.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setInitialState: payload =>
      dispatch(actionCreators.setInitialState(payload)),
    toggleModal: () => dispatch(actionCreators.toggleModal()),
    toggleLoading: () => dispatch(actionCreators.toggleLoading())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainContent);
