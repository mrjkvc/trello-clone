import React from "react";
import styles from "./Modal.module.css";

const Modal = ({ showModal, children }) => {
  return (
    <>
      {showModal && (
        <div className={styles.background}>
          <div className={styles.container}>{children}</div>
        </div>
      )}
    </>
  );
};

export default Modal;
