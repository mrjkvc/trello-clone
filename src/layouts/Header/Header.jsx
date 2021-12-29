import HeaderDropdown from "../../features/HeaderDropdown/HeaderDropdown";
import styles from "./Header.module.css";
import Logo from "../../features/Logo/Logo";
import { useNavigate } from "react-router";

const Header = (props) => {
  const navigate = useNavigate();
  return (
    <div className={styles.headerContainer}>
      <Logo onClick={() => navigate("/home/")}></Logo>
      <HeaderDropdown></HeaderDropdown>
    </div>
  );
};

export default Header;
