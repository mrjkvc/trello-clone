import React from "react";
import styles from "./ModalHeader.module.css";
import closeImg from "../../../assets/images/close.svg";

const ModalHeader = ({ title, setShowModal, setSelectedTask }) => {
  return (
    <div className={styles.headercontainer}>
      <p className={styles.title}>{title}</p>
      <img
        src={closeImg}
        alt="close"
        onClick={() => {
          setSelectedTask({});
          setShowModal(false);
        }}
        className={styles.imagebtn}
      ></img>
    </div>
  );
};

export default ModalHeader;
