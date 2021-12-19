import React from "react";
import styles from "./FormItem.module.css";

const FormItem = ({ icon, label, children, customStyle = "", content }) => {
  return (
    <>
      <div className={styles.container}>
        {icon && <img className={styles.icon} src={icon} alt="icon"></img>}

        <div className={`${styles.columnContainer} ${customStyle}`}>
          {(label || content) && (
            <div className={styles.rowContainer}>
              {label && <label className={styles.label}>{label}</label>}
              {content}
            </div>
          )}

          {children}
        </div>
      </div>
    </>
  );
};

export default FormItem;
