import React from "react";
import PropTypes from 'prop-types';

import styles from "./CancelButton.module.scss";

const CancelButton = ({ onClick }) => {
  return (
    <button className={styles.button} type="button" onClick={onClick}>
      Cancel
    </button>
  );
};

CancelButton.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export default CancelButton;
