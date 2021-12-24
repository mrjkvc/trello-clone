import React from "react";
import FormItem from "../../../_shared/components/FormItem/FormItem";
import titleImg from "../../../assets/images/title.svg";
import TextareaAutosize from "react-textarea-autosize";
import styles from "./TaskTitle.module.css";
import Members from "../Members/Members";
import Labels from "../Labels/Labels";

const TaskTitle = ({ task }) => {
  const handleChange = (event) => {
    console.log(event.target.value);
  };
  return (
    <FormItem icon={titleImg}>
      <TextareaAutosize
        onChange={(e) => handleChange(e)}
        onBlur={() => {}}
        className={styles.input}
        defaultValue={task.name}
      ></TextareaAutosize>
      <Members members={task.members}></Members>
      <Labels labels={task.labels}></Labels>
    </FormItem>
  );
};

export default TaskTitle;
