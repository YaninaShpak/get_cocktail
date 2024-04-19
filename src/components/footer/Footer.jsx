import React from 'react';

import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.root}>
      <div className="container">
        <p className={styles.copyright}>© 2024 · Ianina Shpak</p>
      </div>
    </footer>
  );
};

export default Footer;