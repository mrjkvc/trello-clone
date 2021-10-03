import Dropdown from "../../_shared/components/Dropdown/Dropdown";
import DropdownItem from "../../_shared/components/DropdownItem/DropdownItem";

import styles from "./HeaderDropdown.module.css";
import logoutIcon from "../../assets/images/logoutIcon.svg";

const HeaderDropdown = () => {
  return (
    <div className={styles.row}>
      <Dropdown text="Marija" textClass={styles.text}>
        <DropdownItem
          icon={logoutIcon}
          text="Logout"
          onClick={() => console.log("klik")}
        ></DropdownItem>
      </Dropdown>
    </div>
  );
};

export default HeaderDropdown;
