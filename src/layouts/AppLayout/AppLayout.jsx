import styles from "./AppLayout.module.css";
import Header from "../Header/Header";

const AppLayout = ({ children }) => {
  return (
    <div className={styles.layoutContainer}>
      <div className={styles.colContainer}>
        <div className={styles.headerContainer}>
          <Header />
        </div>
        <div className={styles.contentContainer}>{children}</div>
      </div>
    </div>
  );
};

export default AppLayout;
