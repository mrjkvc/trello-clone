import React from "react";
import FormItem from "../../../_shared/components/FormItem/FormItem";
import commentImg from "../../../assets/images/comment.svg";
import Comment from "../../../_shared/components/Comment/Comment";
import CommentForm from "../../../_shared/components/CommentForm/CommentForm";
import { useDispatch } from "react-redux";
import { updateCardComments } from "../../../redux/board";
import styles from "./TaskComments.module.css";
import { useSelector } from "react-redux";

const TaskComments = ({ task, sendMessage }) => {
  const dispatch = useDispatch();
  const { member } = useSelector((state) => state.organization);
  const addComment = (commentText) => {
    dispatch(
      updateCardComments({
        sendMessage: sendMessage,
        card: task,
        commentText: commentText,
      })
    );
  };

  return (
    <FormItem icon={commentImg} label={"Activity"}>
      <CommentForm
        imageUrl={member.avatarSource}
        onSubmit={addComment}
      ></CommentForm>
      <div className={styles.scrollableContainer}>
        {task.comments &&
          [...task.comments]
            .sort((c1, c2) => {
              return c1.id < c2.id;
            })
            .map((comment, index) => <Comment comment={comment}></Comment>)}
      </div>
    </FormItem>
  );
};

export default TaskComments;
