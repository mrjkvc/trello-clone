import React from "react";
import FormItem from "../../../_shared/components/FormItem/FormItem";
import attachmentImg from "../../../assets/images/attachment.svg";
import TextareaAutosize from "react-textarea-autosize";
import styles from "./TaskAttachments.module.css";
import Button from "../../../_shared/components/Button/Button";

const TaskAttachments = ({ attachments }) => {
  const handleChange = (event) => {
    console.log(event.target.value);
  };
  return (
    <FormItem
      icon={attachmentImg}
      label={"Attachments"}
      content={<Button text="Add attachment"></Button>}
    ></FormItem>
  );
};

export default TaskAttachments;
