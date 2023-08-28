import React from "react";
import styles from "./MainSection.module.css";

const MainSection = ({ children }) => {
  return (
    <div className={styles.mainSection}>
      <div className={styles.super}>
        {children}
      </div>
    </div>
  );
};

export default MainSection;
