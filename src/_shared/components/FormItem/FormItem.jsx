import React from "react";
import styles from "./FormItem.module.css";

const FormItem = ({ icon, label, children, customStyle = "", content }) => {
  return (
    <div className={styles.rowContainer}>
      <img className={styles.icon} src={icon}></img>
      <div className={`${styles.columnContainer} ${customStyle}`}>
        {label && <label className={styles.label}>{label}</label>}
        {children}
      </div>
      {content}
    </div>
  );
};

export default FormItem;
