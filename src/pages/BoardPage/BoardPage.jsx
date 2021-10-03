import React from "react";
import TrelloList from "../../features/TrelloList/TrelloList";
import Button from "../../_shared/components/Button/Button";
import styles from "./BoardPage.module.css";
import { connect } from "react-redux";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import ListForm from "../../_shared/components/ListForm/ListForm";
import { sort } from "../../actions";
import { useState } from "react";
import TaskModal from "../../features/TaskModal/TaskModal";
const BoardPage = () => {
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.lists);
  const [selectedTask, setSelectedTask] = useState({});
  const [showModal, setShowModal] = useState(true);

  const openEditModal = (task) => {
    setSelectedTask(task);
    setShowModal(true);
  };
  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;
    console.log(destination);
    if (!destination) {
      return;
    }

    dispatch(
      sort(
        type,
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index,
        draggableId
      )
    );
  };
  return (
    <>
      <TaskModal
        selectedTask={selectedTask}
        setSelectedTask={setSelectedTask}
        setShowModal={setShowModal}
        showModal={showModal}
      ></TaskModal>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="all-lists" direction="horizontal" type="list">
          {(provided) => (
            <div
              className={styles.listContainer}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {lists.map((list, index) => (
                <TrelloList
                  key={list.id}
                  id={list.id}
                  title={list.title}
                  tasks={list.cards}
                  index={index}
                  openEditModal={openEditModal}
                ></TrelloList>
              ))}
              {provided.placeholder}
              <ListForm></ListForm>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

const mapStateToProps = (state) => ({
  lists: state.lists,
});

export default connect(mapStateToProps)(BoardPage);
