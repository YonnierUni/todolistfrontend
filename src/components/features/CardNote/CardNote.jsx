import React from "react";
import styles from "./CardNote.module.css";
import { useState, useContext, useEffect } from "react";
import { FaStickyNote } from "react-icons/fa";
import { FaArchive } from "react-icons/fa";
import { FaUpload } from "react-icons/fa";
import { FaPen } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";

const CardNote = ({ note, updateIsArchived, openOrCloseModal, noteId, setNoteId, deleteNote }) => {

    return (
        <div className="box box2">
            <div className={styles.cardIcon}>
                <FaStickyNote size={100} />
            </div>
            <div className={styles.cardContent}>
                <div className={styles.cardContentInfo}>
                    <h2>{note.title}</h2>
                    {note.modifyDate ?
                        <h2>Last Edit: {note.modifyDate.slice(0, 10)}</h2>
                        :
                        <h2>Last Edit: {note.createDate.slice(0, 10)}</h2>
                    }
                </div>
                <div className={styles.cardButtonContent}>
                    <button className="evenboxinner"
                        onClick={() => {
                            updateIsArchived(note.id, !note.archived);
                        }}
                        type={"button"}
                    >
                        {note.archived ? <FaUpload /> : <FaArchive />}


                    </button>
                    <button className="evenboxinner"
                        onClick={() => {
                            setNoteId(note.id);
                            openOrCloseModal();

                        }}>
                        <FaPen />
                    </button>
                    <button className="evenboxinner"
                        onClick={() => {
                            deleteNote(note.id);
                        }}
                        type={"button"}
                    >
                        <FaTrashAlt />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CardNote;
