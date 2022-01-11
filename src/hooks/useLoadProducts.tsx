import { useEffect, useState } from 'react'
import { ToastAndroid } from 'react-native';
import { apiTienda } from '../api/apiTienda';
import { Producto, Productos } from '../Types/interfaces';

export const useLoadProducts = () => {

    const [productos, setProductos] = useState<Producto[]>([] as Producto[]);

    const [productosFilter, setProductosFilter] = useState<Producto[]>([] as Producto[]);

    const [checking, setchecking] = useState<boolean>(true);

    const getProductos = async () => {

        let ToastError: string = "";

        try {

            let res = await apiTienda.post<Productos>('/listar_productos');

            let { data, message, success } = res.data;

            ToastError = message;

            if (!success) {
                ToastAndroid.show(ToastError, 1000);
                return;
            }

            setProductos(data);
            setProductosFilter(data);
            setchecking(false);

        } catch (error) {

            setchecking(false);
            ToastAndroid.show(ToastError, 1000);
            console.log("Error Hooks: LoadProducts");

            return;
        }

    }

    useEffect(() => {

        getProductos();

    }, []);

    const HadleChangeSearch = (text: string) => {

        if (text.length === 0) {
            setProductosFilter(productos);
            return;
        }

        let data = productos.filter((item) => item.nombre.toLowerCase().includes(text.toLowerCase()));
        setProductosFilter(data);

    }

    return {
        productos,
        productosFilter,
        checking,
        HadleChangeSearch,
        setProductosFilter
    }
}
