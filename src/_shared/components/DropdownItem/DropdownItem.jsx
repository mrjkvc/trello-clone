import styles from "./DropdownItem.module.css";

const DropdownItem = ({ icon, text, onClick, children }) => {
  return (
    <div className={styles.row} onClick={onClick}>
      {children}
      <p className={styles.marginLeftText}>{text}</p>
      <img className={styles.marginLeftIcon} img src={icon} alt="icon" />
    </div>
  );
};

export default DropdownItem;
