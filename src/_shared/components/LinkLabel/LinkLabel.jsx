import React from "react";
import styles from "./LinkLabel.module.css";

const LinkLabel = ({ infoText, linkText, onClick }) => {
  return (
    <div>
      <label className={styles.info}>{infoText}</label>
      <a className={styles.link} onClick={onClick}>
        {linkText}
      </a>
    </div>
  );
};

export default LinkLabel;
