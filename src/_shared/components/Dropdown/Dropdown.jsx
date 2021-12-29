import { useState } from "react";
import styles from "./Dropdown.module.css";

function Dropdown({ text, textClass, children, item, addedStyle }) {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);

  return (
    <div>
      <div className={styles.row}>
        <div className={styles.avatar} onClick={() => toggle(!open)}>
          {item}
        </div>
      </div>
      {open && (
        <div className={`${styles.dropdownContainer} ${addedStyle}`}>
          {children}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
