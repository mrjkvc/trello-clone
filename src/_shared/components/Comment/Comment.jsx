import React from "react";
import Avatar from "../Avatar/Avatar";
import styles from "./Comment.module.css";

const Comment = ({ comment }) => {
  return (
    <div className={styles.container}>
      <div className={styles.avatarContainer}>
        <Avatar
          imageUrl={comment.user.imageurl}
          size="s"
          shape="circle"
        ></Avatar>
      </div>
      <div className={styles.headerContainer}>
        <label className={styles.nameLabel}>{comment.user.fullname}</label>
        <label className={styles.dateLabel}>{comment.date}</label>
      </div>
      <div className={styles.commentContainer}>
        <label>{comment.text}</label>
      </div>
    </div>
  );
};

export default Comment;
