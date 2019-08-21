import React from 'react';
import Aux from '../../hoc/Aux/Aux';

const spendingInput = () => (
  <Aux>
    <div>
      <input type="number"></input>
      <p>€</p>
    </div>
    <button>Übernehmen</button>
  </Aux>
);

export default spendingInput;