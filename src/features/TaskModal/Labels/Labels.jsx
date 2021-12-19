import React from "react";
import TrelloLabel from "../../../_shared/components/TrelloLabel/TrelloLabel";
import Avatar from "../../../_shared/components/TrelloLabel/TrelloLabel";
import styles from "./Labels.module.css";

const Labels = ({ labels }) => {
  return (
    <div className={styles.container}>
      <label className={styles.title}>LABELS</label>
      <div className={styles.members}>
        {labels &&
          labels.map((label, index) => (
            <TrelloLabel
              text={label.text}
              color={label.color}
              styleClass={styles.label}
            ></TrelloLabel>
          ))}
      </div>
    </div>
  );
};

export default Labels;
