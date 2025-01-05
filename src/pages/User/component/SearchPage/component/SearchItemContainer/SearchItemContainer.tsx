import { ReactNode } from "react";
import styles from "./style.module.css";

const SearchItemContainer: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return <div className={styles.IntroSearchItem}>{children}</div>;
};

export default SearchItemContainer;
