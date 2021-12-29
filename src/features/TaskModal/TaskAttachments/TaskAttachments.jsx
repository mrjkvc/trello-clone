import React from "react";
import FormItem from "../../../_shared/components/FormItem/FormItem";
import attachmentImg from "../../../assets/images/attachment.svg";
import Button from "../../../_shared/components/Button/Button";

const TaskAttachments = ({ attachments }) => {
  return (
    <FormItem
      icon={attachmentImg}
      label={"Attachments"}
      content={<Button text="Add attachment"></Button>}
    ></FormItem>
  );
};

export default TaskAttachments;
