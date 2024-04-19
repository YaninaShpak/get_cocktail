import React from "react";

import styles from "./ControlButton.module.scss";

const ControlButton = ({ ariaLabel, item, handleClick, icon, check }) => {
  return (
    <button
      className={`${styles.button} ${check ? styles.active : ""}`}
      type="button"
      aria-label={`${ariaLabel} ${item}`}
      onClick={() => handleClick(item)}
    >
      <span className={`material-icons ${styles.button__icon}`}>{icon}</span>
    </button>
  );
};

export default ControlButton;
