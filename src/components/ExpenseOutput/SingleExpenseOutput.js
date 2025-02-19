import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';

import styles from './ExpenseOutput.module.css';

import Button from '../UI/Button/Button';

const SingleExpenseOutput = props => {
  const [detailsVisible, setDetailsVisible] = useState(false);

  return (
    <div
      onClick={() => setDetailsVisible(!detailsVisible)}
      className={styles.ExpenseOutput}>
      <p>{props.date}</p>
      <p style={{ color: props.type === 'taking' ? 'black' : 'red' }}>
        {props.value} €
      </p>
      {detailsVisible ? (
        <Fragment>
          <p>{props.category}</p>
          <p>{props.paymentType}</p>
          {props.note ? <span>{props.note}</span> : null}
          <Button btnType={'Cancel'} clicked={props.clickedDelete}>
            Löschen
          </Button>
          <Button btnType={'Cancel'} clicked={props.clickedEdit}>
            Bearbeiten
          </Button>
        </Fragment>
      ) : null}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    idToken: state.auth.idToken
  };
};

export default connect(mapStateToProps)(SingleExpenseOutput);
