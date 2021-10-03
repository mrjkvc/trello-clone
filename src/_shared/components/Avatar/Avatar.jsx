import React from "react";
import styles from "./Avatar.module.css";

const Avatar = ({imageUrl, size, shape}) => {
  const sizeStyle = {
    s: styles.s,
    m: styles.m,
    l: styles.l
  }[size];

  const shapeStyle = {
    circle: styles.circle,
    rectangle: styles.rectangle
  }[shape];


  return <div className={styles.container}>
      <img src='https://media.allure.com/photos/5ff098c73f61081ff7d20413/1:1/w_1800,h_1800,c_limit/justin-bieber-lede.jpg' alt="icon" className={`${sizeStyle} ${shapeStyle}`}/>
  </div>;
};

export default Avatar;
