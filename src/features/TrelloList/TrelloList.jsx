import React, { Children } from "react";
import styles from "./TrelloList.module.css";
import TrelloCard from "../../_shared/components/TrelloCard/TrelloCard";
import { Draggable, Droppable } from "react-beautiful-dnd";
import Button from "../../_shared/components/Button/Button";
import { useState } from "react";
import CardForm from "../../_shared/components/CardForm/CardForm";

const TrelloList = ({
  id,
  name,
  tasks,
  index,
  openEditModal,
  sendJsonMessage,
}) => {
  return (
    <Draggable draggableId={String(id)} index={index} key={index}>
      {(provided) => (
        <div
          className={styles.container}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className={styles.headerContainer}>
            <p className={styles.title}>{name}</p>
          </div>

          <Droppable droppableId={String(id)} type="card">
            {(provided) => (
              <div
                className={styles.cardsContainer}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {tasks ? (
                  <>
                    {tasks.map((task, index) => (
                      <TrelloCard
                        key={task.id}
                        task={task}
                        id={task.id}
                        index={index}
                        onClick={() => openEditModal(task)}
                      ></TrelloCard>
                    ))}
                  </>
                ) : (
                  <></>
                )}

                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <CardForm sendJsonMessage={sendJsonMessage} listId={id}></CardForm>
        </div>
      )}
    </Draggable>
  );
};

export default TrelloList;
