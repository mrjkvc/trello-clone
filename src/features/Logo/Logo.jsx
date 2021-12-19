import React from "react";
import loginHeaderCube from "../../assets/images/icon_white.svg";
import styles from "./Logo.module.css";

const Logo = () => {
  return (
    <div className={styles.rowStyle}>
      <img src={loginHeaderCube} className={styles.icon} alt=""></img>
      <label className={styles.textStyle}>трело</label>
    </div>
  );
};

export default Logo;
