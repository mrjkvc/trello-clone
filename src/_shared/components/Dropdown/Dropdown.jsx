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
          <Avatar
            imageUrl="https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F20%2F2021%2F02%2F10%2FJustin-Bieber_MaryEllenMatthews--2000.jpeg&q=85"
            size="m"
            shape="circle"
          ></Avatar>
        </div>
      </div>
      {open && <div className={styles.dropdownContainer}>{children}</div>}
    </div>
  );
}

export default Dropdown;
