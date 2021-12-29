import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import bottomCat from "../../assets/images/dole.svg";
import topCat from "../../assets/images/gore.svg";
import loadingImage from "../../assets/images/loadingimage.svg";
import Workspace from "../../features/Workspace/Workspace";
import { getBoards } from "../../redux/organization";
import styles from "./HomePage.module.css";

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
        {status != "idle" && (
          <img
            src={loadingImage}
            className={styles.loadingImage}
            alt="LOADING"
          ></img>
        )}

        <div className={styles.scrollContainer}>
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
    </div>
  );
};

export default HomePage;
