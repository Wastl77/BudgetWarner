import React, { Fragment } from "react";

import Button from "../Button/Button";

const error = props => (
  <Fragment>
    <p>
      Ein Fehler ist aufgetreten! Bei fehlender Internetverbindung bitte später
      erneut versuchen.
    </p>
    <p>Fehlermeldung: {props.errorMessage}</p>
    <Button clicked={props.errorConfirmHandler}>Bestätigen</Button>
  </Fragment>
);

export default error;
