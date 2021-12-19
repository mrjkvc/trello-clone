import React from "react";
import styles from "./Board.module.css";
import loginHeaderCube from "../../../assets/images/Vector.svg";
const Board = ({ board, boardSelect }) => {
  return (
    <div
      className={styles.board}
      onClick={() => {
        boardSelect(board);
      }}
    >
      <div className={styles.header}></div>
      <img src={loginHeaderCube} className={styles.icon}></img>
      <label className={styles.label}>{board.name}</label>
    </div>
  );
};

export default Board;
