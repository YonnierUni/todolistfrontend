import React from "react";
import styles from "./ToDoList.module.css";
import { useState, useEffect, useContext } from "react";
import { baseUrl, appContext } from "../../../App";
import CardNote from "../../features/CardNote/CardNote";
import Modal from "../../features/Modal/Modal";

const ToDoList = () => {
  const [title, setTitle] = useState("ToDoList");
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState(null);
  const [noteId, setNoteId] = useState(null);
  const { currentUser, noteFilter } = useContext(appContext);

  const [openModal, setOpenModal] = useState(false);

  const openOrCloseModal = () => {
    setOpenModal(!openModal);
  };

  const getNotesByUserIsArchived = async (userId) => {
    fetch(`${baseUrl}/note/get-all-by-user-isarchived/${userId}/${noteFilter.isArchived}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        //authorization: currentUser.token,
      },
    })
      .then(function (res) {
        //console.log(res);
        return res.json();
      })
      .then(function (text) {
        setNotes(text);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getNoteByUser = async (userId, noteId) => {
    fetch(`${baseUrl}/note/get-by-user/${userId}/${noteId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        //authorization: currentUser.token,
      },
    })
      .then(function (res) {
        //console.log(res);
        return res.json();
      })
      .then(function (text) {
        console.log(text);
        console.log("text");

        setNote(text);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getNotesByCategoryIsArchived = async (userId, categoryId) => {
    fetch(`${baseUrl}/note/get-all-by-user-category-isarchived/${userId}/${categoryId}/${noteFilter.isArchived}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        //authorization: currentUser.token,
      },
    })
      .then(function (res) {
        //console.log(res);
        return res.json();
      })
      .then(function (text) {
        setNotes(text);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteNote = async (noteId) => {
    fetch(`${baseUrl}/note/delete-note-by-id/${noteId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        //authorization: currentUser.token,
      },
    })
      .then(function (res) {
        //console.log(res);
        return res.json();
      })
      .then(function (text) {
        if (noteFilter.categoryId != 0) {
          getNotesByCategoryIsArchived(1, noteFilter.categoryId, noteFilter.isArchived)
        } else {
          getNotesByUserIsArchived(1, noteFilter.isArchived);
        }
        setNotes(text);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateIsArchived = async (noteId, isArchived) => {
    fetch(`${baseUrl}/note/archive-note-by-id/${noteId}/${isArchived}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        //authorization: currentUser.token,
      },
    })
      .then(function (res) {
        //console.log(res);
        return res.json();
      })
      .then(function (text) {
        if (noteFilter.categoryId != 0) {
          getNotesByCategoryIsArchived(1, noteFilter.categoryId, noteFilter.isArchived)
        } else {
          getNotesByUserIsArchived(1, noteFilter.isArchived);
        }
        console.log(noteFilter.categoryId);
        setNote(text);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (noteFilter.categoryId != 0) {
      getNotesByCategoryIsArchived(1, noteFilter.categoryId, noteFilter.isArchived)
    } else {
      getNotesByUserIsArchived(1, noteFilter.isArchived);
    }
  }, [noteFilter.isArchived]);

  useEffect(() => {
    if (noteFilter.categoryId != 0) {
      getNotesByCategoryIsArchived(1, noteFilter.categoryId, noteFilter.isArchived)
    } else {
      getNotesByUserIsArchived(1, noteFilter.isArchived);
    }
    console.log(noteFilter.categoryId);
  }, [noteFilter.categoryId]);

  useEffect(() => {
    console.log(noteId);

    if (noteId && noteId != 0) {
      getNoteByUser(1, noteId);
    }
  }, [noteId]);
  return (
    <div className={styles.toDoList}>
      <hr></hr>
      {openModal ?
        <div>
          <Modal openModal={openModal} openOrCloseModal={openOrCloseModal} note={note} />
        </div>
        : <>
          <h4 className={styles.subTitle}>{title}</h4>
          <div className={styles.home__notes__grid}>
            {
              Array.isArray(notes) &&
              notes.map((note, index) => (
                <CardNote key={index} note={note} updateIsArchived={updateIsArchived} openOrCloseModal={openOrCloseModal} noteId={noteId} setNoteId={setNoteId} deleteNote={deleteNote} />
              ))
            }
          </div>
        </>}
    </div>

  );
};

export default ToDoList;