import React from "react";
import LoginUserForm from "../../features/LoginUserForm/LoginUserForm";
import styles from "./LoginUser.module.css";
import { useState } from "react";
const LoginUser = () => {
  const [dialogText, setDialogText] = useState("");
  return (
    <div className={styles.loginUser}>
      <hr></hr>
      <h4 className={styles.subTitle}>Log in to your account</h4>
      <LoginUserForm setDialogText={setDialogText} />
    </div>
  );
};

export default LoginUser;
