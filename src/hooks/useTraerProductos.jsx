import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setProducts } from "../store/productosSlice";
// hook para traer los productos
export const useTraerProductos = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // se usa try y catch para capturar errores y el loading en la llamada a la API
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await fetch("https://fakestoreapi.com/products");
                const data = await response.json();
                dispatch(setProducts(data));
            } catch (err) {
                setError(err.message || "Error al obtener los productos");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return { loading, error };
};