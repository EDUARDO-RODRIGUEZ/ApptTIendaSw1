import React, { useEffect, useState } from 'react'
import { ToastAndroid } from 'react-native';
import { apiTienda } from '../api/apiTienda';
import { DataProduct, ReponseMessageProduct } from '../Types/interfaces'

const useCommentProduct = (id_producto: number) => {

    const [messageProduct, setMessageProduct] = useState<DataProduct[]>([]);
    const [points, setPoints] = useState<number>(0);

    const HandleGetMessageProduct = async () => {
        const data = {
            id_producto
        }

        try {

            let result = await apiTienda.post<ReponseMessageProduct>('/listar_comentarios_producto', data);
            let response = result.data;

            if (!response.success) {
                ToastAndroid.show(response.message, 1000);
                return;
            }

            setMessageProduct(response.data);

            setPoints(Number.parseFloat(response.points));

            ToastAndroid.show(response.message, 1000);

        } catch (error) {

            console.log("Catch useCommentProduct:HandleGetMessageProduct");
            ToastAndroid.show("Error Server Connectio", 1000);

        }

    }

    useEffect(() => {
        HandleGetMessageProduct()
    }, []);

    return {
        HandleGetMessageProduct,
        points,
        messageProduct
    }

}

export default useCommentProduct
