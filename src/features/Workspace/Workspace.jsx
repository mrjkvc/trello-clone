import React from "react";
import Board from "../../_shared/components/Board/Board";
import styles from "./Workspace.module.css";
const Workspace = ({ name, boards, boardSelect }) => {
  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}></div>
      <div className={styles.boardsContainer}>
        {boards &&
          boards.map((board, index) => (
            <Board boardSelect={boardSelect} board={board}></Board>
          ))}
      </div>
    </div>
  );
};

export default Workspace;
