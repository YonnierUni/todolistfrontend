import React from "react";
import Navbar from "../Navbar/Navbar";
import { AiOutlineWhatsApp, AiOutlineSearch } from "react-icons/ai";
import { BsFillTelephoneFill } from "react-icons/bs";
import styles from "./Header.module.css";
import { Link, Navigate } from "react-router-dom";
import { baseUrl, appContext } from "../../../App";
import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import Modal from "../../features/Modal/Modal";


const Header = () => {
  const { noteFilter, setNoteFilter } = useContext(appContext);
  const [categories, setCategories] = useState([]);

  const [isArchivedUse, setIsArchivedUse] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState({ categoryId: 0 });

  const navigate = useNavigate();

  const [note, setNote] = useState({
    title: "",
    content: "",
    categories: [],
    user: ""
  });

  const [openModal, setOpenModal] = useState(false);

  const openOrCloseModal = () => {
    setOpenModal(!openModal);
  };

  useEffect(() => {
    if (isArchivedUse) {
      navigate(`/todolist?isArchived=${noteFilter.isArchived}`)
      setIsArchivedUse(false);
    }
  }, [isArchivedUse]);

  const getCategoriesByUserId = async (userId) => {
    fetch(`${baseUrl}/category/get-all-by-user/${userId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        //authorization: currentUser.token,
      },
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (text) {
        setCategories(text);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getCategoriesByUserId(1);
  }, []);

  function handleInputs(e) {

    e.preventDefault();
    setSelectedCategory({ ...selectedCategory, [e.target.name]: e.target.value });
    setNoteFilter({ ...noteFilter, [e.target.name]: e.target.value });

  }
  return (

    <div className={styles.header}>
      <Navbar />
      <div className={styles.header__First}>
        <h1>To Do List</h1>

        <button className={styles.evenboxinnerModi}
          onClick={() => {
            openOrCloseModal();
          }}
          type={"button"}
        >
          Create Note
        </button>

        <Modal openModal={openModal} openOrCloseModal={openOrCloseModal} note={note} />

        <button className={styles.evenboxinnerModi}
          onClick={() => {
            setIsArchivedUse(!isArchivedUse);
            setNoteFilter({ ...noteFilter, "isArchived": !noteFilter.isArchived, "categoryId": noteFilter.categoryId });
          }}
          type={"button"}
        >
          Archived Notes
        </button>
      </div>
      <div className={styles.header__Second}>
        <h4>Category filter</h4>
        <select name="categoryId" onChange={handleInputs}
          className={styles.evenboxinnerModi}
          value={selectedCategory.categoryId}>
          <option key={0} value={0} >
            Select Category
          </option>
          {
            Array.isArray(categories) &&
            categories.map((category, index) => (
              <option id={index} key={index} value={category.id}>
                {category.name}
              </option>
            ))
          }
        </select>
      </div>
    </div>
  );
};

export default Header;
