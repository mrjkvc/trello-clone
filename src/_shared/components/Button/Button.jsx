import React from "react";
import styles from "./Button.module.css";

const Button = ({
  text,
  colorStyle,
  onClick = () => console.log("click"),
  inputType = "button",
  onSubmit = () => console.log(""),
  onMouseDown = () => {},
  disabled = false,
}) => {
  return (
    <button
      type={inputType}
      className={`${styles.buttonOutline} ${colorStyle}`}
      onClick={onClick}
      onMouseDown={onMouseDown}
      onSubmit={onSubmit}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
