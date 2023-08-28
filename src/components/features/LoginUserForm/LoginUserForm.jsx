import React from "react";
import styles from "./LoginUserForm.module.css";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { appContext } from "../../../App";
import { useState, useContext } from "react";
import { logIn } from "../../services/userServices";
import { baseUrl } from "../../../App";


const LoginUserForm = ({ setDialogText }) => {
  const { currentUser, setCurrentUser } = useContext(appContext);
  const [revealPassword, setRevealPassowrd] = useState(false);
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    correo: "",
    contrasena: "",
  });

  function iniciarSesion(e) {
    e.preventDefault();
    fetch(`${baseUrl}/usuario/loginUser`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputs),
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (token) {
        console.log(token);
        if (token.token != null) {
          logIn(token);
          setCurrentUser(token);
          navigate("../home");
        }
        if (token.ms != null) {
          setDialogText(token.ms);
        }
      })
      .catch((error) => {
        setDialogText("error ", error);
        console.log(error);
      });
  }
  function handleInputs(e) {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  }

  return (
    <form
      onSubmit={(e) => {
        iniciarSesion(e);
      }}
      className="box box1"
    >
      <div className={styles.formContent}>
        <div className="oddboxinner">
          <span>Direccion correo</span>
          <div className={styles.buttonbox4}>
            <input className={styles.evenboxinnerModi} name="correo" type={"email"} onChange={handleInputs} />
          </div>
        </div>
        <div className="oddboxinner">
          <span>Contraseña</span>
          <div className={styles.buttonbox4}>
            <input
              className={styles.evenboxinnerModi}
              name="contrasena"
              onChange={handleInputs}
              type={revealPassword ? "text" : "password"}
            />
            <button
              className="evenboxinner"
              onClick={() => {
                setRevealPassowrd(!revealPassword);
              }}
              type={"button"}
            >
              {revealPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
            </button>
          </div>
        </div>
        <button
          className={styles.evenboxinnerModiLogIn}
          onClick={() => {
            setRevealPassowrd(!revealPassword);
          }}
          type={"button"}
        >
          Sign In
        </button>
      </div>
    </form>
  );
};

export default LoginUserForm;
