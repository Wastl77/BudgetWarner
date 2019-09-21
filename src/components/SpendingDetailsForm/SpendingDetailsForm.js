import React from 'react';

import Aux from '../../hoc/Aux/Aux';
import Button from '../UI/Button/Button';

const spendingDetailsForm = (props) => (
    <Aux>
      <p>
        Platzhalter für SpendingDetailsForm
      </p>
      <Button btnType="Cancel" clicked={props.cancelSpending}>Abbrechen</Button>
      <Button btnType="Continue" clicked={props.continueSpending}>Übernehmen</Button>
    </Aux>
);

export default spendingDetailsForm;