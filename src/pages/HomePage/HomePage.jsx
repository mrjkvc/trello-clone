import React from "react";
import Workspace from "../../features/Workspace/Workspace";
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
import loadingImage from "../../assets/images/loadingimage.svg";

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { boards, status } = useSelector((state) => state.organization);
  const id = localStorage.getItem("id");

  const boardSelect = (board) => {
    navigate("/board/" + board.id);
  };

  useEffect(() => {
    dispatch(getBoards(id));
  }, [id, dispatch]);

  /**/
  return (
    <div className={styles.contentContainer}>
      <div className={styles.workspaceContainer}>
        <div className={styles.imageTopContainer}>
          <div className={styles.wrapper}>
            <img className={styles.slideTop} src={topCat}></img>
          </div>
        </div>

        <div className={styles.imageBottomContainer}>
          <div className={styles.wrapper}>
            <img src={bottomCat} className={styles.slideBottom}></img>
          </div>
        </div>
        {status != "idle" && <img src={loadingImage} alt="LOADING"></img>}
        {status == "idle" &&
          boards &&
          Object.entries(boards).map(([k, boards], key) => (
            <Workspace
              boardSelect={boardSelect}
              name={k}
              boards={boards}
              key={key}
            ></Workspace>
          ))}
      </div>
    </div>
  );
};

export default HomePage;
