import { useState } from "react";
import styles from "./Dropdown.module.css";
import arrowDownIcon from "../../../assets/images/arrowDown.svg";
import arrowUpIcon from "../../../assets/images/arrowUp.jpg";

import Avatar from "../Avatar/Avatar";

function Dropdown({ text, textClass, children }) {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);

  return (
    <div onClick={() => toggle(!open)}>
      <div className={styles.row}>
      <div className={styles.avatar}>
        <Avatar imageUrl='../../assets/images/preuzmi.jfif' size="m" shape="circle"></Avatar>
      </div>
      </div>
      {open && <div className={styles.dropdownContainer}>{children}</div>}
    </div>
  );
}

export default Dropdown;
