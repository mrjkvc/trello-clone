import styles from "./DropdownItem.module.css";

const DropdownItem = ({icon, text, onClick}) => {
    return (
        <div className={styles.row} onClick={onClick}>
            <img className={styles.marginLeftIcon} img src={icon} alt="icon"/>
            <p className={styles.marginLeftText}>{text}</p>
        </div>
    );
};

export default DropdownItem;
