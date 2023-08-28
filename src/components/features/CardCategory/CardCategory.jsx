import React from "react";
import styles from "./CardCategory.module.css";
import { useState, useContext, useEffect } from "react";
import { baseUrl, appContext } from "../../../App";
import { FaTag } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";

const CardCategory = ({ category, deleteCategory }) => {

    return (
        <div className={styles.cardCategoryContent}>
            <div className={styles.cardIcon}>

                <FaTag />
            </div>

            <h2>{category && category.name}</h2>

            <div className={styles.cardButtonContent}>
                <button className="evenboxinner"

                    onClick={() => {
                        deleteCategory(category.id);
                    }}
                    type={"button"}
                >
                    <FaTimes size={20} />
                </button>
            </div>
        </div>
    );
};

export default CardCategory;
