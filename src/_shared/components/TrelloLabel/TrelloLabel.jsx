import React from "react";
import style from "./TrelloLabel.module.css";

const TrelloLabel = ({ text, color }) => {
  const colorStyle = { background: color };

  return (
    <div className={style.labelContainer} style={colorStyle}>
      {text}
    </div>
  );
};

export default TrelloLabel;
