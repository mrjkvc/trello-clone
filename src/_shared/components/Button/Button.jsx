import React from "react";
import styles from "./Button.module.css";

const Button = ({
  text,
  colorStyle,
  onClick,
  inputType = "button",

  onMouseDown = () => {},
  disabled = false,
}) => {
  return (
    <button
      type={inputType}
      className={`${styles.buttonOutline} ${colorStyle}`}
      onClick={onClick}
      onMouseDown={onMouseDown}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
