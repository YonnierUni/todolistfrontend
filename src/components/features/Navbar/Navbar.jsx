import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import styles from "./Navbar.module.css";
import { appContext } from "../../../App";
import { getUserData, logOut } from "../../services/userServices";
import { useState, useEffect, useContext } from "react";

const Navbar = () => {
  const { currentUser, setCurrentUser } = useContext(appContext);
  const navigate = useNavigate();
  const { noteFilter, setNoteFilter } = useContext(appContext);
  const [isArchivedUse, setIsArchivedUse] = useState(false);

  useEffect(() => {
    navigate(`/todolist?isArchived=${noteFilter.isArchived}`)
  }, [isArchivedUse]);

  useEffect(() => {
    //setCurrentUser(getUserData());

    console.log("el usuario es ", currentUser);
  }, []);

  useEffect(() => { }, [currentUser]);

  return (
    <div className={styles.navbar}>
      <ul className={styles.navbar__leftItems}>
        <Link to={"/todolist"}>
          <span> Inicio To-Do List</span>
        </Link>
      </ul>
      <ul className={styles.navbar__rightItems}>
        {currentUser ? (
          <></>
        ) : (
          <>
            <li>
              <Link to={"/loginUser"} >Iniciar sesion</Link>
            </li>
            <li>
              <Link
                onClick={() => {
                  setIsArchivedUse(!isArchivedUse);
                  setNoteFilter({ ...noteFilter, "isArchived": false, "categoryId": noteFilter.categoryId });
                }}
              >
                To-Do List
              </Link>
            </li>

          </>
        )}

        <li className={styles.navbar__rightItems__submenu}>
          {currentUser ? (
            <>
              <span>
                <BiUserCircle />
                {currentUser?.nombres?.split(" ")[0]}
              </span>
              <ul>
                {currentUser.rol && currentUser.rol.id < 3 && (
                  <>
                    <button className={styles.button}
                      onClick={() => {
                        setIsArchivedUse(!isArchivedUse);
                        setNoteFilter({ ...noteFilter, "isArchived": false, "categoryId": noteFilter.categoryId });
                      }}
                      type={"button"}
                    >
                      To-Do List
                    </button>
                  </>
                )}
              </ul>
            </>
          ) : (
            <Link to={"/crearUsuario"}>Crear usuario</Link>
          )}
        </li>
        {currentUser ? (
          <li>
            <span
              onClick={() => {
                logOut();
                setCurrentUser(null);
                navigate("/home");
              }}
            >
              Cerrar sesion
            </span>
          </li>
        ) : (
          ""
        )}
      </ul>
    </div>
  );
};

export default Navbar;
