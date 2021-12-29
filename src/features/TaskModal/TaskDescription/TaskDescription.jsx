import React from "react";
import FormItem from "../../../_shared/components/FormItem/FormItem";
import descriptionImg from "../../../assets/images/description.svg";
import TextareaAutosize from "react-textarea-autosize";
import styles from "./TaskDescription.module.css";
import { useDispatch } from "react-redux";
import { updateCard } from "../../../redux/board";
import { useState } from "react";

const TaskDescription = ({ task, sendMessage }) => {
  const dispatch = useDispatch();
  const [newDescription, setNewDescription] = useState(task.name);
  const handleChange = (event) => {
    setNewDescription(event.target.value);
  };
  const updateOnBlur = () => {
    if (newDescription != task.name) {
      dispatch(
        updateCard({
          sendMessage: sendMessage,
          card: {
            id: task.id,
            listId: null,
            name: null,
            description: newDescription,
            position: null,
          },
        })
      );
    }
  };
  return (
    <FormItem icon={descriptionImg} label={"Description"}>
      <TextareaAutosize
        onChange={(e) => handleChange(e)}
        onBlur={() => updateOnBlur()}
        className={styles.input}
        defaultValue={task.description}
        placeholder="Add a more detailed description"
      ></TextareaAutosize>
    </FormItem>
  );
};

export default TaskDescription;
