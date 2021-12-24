import React from "react";
import TrelloList from "../../features/TrelloList/TrelloList";
//import Button from "../../_shared/components/Button/Button";
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";

import styles from "./BoardPage.module.css";
import { connect } from "react-redux";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import ListForm from "../../_shared/components/ListForm/ListForm";
import { useState } from "react";
import TaskModal from "../../features/TaskModal/TaskModal";
import { add_card, add_list, drag_happened } from "../../redux/board";
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
      console.log(lastJsonMessage);
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
        //const list = board.lists.find((l) => l.id == "L" + card.listId);
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
        console.log(
          "card" +
            JSON.stringify(card) +
            "targetCard" +
            JSON.stringify(targetCard)
        );
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

      /* if (lastJsonMessage.type == "LOG_ON") {
        dispatch(add_user(lastJsonMessage.content));
      }

      if (lastJsonMessage.type == "LOG_OFF") {
        dispatch(remove_user(lastJsonMessage.content));
      }

      if (lastJsonMessage.type == "STANDARD") {
        dispatch(
          add_message({
            username: lastJsonMessage.sender,
            message: {
              type: "received",
              timestamp: lastJsonMessage.timestamp,
              content: lastJsonMessage.content,
            },
          })
        );
      }

      if (lastJsonMessage.type == "VIOLATION") {
        dispatch(
          violation({
            message: {
              type: "violation",
              timestamp: lastJsonMessage.timestamp,
              content: lastJsonMessage.content,
            },
          })
        );
      }

      if (lastJsonMessage.type == "BAN") {
        dispatch(logout());
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
      }*/
    }
    /* 
    /*
      if (lastJsonMessage.messageType === "LOG_ON") {
        const newUser = JSON.parse(lastJsonMessage.message);
        console.log("new User" + newUser);
        dispatch(add_user(newUser));
      }


      /*if (
        lastJsonMessage.messageType === "DISCONNECTION" ||
        lastJsonMessage.messageType === "ABUSE"
      ) {
        setConntectedUsers((users) =>
          users.filter((u) => u.id !== lastJsonMessage.message)
        );
      }*/
    /*} /*else {
      axios
        .get("/api/connected", { headers: authHeader(token) })
        .then((response) => {
          setConntectedUsers((users) => [
            ...users,
            ...response.data.filter((u) => u.id !== username),
          ]);
        });
    }*/
  }, [dispatch, lastJsonMessage]);

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
