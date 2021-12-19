import React from "react";
import Board from "../../_shared/components/Board/Board";
import styles from "./Workspace.module.css";
const Workspace = ({ workspace, boardSelect }) => {
  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <div className={styles.nameLabel}>{workspace.name}</div>
      </div>
      <div className={styles.boardsContainer}>
        {workspace.boards &&
          workspace.boards.map((board, index) => (
            <Board boardSelect={boardSelect} board={board}></Board>
          ))}
      </div>
    </div>
  );
};

export default Workspace;
