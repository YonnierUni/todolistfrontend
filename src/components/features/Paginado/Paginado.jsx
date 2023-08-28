import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import styles from "./Paginado.module.css";

const Paginado = ({
  arrayOriginal,
  currentPage,
  setCurrentPage,
  itemsPerPage,
  cantidadElementos,
  setCantidadElementos,
}) => {
  let pages = 1;

  const [renderPages, setRenderPages] = useState([]);
  useEffect(() => {
    console.log("cantidadElementos");
    console.log(cantidadElementos);
    if (cantidadElementos > 0) {
      generatePages();
    }
  }, [cantidadElementos]);

  const generatePages = () => {
    let temp = [];

    if (cantidadElementos > 0) {
      pages = Math.ceil(cantidadElementos / itemsPerPage);
    }
   
    for (let i = 1; i <= pages; i++) {
      console.log(pages);
      temp.push(i);
    }
    setRenderPages([...temp]);
  };

  function sele(index) {
    console.log(index);
    setCurrentPage(index);
  }
  return (
    <div className={styles.pages}>
      {Array.isArray(renderPages) &&
        renderPages.map((page, index) => (
          (((index+1) > (currentPage-3) && (index+1) < (currentPage+3) && 
          <button
          className={currentPage===(index+1)&&styles.selected}
          onClick={() => {
            sele(index + 1);
          }}
        >
          {index + 1}
        </button> ))
          
        ))}
    </div>
  );
};

export default Paginado;
