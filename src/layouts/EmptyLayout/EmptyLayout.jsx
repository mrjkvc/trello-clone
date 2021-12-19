import styles from './EmptyLayout.module.css';

const EmptyLayout = ({ children }) => {
   return <div className={styles.layoutContainer}>{children}</div>;
};

export default EmptyLayout;
