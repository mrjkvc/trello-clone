import React from "react";
import FormItem from "../../../_shared/components/FormItem/FormItem";
import titleImg from "../../../assets/images/title.svg";
import TextareaAutosize from "react-textarea-autosize";
import styles from "./TaskTitle.module.css";
import Members from "../Members/Members";
import Labels from "../Labels/Labels";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateCardLabels, updateCardMembers } from "../../../redux/board";
import { updateCard } from "../../../redux/board";

const TaskTitle = ({ task, sendMessage, allLabels, allMembers }) => {
  const dispatch = useDispatch();
  const [newTitle, setNewTitle] = useState(task.name);
  const handleChange = (event) => {
    setNewTitle(event.target.value);
  };
  const updateOnBlur = () => {
    if (newTitle != task.name) {
      dispatch(
        updateCard({
          sendMessage: sendMessage,
          card: {
            id: task.id,
            listId: null,
            name: newTitle,
            description: null,
            position: null,
          },
        })
      );
    }
  };

  const updateLabels = (type, label) => {
    dispatch(
      updateCardLabels({
        sendMessage: sendMessage,
        card: task,
        type: type,
        label: label,
      })
    );
  };

  const updateMembers = (type, member) => {
    dispatch(
      updateCardMembers({
        sendMessage: sendMessage,
        card: task,
        type: type,
        member: member,
      })
    );
  };

  return (
    <FormItem icon={titleImg}>
      <TextareaAutosize
        onChange={(e) => handleChange(e)}
        onBlur={() => updateOnBlur()}
        className={styles.input}
        defaultValue={task.name}
      ></TextareaAutosize>
      <Members
        updateMembers={updateMembers}
        members={task.members}
        allMembers={allMembers}
      ></Members>
      <Labels
        updateLabels={updateLabels}
        labels={task.labels}
        allLabels={allLabels}
      ></Labels>
    </FormItem>
  );
};

export default TaskTitle;
