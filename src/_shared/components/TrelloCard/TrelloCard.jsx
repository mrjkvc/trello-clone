import React from "react";
import styles from "./TrelloCard.module.css";
import Avatar from "../Avatar/Avatar";
import TrelloLabel from "../TrelloLabel/TrelloLabel";
import { Draggable } from "react-beautiful-dnd";
import CommentNumber from "../CommentNumber/CommentNumber";

const TrelloCard = ({ task, id, index, onClick }) => {
  const lbls = task.labels.slice();
  lbls.sort((first, second) => {
    return first.id > second.id;
  });
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
            {lbls &&
              lbls.map((label, index) => (
                <TrelloLabel
                  text={label.name}
                  color={label.color}
                ></TrelloLabel>
              ))}
          </div>
          <p className={styles.text}>{task.name}</p>
          <div className={styles.bottomRow}>
            {task.comments.length > 0 && (
              <CommentNumber number={task.comments.length}></CommentNumber>
            )}
            <div className={styles.membersContainer}>
              {task.members &&
                task.members.map((member, index) => (
                  <Avatar
                    imageUrl={member.avatarSource}
                    size="s"
                    shape="circle"
                  ></Avatar>
                ))}
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TrelloCard;
