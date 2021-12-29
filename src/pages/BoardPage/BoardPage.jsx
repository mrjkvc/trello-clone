import React from "react";
import TrelloList from "../../features/TrelloList/TrelloList";
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";

import styles from "./BoardPage.module.css";
import { connect } from "react-redux";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import ListForm from "../../_shared/components/ListForm/ListForm";
import { useState } from "react";
import TaskModal from "../../features/TaskModal/TaskModal";
import {
  add_card,
  add_list,
  drag_happened,
  update_card,
  set_selected_card,
} from "../../redux/board";
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
  const websocketUrl = "ws://localhost:8080/boardUpdate";
  const token = localStorage.getItem("token");

  useEffect(() => {
    dispatch(getBoard(id));
    dispatch(getLists(id));
  }, [id, dispatch]);

  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
    websocketUrl,
    {
      protocols: token,
      onError: (e) => {
        console.log(e);
      },
      onReconnectStop: (e) => {
        console.log(e);
      },
      onClose: (e) => {
        console.log(e);
      },
    }
  );

  useEffect(() => {
    if (lastJsonMessage != null) {
      if (lastJsonMessage.type == "LIST_CREATED") {
        const list = lastJsonMessage.content;
        if (id == list.idBoard) {
          dispatch(add_list(list));
        }
      }
      if (lastJsonMessage.type == "CARD_CREATED") {
        const card = lastJsonMessage.content;
        if (id == card.idBoard) {
          dispatch(add_card(card));
        }
      }
      if (lastJsonMessage.type == "LIST_MOVED") {
        const list = lastJsonMessage.content;
        list.id = "L" + list.id;
        if (id == list.idBoard) {
          dispatch(
            drag_happened({
              type: "list",
              droppableIdStart: "all-lists",
              droppableIdEnd: "all-lists",
              droppableIndexStart: board.lists
                .map((list) => list.id)
                .indexOf(list.id),
              droppableIndexEnd: list.position,
              draggableId: list.id,
            })
          );
        }
      }
      if (lastJsonMessage.type == "CARD_MOVED") {
        const card = lastJsonMessage.content;
        var targetCard;
        var targetList;
        board.lists.forEach((l1) => {
          l1.cards.forEach((c) => {
            if (card.id == c.id) {
              targetCard = c;
              targetList = l1;
            }
          });
        });
        var indexFrom = targetList.cards
          .map((card) => card.id)
          .indexOf(targetCard.id);

        if (id == card.idBoard) {
          dispatch(
            drag_happened({
              type: "card",
              droppableIdStart: targetList.id,
              droppableIdEnd: "L" + card.listId,
              droppableIndexStart: indexFrom,
              droppableIndexEnd: card.position,
              draggableId: card.id,
            })
          );
        }
      }

      if (lastJsonMessage.type == "CARD_UPDATED") {
        let card = lastJsonMessage.content;
        if (card.idBoard == id) {
          dispatch(update_card(card));
        }
      }
    }
  }, [dispatch, lastJsonMessage]);

  const openEditModal = (task) => {
    dispatch(set_selected_card(task));
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
      listService
        .updateList(draggableId.substring(1), null, droppableIndexEnd, null)
        .then((response) => {
          sendJsonMessage({ type: "LIST_MOVED", content: response });
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
          sendJsonMessage({ type: "CARD_MOVED", content: response });
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
        sendMessage={sendJsonMessage}
        allLabels={board.labels}
        allMembers={board.members}
      ></TaskModal>
      <LoadingModal showModal={status != "idle"}></LoadingModal>
      <div className={styles.boardContainer}>
        <DragDropContext onDragEnd={onDragEnd} style={{ overflow: "auto" }}>
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
                    sendJsonMessage={sendJsonMessage}
                  ></TrelloList>
                ))}
                {provided.placeholder}
                <ListForm sendJsonMessage={sendJsonMessage}></ListForm>
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
