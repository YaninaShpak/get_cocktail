import React from "react";

import styles from "./ControlButton.module.scss";

const ControlButton = ({ item, handleClick, icon }) => {
  return (
    <button
      className={styles.button}
      type="button"
      aria-label={`Exclude ${item}`}
      onClick={() => handleClick(item)}
    >
      <span className={`material-icons ${styles.button__icon}`}>{icon}</span>
    </button>
  );
};

export default ControlButton;
