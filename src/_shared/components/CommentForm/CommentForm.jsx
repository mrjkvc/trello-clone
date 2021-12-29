import React from "react";
import Avatar from "../Avatar/Avatar";
import styles from "./CommentForm.module.css";
import TextareaAutosize from "react-textarea-autosize";
import Button from "../Button/Button";
import { useState } from "react";

const CommentForm = ({
  imageUrl = "https://m.media-amazon.com/images/M/MV5BMjE1NjMxMDUyM15BMl5BanBnXkFtZTgwODMzNDM1NTE@._V1_.jpg",
  onSubmit,
}) => {
  const handleChange = (event) => {
    setCommentText(event.target.value);
  };

  const onFocus = () => {
    setShowButton(true);
  };
  const onBlur = () => {
    if (!commentText) {
      setShowButton(false);
    }
  };
  const [showButton, setShowButton] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [inputFocused, setInputFocused] = useState(false);
  return (
    <div className={styles.container}>
      <div className={styles.avatarContainer}>
        <Avatar imageUrl={imageUrl} size="s" shape="circle"></Avatar>
      </div>
      <div className={styles.commentContainer}>
        <TextareaAutosize
          placeholder="Add a new comment"
          onChange={(e) => handleChange(e)}
          onBlur={onBlur}
          onFocus={onFocus}
          className={styles.input}
          value={commentText}
        ></TextareaAutosize>
        {showButton && (
          <Button
            text={"+ Add Comment"}
            colorStyle={styles.addCardButton}
            disabled={!commentText}
            onClick={() => {
              onSubmit(commentText);
              setCommentText("");
              setShowButton(false);
            }}
          ></Button>
        )}
      </div>
    </div>
  );
};

export default CommentForm;
