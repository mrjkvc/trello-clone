import React from "react";
import TextareaAutosize from "react-textarea-autosize";
import styles from "./CardForm.module.css";
import { useState } from "react";
import Button from "../Button/Button";
import closeImg from "../../../assets/images/close.svg";
import { useDispatch } from "react-redux";
import { addCard } from "../../../actions";

const CardForm = ({ listId }) => {
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const [taskText, setTaskText] = useState("");
  const handleChange = (event) => {
    setTaskText(event.target.value);
  };

  const handleClick = () => {
    console.log(taskText);
    setTaskText("");
    setShowForm(false);
  };

  const handleAddCard = () => {
    if (taskText) {
      dispatch(addCard(listId, taskText));
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
