import React from "react";
import Avatar from "../Avatar/Avatar";
import styles from "./Comment.module.css";
import dateFormat, { masks } from "dateformat";

const Comment = ({ comment }) => {
  return (
    <div className={styles.container}>
      <div className={styles.avatarContainer}>
        <Avatar
          imageUrl={comment.memberCreator.avatarSource}
          size="s"
          shape="circle"
        ></Avatar>
      </div>
      <div className={styles.headerContainer}>
        <label className={styles.nameLabel}>
          {comment.memberCreator.fullname}
        </label>
        <label className={styles.dateLabel}>
          {dateFormat(comment.timestamp)}
        </label>
      </div>
      <div className={styles.commentContainer}>
        <label>{comment.text}</label>
      </div>
    </div>
  );
};

export default Comment;
