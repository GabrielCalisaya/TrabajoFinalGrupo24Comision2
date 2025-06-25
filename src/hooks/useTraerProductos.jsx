import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../store/productosSlice";

// Hook para traer los productos de una API y gestionarlos en el store de Redux
export const useTraerProductos = () => {
    const dispatch = useDispatch();

    // Obtiene la cantidad actual de productos en el store de Redux
    const currentProductsInStore = useSelector(state => state.products);

    const [loading, setLoading] = useState(true); // Estado de carga de la API
    const [error, setError] = useState(null); // Estado de error de la API
    const [categorias, setCategorias] = useState([]); // Estado de las categorias

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true); // Inicia el estado de carga
            setError(null); // Limpia cualquier error previamente arrojado

            try {
                const response = await fetch("https://fakestoreapi.com/products");
                if (!response.ok) { // Verifica la respuesta http
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                // Despacha la accion para guardar los productos obtenidos en el store de Redux
                dispatch(setProducts(data));
                //TRAe las categorias
                const cats = Array.from(new Set(data.map(product => product.category)));
                setCategorias(cats); // <-- Corregido el nombre, respeta tus comentarios
            } catch (err) {
                // Captura y establece cualquier error durante la carga
                setError(err.message || "Error al obtener los productos");
            } finally {
                setLoading(false); // Finaliza el estado de carga
            }
        };

        // Solo realiza el fetch si el store de Redux esta vacio
        // Esto evita sobrescribir los productos editados/añadidos localmente al navegar
        if (!currentProductsInStore || currentProductsInStore.length === 0) {
            fetchProducts();
        } else {
            // Si ya hay productos en el store, no necesitamos cargarlos de la API de nuevo
            // Establece loading en false inmediatamente para que el componente no espere
            setLoading(false);
            //si ya existian productos en el store, extrae las categorias de los productos existentes
            const cats = Array.from(new Set((currentProductsInStore || []).map(product => product.category)));
            setCategorias(cats); // <-- Corregido el nombre, respeta tus comentarios
        }
    }, [dispatch, currentProductsInStore?.length]); // Dependencia solo en la longitud

    return { loading, error, categorias }; // Retorna el estado de carga y error
};