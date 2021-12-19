import React from "react";
//import Workspace from "../../features/Workspace/Workspace";
import styles from "./HomePage.module.css";
import Board from "../../_shared/components/Board/Board";
import { useNavigate } from "react-router";
//import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getBoards } from "../../redux/organization";
import topCat from "../../assets/images/gore.svg";
import bottomCat from "../../assets/images/dole.svg";

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { boards } = useSelector((state) => state.organization);
  const id = localStorage.getItem("id");

  const boardSelect = (board) => {
    navigate("/board/" + board.id);
  };

  useEffect(() => {
    dispatch(getBoards(id));
  }, [id, dispatch]);

  /*<img src={topCat} className={styles.imageTop}></img>
        <img src={bottomCat} className={styles.imageBottom}></img>*/
  return (
    <div className={styles.contentContainer}>
      <div className={styles.workspaceContainer}>
        {boards &&
          boards.map((board, index) => (
            /*<Workspace
            boardSelect={boardSelect}
            workspace={workspace}
          ></Workspace>*/
            <Board boardSelect={boardSelect} board={board} key={index}></Board>
          ))}
      </div>
    </div>
  );
};

export default HomePage;
