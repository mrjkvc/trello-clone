import React from "react";
import FormItem from "../../../_shared/components/FormItem/FormItem";
import descriptionImg from "../../../assets/images/description.svg";
import TextareaAutosize from "react-textarea-autosize";
import styles from "./TaskDescription.module.css";

const TaskDescription = ({ description }) => {
  const handleChange = (event) => {
    console.log(event.target.value);
  };
  console.log(description);
  return (
    <FormItem icon={descriptionImg} label={"Description"}>
      <TextareaAutosize
        onChange={(e) => handleChange(e)}
        onBlur={() => {}}
        className={styles.input}
        defaultValue={description}
      ></TextareaAutosize>
    </FormItem>
  );
};

export default TaskDescription;
