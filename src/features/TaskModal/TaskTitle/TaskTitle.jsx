import React from "react";
import FormItem from "../../../_shared/components/FormItem/FormItem";
import titleImg from "../../../assets/images/title.svg";
import TextareaAutosize from "react-textarea-autosize";
import styles from "./TaskTitle.module.css";

const TaskTitle = ({ title }) => {
  const handleChange = (event) => {
    console.log(event.target.value);
  };
  console.log(title);
  return (
    <FormItem icon={titleImg}>
      <TextareaAutosize
        onChange={(e) => handleChange(e)}
        onBlur={() => {}}
        className={styles.input}
        defaultValue={title}
      ></TextareaAutosize>
    </FormItem>
  );
};

export default TaskTitle;
