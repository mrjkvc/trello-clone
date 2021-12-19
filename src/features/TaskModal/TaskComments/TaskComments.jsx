import React from "react";
import FormItem from "../../../_shared/components/FormItem/FormItem";
import commentImg from "../../../assets/images/comment.svg";
import TextareaAutosize from "react-textarea-autosize";
import styles from "./TaskComments.module.css";
import Button from "../../../_shared/components/Button/Button";
import Comment from "../../../_shared/components/Comment/Comment";
import CommentForm from "../../../_shared/components/CommentForm/CommentForm";

const TaskComments = ({ comments }) => {
  const handleChange = (event) => {
    console.log(event.target.value);
  };
  return (
    <FormItem
      icon={commentImg}
      label={"Activity"}
      // content={
      //   // <Button colorStyle={styles.detailsButton} text="Show details"></Button>
      // }
    >
      <CommentForm></CommentForm>
      {comments &&
        comments.map((comment, index) => <Comment comment={comment}></Comment>)}
    </FormItem>
  );
};

export default TaskComments;
