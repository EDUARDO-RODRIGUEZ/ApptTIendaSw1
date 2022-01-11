import React, { useContext, useEffect, useState } from 'react'
import { ToastAndroid } from 'react-native';
import { apiTienda } from '../api/apiTienda';
import { authContext } from '../context/authContext';
import { ProductCalificar, ResponseProductCalificar } from '../Types/interfaces'

const useLoadProductCalificar = () => {

    const [productoCalificar, setProductoCalificar] = useState<ProductCalificar[]>([] as ProductCalificar[]);
    const { auth } = useContext(authContext);
    const [isloading, setIsloading] = useState<boolean>(true);


    const HandleGetProductCalificar = async () => {

        let bodyjson: object = {
            id_cliente: auth.id
        }

        try {

            let result = await apiTienda.post<ResponseProductCalificar>("/listar_productos_sin_calificar", bodyjson);
            let response = result.data;

            if (!response.success) {
                setProductoCalificar([]);
                console.log(response.message);
                ToastAndroid.show(response.message, 1000);
                setIsloading(false);
                return;
            }

            let data: ProductCalificar[] = response.data;
            setProductoCalificar(data);

        } catch (err) {
            console.log("Error useLoadProductCalificar:HandleGetProductCalificar");
            ToastAndroid.show("Error Server Connection", 1000);
            console.log(err);
        }

        setIsloading(false);

    }

    useEffect(() => {
        HandleGetProductCalificar();
    }, []);

    return {
        productoCalificar,
        isloading,
        auth,
        HandleGetProductCalificar
    }

}

export default useLoadProductCalificar
