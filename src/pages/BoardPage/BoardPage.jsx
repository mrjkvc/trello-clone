import React from "react";
import TrelloList from "../../features/TrelloList/TrelloList";
//import Button from "../../_shared/components/Button/Button";
import styles from "./BoardPage.module.css";
import { connect } from "react-redux";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import ListForm from "../../_shared/components/ListForm/ListForm";
import { useState } from "react";
import TaskModal from "../../features/TaskModal/TaskModal";
import { drag_happened } from "../../redux/board";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getLists } from "../../redux/board";
import { getBoard } from "../../redux/board";
import listService from "../../api/service/list";
import cardService from "../../api/service/card";
import LoadingModal from "../../features/LoadingModal/LoadingModal";
const BoardPage = () => {
  const dispatch = useDispatch();
  const { board, status } = useSelector((state) => state.board);
  const lists = board.lists;
  const [selectedTask, setSelectedTask] = useState({});
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getBoard(id));
    dispatch(getLists(id));
  }, [id, dispatch]);

  const openEditModal = (task) => {
    setSelectedTask(task);
    setShowModal(true);
  };
  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;
    if (!destination) {
      return;
    }

    const droppableIdEnd = destination.droppableId;
    const droppableIdStart = source.droppableId;
    const droppableIndexEnd = destination.index;
    const droppableIndexStart = source.index;

    dispatch(
      drag_happened({
        type,
        droppableIdStart,
        droppableIdEnd,
        droppableIndexStart,
        droppableIndexEnd,
        draggableId,
      })
    );

    if (type == "list") {
      console.log("marija");
      listService
        .updateList(draggableId.substring(1), null, droppableIndexEnd, null)
        .then((response) => {
          console.log("listUpdated");
        });
    } else if (type == "card") {
      cardService
        .updateCard(
          draggableId,
          droppableIdEnd.substring(1),
          null,
          null,
          droppableIndexEnd
        )
        .then((response) => {
          console.log(JSON.stringify(response));
        });
    }
  };
  return (
    <>
      <TaskModal
        selectedTask={selectedTask}
        setSelectedTask={setSelectedTask}
        setShowModal={setShowModal}
        showModal={showModal}
      ></TaskModal>
      <LoadingModal showModal={status != "idle"}></LoadingModal>
      <div className={styles.boardContainer}>
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
                    name={list.name}
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
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  lists: state.lists,
});

export default connect(mapStateToProps)(BoardPage);
