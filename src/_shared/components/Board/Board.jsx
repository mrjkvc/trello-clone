import React from "react";
import styles from "./Board.module.css";
import loginHeaderCube from "../../../assets/images/Vector.svg";
const Board = ({ board, boardSelect }) => {
  const colorStyle = {
    0: styles.azure,
    1: styles.yellow,
    2: styles.green,
    3: styles.violet,
    4: styles.orange,
    5: styles.red,
    6: styles.mint,
    7: styles.pink,
  }[board.idOrganization % 8];
  return (
    <div
      className={styles.board}
      onClick={() => {
        boardSelect(board);
      }}
    >
      <div className={`${styles.header} ${colorStyle}`}></div>
      <img src={loginHeaderCube} className={styles.icon}></img>
      <label className={styles.label}>{board.name}</label>
    </div>
  );
};

export default Board;
