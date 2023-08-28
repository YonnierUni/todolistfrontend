import React from "react";
import LoginUserForm from "../../features/LoginUserForm/LoginUserForm";
import styles from "./LoginUser.module.css";
import { useState } from "react";
const LoginUser = () => {
  const [dialogText, setDialogText] = useState("");
  return (
    <div className={styles.loginUser}>
      <hr></hr>
      <h4 className={styles.subTitle}>Iniciar sesion con su cuenta</h4>
      <LoginUserForm setDialogText={setDialogText} />
    </div>
  );
};

export default LoginUser;
