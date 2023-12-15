import React from 'react';
import { Link } from 'react-router-dom';

//styles
import styles from './BackButton.module.scss';

const BackButton = () => {
    return (
        <Link className={`${styles.BackButton} link`} to="/">
          <span className="visually-hidden">Back</span>
          <span className="material-icons">
            arrow_back
          </span>
        </Link>
    );
};

export default BackButton;