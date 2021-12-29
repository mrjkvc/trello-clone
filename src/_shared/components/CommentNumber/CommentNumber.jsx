import React from "react";
import commentIcon from "../../../assets/images/comment.png";
import styles from "./CommentNumber.module.css";

const CommentNumber = ({ number }) => {
  return (
    <div className={styles.container}>
      <label className={styles.label}>{number}</label>
      <img src={commentIcon} className={styles.icon}></img>
    </div>
  );
};

export default CommentNumber;
