import React from "react";
import { useNavigate } from "react-router-dom";

import styles from "./BackButton.module.scss";

const BackButton = ({to}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  return (
    <button className={`${styles.BackButton} link`} onClick={handleBack}>
      <span className="visually-hidden">Back</span>
      <span className="material-icons">arrow_back</span>
    </button>
  );
};

export default BackButton;
