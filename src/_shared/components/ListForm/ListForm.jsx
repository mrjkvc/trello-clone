import React from "react";
import TextareaAutosize from "react-textarea-autosize";
import styles from "./ListForm.module.css";
import { useState } from "react";
import Button from "../Button/Button";
import { useDispatch } from "react-redux";
import { addList } from "../../../actions";

const ListForm = () => {
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const [listName, setListName] = useState("");

  const handleChange = (event) => {
    setListName(event.target.value);
  };

  const handleClick = () => {
    console.log(listName);
    setShowForm(false);
  };

  const handleAddList = () => {
    if (listName) {
      dispatch(addList(listName));
    }
    setShowForm(false);
  };

  return (
    <>
      {showForm && (
        <div className={styles.container}>
          <TextareaAutosize
            placeholder="Enter list title"
            onChange={(e) => handleChange(e)}
            onBlur={() => setShowForm(false)}
            autoFocus
            className={styles.input}
          ></TextareaAutosize>
          <div className={styles.footerContainer}>
            <Button
              onMouseDown={handleAddList}
              text={"+ Add list"}
              colorStyle={styles.addCardButton}
              disabled={false}
            ></Button>
            <Button
              onClick={handleClick}
              text={"× Cancel"}
              colorStyle={styles.cancelCardButton}
              disabled={false}
            ></Button>
          </div>
        </div>
      )}
      {!showForm && (
        <Button
          colorStyle={styles.newListButton}
          text={"+"}
          disabled={false}
          onClick={() => {
            setShowForm(true);
          }}
        ></Button>
      )}
    </>
  );
};

export default ListForm;
