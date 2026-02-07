import React from 'react';
import styles from './OptionsPage.module.css';
import { Link } from 'react-router-dom';

export default function OptionsPage() {
  return (
    <div className={styles.root}>
      <div className={styles.box}>
        <div className={styles.image}>
          <img
            className={styles.logo}
            src="https://login.testpad.chitkara.edu.in/images/chitkara_logo_primary.png"
            alt="Chitkara Logo"
          />
        </div>
        <h3 className={styles.title}>Complaint Box</h3>

        <Link to="/complaints/hostel"><button className={styles.btn}>Hostel related Complaint</button></Link>
        <Link to="/complaints/mess"><button className={styles.btn}>Mess related complaint</button></Link>
        <Link to="/complaints/campus"><button className={styles.btn}>Campus related complaint</button></Link>
        <Link to="/complaints/sq1"><button className={styles.btn}>Square 1 related complaint</button></Link>
        <Link to="/complaints/history"><button className={styles.btn}>Complaint history</button></Link>

        <p className={styles.note}>*Check your complaints here</p>
      </div>
    </div>
  );
}
