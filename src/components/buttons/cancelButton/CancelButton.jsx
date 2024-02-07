import React from 'react';

//styles
import styles from './CancelButton.module.scss';

const CancelButton = ({onClick}) => {

  return (
    <button 
    className={styles.button} 
    type="button"
    onClick={onClick}
    >
      Cancel
    </button>
  );
};

export default CancelButton;