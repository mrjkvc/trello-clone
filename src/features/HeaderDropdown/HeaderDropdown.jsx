import Dropdown from "../../_shared/components/Dropdown/Dropdown";
import DropdownItem from "../../_shared/components/DropdownItem/DropdownItem";

import styles from "./HeaderDropdown.module.css";
import logoutIcon from "../../assets/images/canvas.png";
import Avatar from "../../_shared/components/Avatar/Avatar";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

const HeaderDropdown = () => {
  const navigate = useNavigate();
  const { member } = useSelector((state) => state.organization);
  return (
    <div className={styles.row}>
      <Dropdown
        addedStyle={styles.container}
        text="Marija"
        textClass={styles.text}
        item={
          <Avatar
            imageUrl={member.avatarSource}
            size="m"
            shape="circle"
          ></Avatar>
        }
      >
        <DropdownItem
          icon={logoutIcon}
          text="Logout"
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("id");
            navigate("/login");
          }}
        ></DropdownItem>
      </Dropdown>
    </div>
  );
};

export default HeaderDropdown;
