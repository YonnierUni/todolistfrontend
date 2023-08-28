import React from "react";
import styles from "./Home.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Paginado from "../../features/Paginado/Paginado";
import { baseUrl } from "../../../App";
import ToDoList from "../ToDoList/ToDoList";

const Home = () => {
  const navigate = useNavigate();

  const [productos, setProductos] = useState([]);
  const [cantidadElementos, setCantidadElementos] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  const cargarProductos = async (currentPage, itemsPerPage) => {
    let consul = {
      currentPage,
      itemsPerPage,
    };
    console.log("funcion cargarproductos con productosPagina");

    const respons = await fetch(`${baseUrl}/producto/nPaginadoProductos`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(consul),
    });
    const Productoss = await respons.json();
    console.log(Productoss);
    setProductos(Productoss);
  };

  const [ruta1, setRuta1] = useState(1);

  const [imagenes1, setImagenes1] = useState({ imagenes: [] });

  const cargarImagenesPublicidad = async () => {
    let consul1 = {
      imagenes: [],
    };

    const respons = await fetch(`${baseUrl}/public/getAllPublic`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (text) {
        const ImagenesPublicidad = text;

        consul1.imagenes.push(text.imagen);

      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
   /* cargarCantidadProductosPaginado();
    cargarImagenesPublicidad();
    */
  }, []);

  return (
    <div className={styles.home}>
      <div className={styles.modal}>
      
      </div>

      <div className={styles.home__products__grid}>
        {Array.isArray(productos) &&
          productos.map((prod, index) => (
            <ToDoList
              product={prod}
              onClick={() => {
                navigate("/ToDoList/" + prod.id);
              }}
            />
          ))}
      </div>
      
      <div className={styles.home__paginate}>
        {cantidadElementos > 0 && (
          <Paginado
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            itemsPerPage={itemsPerPage}
            cantidadElementos={cantidadElementos}
            setCantidadElementos={setCantidadElementos}
          />
        )}
      </div>

    </div>
  );
};

export default Home;
