import styles from "./LoginHeader.module.css";
import loginHeaderCube from "../../assets/images/Vector.svg";

const LoginHeader = ({ text }) => {
  return (
    <div className={styles.rowStyle}>
      <img src={loginHeaderCube} className={styles.icon}></img>
      <label className={styles.textStyle}>{text}</label>
    </div>
  );
};

export default LoginHeader;
