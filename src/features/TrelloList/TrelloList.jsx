import React, { Children } from "react";
import styles from "./TrelloList.module.css";
import TrelloCard from "../../_shared/components/TrelloCard/TrelloCard";
import { Draggable, Droppable } from "react-beautiful-dnd";
import Button from "../../_shared/components/Button/Button";
import { useState } from "react";
import CardForm from "../../_shared/components/CardForm/CardForm";

const TrelloList = ({ id, title, tasks, index, openEditModal }) => {
  return (
    <Draggable draggableId={String(id)} index={index}>
      {(provided) => (
        <div
          className={styles.container}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className={styles.headerContainer}>
            <p className={styles.title}>{title}</p>
          </div>

          <Droppable droppableId={String(id)} type="card">
            {(provided) => (
              <div
                className={styles.cardsContainer}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {tasks.map((task, index) => (
                  <TrelloCard
                    key={task.id}
                    text={task.text}
                    id={task.id}
                    index={index}
                    onClick={() => openEditModal(task)}
                  ></TrelloCard>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <CardForm listId={id}></CardForm>
        </div>
      )}
    </Draggable>
  );
};

export default TrelloList;
