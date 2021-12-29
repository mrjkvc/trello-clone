import React from "react";
import TextareaAutosize from "react-textarea-autosize";
import styles from "./CardForm.module.css";
import { useState } from "react";
import Button from "../Button/Button";
import closeImg from "../../../assets/images/close.svg";
import { useDispatch } from "react-redux";
import { add_card } from "../../../redux/board";
import { addCard } from "../../../redux/board";

const CardForm = ({ listId, sendJsonMessage }) => {
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const [taskText, setTaskText] = useState("");
  const handleChange = (event) => {
    setTaskText(event.target.value);
  };

  const handleClick = () => {
    setTaskText("");
    setShowForm(false);
  };

  const sendMessageViaSocket = (message) => {
    sendJsonMessage(message);
  };

  const handleAddCard = () => {
    if (taskText) {
      dispatch(
        addCard({
          card: { listId, name: taskText },
          sendMessage: sendMessageViaSocket,
        })
      );
    }
    setShowForm(false);
  };

  return (
    <>
      {showForm && (
        <div className={styles.container}>
          <div className={styles.inputContainer}>
            <TextareaAutosize
              placeholder="Enter a title for this card"
              onChange={(e) => handleChange(e)}
              onBlur={() => setShowForm(false)}
              autoFocus
              minRows={4}
              className={styles.input}
            ></TextareaAutosize>
          </div>
          <div className={styles.footerContainer}>
            <Button
              onMouseDown={handleAddCard}
              text={"+ Add card"}
              colorStyle={styles.addCardButton}
              disabled={false}
            ></Button>
            <Button
              text={"× Cancel"}
              onClick={handleClick}
              colorStyle={styles.cancelCardButton}
              disabled={false}
            ></Button>
          </div>
        </div>
      )}
      {!showForm && (
        <Button
          colorStyle={styles.newCardButton}
          text={"+"}
          disabled={false}
          onClick={() => setShowForm(true)}
        ></Button>
      )}
    </>
  );
};

export default CardForm;
