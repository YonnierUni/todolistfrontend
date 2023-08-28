import React from "react";
import styles from "./Modal.module.css";
import { useState, useContext, useEffect } from "react";
import CardCategory from "../CardCategory/CardCategory";
import { baseUrl, appContext } from "../../../App";

const Modal = ({ openModal, openOrCloseModal, note }) => {
    const [inputs, setInputs] = useState({
        id: note ? note.id : "",
        title: note ? note.tittle : "",
        content: note ? note.content : "",
        createDate: note ? note.createDate : null,
        modifyDate: note ? note.modifyDate : null,
        categories: note ? note.categories : [],
        archived: note ? note.archived : false,
        user: note ? note.user : {}
    });
    const [categoriesData, setCategoriesData] = useState();
    const [selectedCategory, setSelectedCategory] = useState({ id: 0 });
    const [selectedCategoryData, setSelectedCategoryData] = useState({ id: 0, name: "", description: "" });

    const getAllCategoryByUser = async (userId) => {
        fetch(`${baseUrl}/category/get-all-by-user/${userId}`, {
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
            .then(function (categories) {
                //debugger

                setCategoriesData(categories);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const crearNote = async (evento) => {
        evento.preventDefault();
        const user = {
            "id": 1
        };
        const note = inputs;
        note.user = user;

        setInputs({
            ...inputs, user: user
        });

        await fetch(`${baseUrl}/note/save-note`, {
                  method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(note),
        });
        window.location.href = "/todolist?isArchived=false";
    };

    useEffect(() => {
        setInputs(note);
    }, [note]);

    useEffect(() => {
        getAllCategoryByUser(1);
    }, [inputs]);


    const deleteCategory = (id) => {
        const filterCategories = inputs.categories.filter(category => category.id != id);
        setInputs({ ...inputs, categories: filterCategories });
    };

    function handleInputs(e) {
        e.preventDefault();
        console.log("e.target.value");
        console.log(e.target.value);

        if (!inputs.categories.find(category => category.id == e.target.value)) {
            setSelectedCategory({ ...selectedCategory, [e.target.name]: e.target.value });

            const category = categoriesData.find(category => category.id == e.target.value);

            console.log("category");
            console.log(category);

            const categoryAdd = inputs.categories;
            categoryAdd.push(category);

            setInputs({ ...inputs, categories: categoryAdd });
        } else {
            window.alert("Already exist the category");
        }
    }
    if (!openModal) return null;

    return (
        <div className={styles.modalContainer}>

            <div className={styles.modalContent}>
                <h1>Edit note</h1>

                <form
                    onSubmit={(evento) => {
                        crearNote(evento);
                    }}
                    className={styles.formContainer}
                >
                    {note ?
                        <>
                            <div>
                                <div className={styles.buttonbox4}>
                                    <label
                                        className={styles.textLabel}
                                    >Title</label>
                                    <input
                                        className={styles.evenboxinnerModi}
                                        type={"text"}
                                        value={inputs && inputs.title}
                                        onChange={(evento) => {
                                            setInputs({ ...inputs, title: evento.target.value });
                                        }}
                                    />
                                </div>
                            </div>
                            <div>
                                <div className={styles.buttonbox4}>

                                    <label className={styles.textLabel}
                                    >Content</label>
                                    <input
                                        className={styles.evenboxinnerModi}
                                        type={"text"}
                                        value={inputs && inputs.content}
                                        onChange={(evento) => {
                                            setInputs({ ...inputs, content: evento.target.value });
                                        }}
                                    />
                                </div>
                            </div>
                            <div>
                                <div className={styles.buttonbox4}>
                                    <label className={styles.textLabel}
                                    >Categories</label>
                                </div>

                                <div className={styles.modal__categories__grid}>
                                    {
                                        Array.isArray(inputs && inputs.categories) &&
                                        inputs.categories.map((category, index) => (
                                            <CardCategory category={category} deleteCategory={deleteCategory} />
                                        ))
                                    }
                                </div>
                            </div>
                            <div>
                                <div className={styles.selectCategory}>
                                    <select name="id" onChange={handleInputs}
                                        className={styles.evenboxinnerModiSelect}
                                        value={selectedCategory}>
                                        <option key={0} value={0} >
                                            Select Category
                                        </option>
                                        {
                                            Array.isArray(categoriesData) &&
                                            categoriesData.map((category, index) => (
                                                <option id={index} key={index} value={category.id}>
                                                    {category.name}
                                                </option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>
                        </> :
                        <>
                        </>
                    }
                    <div>
                        <input className={styles.evenboxinnerModiSelect}
                            value={"enviar"} type={"submit"} />
                        <button className={styles.evenboxinnerModiSelect}
                            onClick={() => {
                                //setNoteId(note.id);
                                openOrCloseModal();
                            }}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default Modal;
