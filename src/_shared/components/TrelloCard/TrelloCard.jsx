import React from "react";
import styles from "./TrelloCard.module.css";
import Avatar from "../Avatar/Avatar";
import TrelloLabel from "../TrelloLabel/TrelloLabel";
import { Draggable } from "react-beautiful-dnd";

const TrelloCard = ({ text, id, index, onClick }) => {
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
            <TrelloLabel text="Marija" color="violet"></TrelloLabel>
            <TrelloLabel text="Kovac" color="red"></TrelloLabel>
            <TrelloLabel text="MarijaKOVAC" color="yellow"></TrelloLabel>
          </div>
          <p className={styles.text}>{text}</p>
          <div className={styles.membersContainer}>
            <Avatar
              imageUrl="../../assets/images/preuzmi.jfif"
              size="s"
              shape="circle"
            ></Avatar>
            <Avatar
              imageUrl="../../assets/images/preuzmi.jfif"
              size="s"
              shape="circle"
            ></Avatar>
            <Avatar
              imageUrl="../../assets/images/preuzmi.jfif"
              size="s"
              shape="circle"
            ></Avatar>
            <Avatar
              imageUrl="../../assets/images/preuzmi.jfif"
              size="s"
              shape="circle"
            ></Avatar>
            <Avatar
              imageUrl="../../assets/images/preuzmi.jfif"
              size="s"
              shape="circle"
            ></Avatar>
            <Avatar
              imageUrl="../../assets/images/preuzmi.jfif"
              size="s"
              shape="circle"
            ></Avatar>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TrelloCard;
