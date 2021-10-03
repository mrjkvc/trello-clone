import React from "react";
import style from "./TrelloLabel.module.css";

const TrelloLabel = ({ text, color }) => {

  const colorStyle = {
    red: style.red,
    green: style.green,
    violet: style.violet,
    orange: style.orange,
    yellow: style.yellow,
    mint: style.mint,
    pink: style.pink,
    azure: style.azure
  }[color];

  return (
    <div
      className={`${style.labelContainer} ${colorStyle
        }`}
    >
      {text}
    </div>
  );
};

export default TrelloLabel;
