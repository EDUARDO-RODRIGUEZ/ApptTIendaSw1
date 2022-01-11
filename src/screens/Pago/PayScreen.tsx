import React, { useContext } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TextInput, StyleSheet, ToastAndroid } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Title } from 'react-native-paper';
import { CustomButton } from '../../components/CustomButton';
import { useForm } from '../../hooks/useForm';
import { StackHomeParamList } from '../../navigation/StackHome';
import { apiTienda } from '../../api/apiTienda'
import { authContext } from '../../context/authContext';
import { Pedido } from '../../Types/interfaces';

interface Form {
    cantidad: number
}

interface Props extends NativeStackScreenProps<StackHomeParamList, "pago"> {

}

const PayScreen = (props: Props) => {

    const { route } = props;
    const { idProducto } = route.params;
    const { HandleInputChange, value } = useForm<Form>({ cantidad: 0 });
    const { auth } = useContext(authContext);
    const { cantidad } = value;

    const HandleClickPay = async () => {

        if (cantidad == 0) {
            ToastAndroid.show("Cantida 0 no validad!!!", 1000)
            return;
        }

        const payload = {
            id_cliente: auth.id,
            productos: [
                {
                    id_producto: idProducto,
                    cantidad
                }
            ]
        }

        try {

            const res = await apiTienda.post<Pedido>('/registrar_pedido', payload);
            const { message } = res.data;
            ToastAndroid.show(message, 1000);

        } catch (error) {
            ToastAndroid.show("Error Server", 1000)
            console.log("Error server :" + error);
        }

    }

    return (
        <ScrollView style={styles.container}>

            <Title style={styles.title}>Pago del Producto</Title>

            <TextInput
                style={styles.input}
                keyboardType='number-pad'
                placeholder={"cantidad..."}
                onChangeText={(text) => HandleInputChange({ cantidad: text })}
            />

            <CustomButton
                style={styles.btn}
                backgroundColor={"rgba(108, 99, 255,0.7)"}
                icon={"rocket"}
                onPress={() => HandleClickPay()}
                text={"comprar"}
            />

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    title: {
        textAlign: "center",
        marginVertical: 5
    },
    contentInput: {
        padding: 5
    },
    input: {
        borderWidth: 0.3,
        borderRadius: 10
    },
    btn: {
        height: 40,
    }
});

export default PayScreen
