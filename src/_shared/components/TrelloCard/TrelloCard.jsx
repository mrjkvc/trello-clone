import React from "react";
import styles from "./TrelloCard.module.css";
import Avatar from "../Avatar/Avatar";
import TrelloLabel from "../TrelloLabel/TrelloLabel";
import { Draggable } from "react-beautiful-dnd";

const TrelloCard = ({ task, id, index, onClick }) => {
  return (
    <Draggable draggableId={String(id)} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={styles.cardContainer}
          onClick={onClick}
        >
          <div className={styles.labelsContainer}>
            {task.labels &&
              task.labels.map((label, index) => (
                <TrelloLabel
                  text={label.text}
                  color={label.color}
                ></TrelloLabel>
              ))}
          </div>
          <p className={styles.text}>{task.name}</p>
          <div className={styles.membersContainer}>
            {task.members &&
              task.members.map((member, index) => (
                <Avatar
                  imageUrl={member.imageurl}
                  size="s"
                  shape="circle"
                ></Avatar>
              ))}
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TrelloCard;
