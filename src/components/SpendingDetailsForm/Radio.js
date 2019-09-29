import React, { Fragment } from "react";

import styles from "./index.module.css";

const Radio = ({ name, value, label, onChange, currentlySelected }) => {
  return (
    <Fragment>
      <input
        type="radio"
        name={name}
        id={`${name}:${value}`}
        value={value}
        checked={currentlySelected === value}
        onChange={onChange}
        className={styles.radioButton}
      />

      <label className={styles.radio} for={`${name}:${value}`}>
        {label}
      </label>
    </Fragment>
  );
};

export default Radio;
