import React from "react";
import styles from "./Avatar.module.css";

const Avatar = ({
  imageUrl = "https://media.allure.com/photos/5ff098c73f61081ff7d20413/1:1/w_1800,h_1800,c_limit/justin-bieber-lede.jpg",
  size,
  shape,
}) => {
  const sizeStyle = {
    s: styles.s,
    m: styles.m,
    l: styles.l,
  }[size];

  const shapeStyle = {
    circle: styles.circle,
    rectangle: styles.rectangle,
  }[shape];

  return (
    <img src={imageUrl} alt="icon" className={`${sizeStyle} ${shapeStyle}`} />
  );
};

export default Avatar;
