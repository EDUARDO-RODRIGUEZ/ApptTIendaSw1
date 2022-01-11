import React, { useContext, useEffect, useState } from 'react'
import { ToastAndroid } from 'react-native';
import { apiTienda } from '../api/apiTienda';
import { authContext } from '../context/authContext';
import { MiPedido, PedidosAdapter, ResponseMyPedido } from '../Types/interfaces';

const useLoadPedidos = () => {

    const [pedidosAdaptados, setPedidosAdaptados] = useState<PedidosAdapter[]>([] as PedidosAdapter[]);

    const [isLoading, setisLoading] = useState<boolean>(true);

    const { auth } = useContext(authContext);

    const HandleGetMyPedidos = async () => {

        const body: object = {
            id_cliente: auth.id
        }

        try {

            let result = await apiTienda.post<ResponseMyPedido>("/listar_pedidos", body);

            let data = result.data;

            if (!data.success) {
                setisLoading(false);
                console.log(data.message);
                ToastAndroid.show(data.message, 1000);
                return;
            }

            AdapterDataSection(data.data);

        } catch (err) {

            ToastAndroid.show("Error en el Server Connection", 1000);
            console.log("Error useLoadPedidos : HandleGetMyPedidos");
            console.log(err);

        }

        setisLoading(false);

    }

    const AdapterDataSection = (pedidos: MiPedido[]) => {

        let data: PedidosAdapter[] = pedidos.map((item) => {

            return {
                idpedido: item.idpedido,
                title: item.total,
                data: item.productos
            }

        });

        setPedidosAdaptados(data);
    }

    useEffect(() => {
        HandleGetMyPedidos()
    }, []);

    return {
        pedidosAdaptados,
        auth,
        isLoading,
        HandleGetMyPedidos
    }

}

export default useLoadPedidos
