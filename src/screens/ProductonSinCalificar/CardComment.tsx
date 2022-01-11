import React from 'react'
import { Image, StyleSheet, Text, TextInput, ToastAndroid, View } from 'react-native'
import { apiTienda } from '../../api/apiTienda';
import { CustomButton } from '../../components/CustomButton';
import { Theme } from '../../const/theme';
import { url } from '../../const/url';
import { useForm } from '../../hooks/useForm';
import { ProductCalificar, ResultForComment } from '../../Types/interfaces';


interface Props {
    productoCalificar: ProductCalificar
    HandleAnalyisText: (text: string) => void;
}

interface Input {
    comment: string
}

const CardComment = (props: Props) => {

    const { productoCalificar, HandleAnalyisText } = props;
    const { nombre, descripcion, imagen, idPedido, Iddetalle, idproducto } = productoCalificar;

    const { value, HandleInputChange } = useForm<Input>({
        comment: ""
    });

    const { comment } = value;

    const HandleClickComment = async () => {

        if (comment.length === 0) {
            ToastAndroid.show("Agregue un comentario al producto!!!", 1000);
            return;
        }

        let result: ResultForComment = await HandleAnalyisText(comment);

        const data = {
            Iddetalle: Iddetalle,
            idPedido: idPedido,
            idproducto: idproducto,
            promedio: result.promedio,//0-1
            calificacion: result.calificacion,//buena - neutral - mala,
            comentario: comment
        }

        const responseStatus = await apiTienda.post("/agregar_comentario_producto", data);
        const responseData = responseStatus.data;

        ToastAndroid.show(responseData.message, 1000);

    }

    return (
        <View style={styles.container}>

            <View style={styles.cardContent}>

                <Image
                    source={{ uri: `${url.url + imagen}` }}
                    style={styles.image}
                />

                <View style={styles.contentDescription}>
                    <Text style={styles.textCenter}>{nombre}</Text>
                    <Text>{descripcion}</Text>
                </View>

            </View>

            <TextInput
                style={styles.text}
                value={comment}
                onChangeText={(text) => HandleInputChange({ comment: text })}
                placeholder={"comentario..."}
            />

            <CustomButton
                backgroundColor={Theme.primary}
                onPress={() => HandleClickComment()}
                icon={"log-in-outline"}
                text={"calificar"}
                style={styles.btn}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        minHeight: 250,
        borderRadius: 10,
        padding: 10,
        marginVertical: 5,
        borderBottomWidth: 0.2,
        borderTopWidth: 0.2
    },
    cardContent: {
        minHeight: 150,
        borderWidth: 0.2,
        borderRadius: 10,
        flexDirection: "row"
    },
    contentDescription: {
        flex: 5,
        justifyContent: "center",
        alignItems: "center",
        padding: 10
    },
    text: {
        borderWidth: 0.2,
        borderRadius: 10,
        marginVertical: 5
    },
    btn: {
        height: 40,
        justifyContent: "center"
    },
    image: {
        height: "100%",
        flex: 5,
        borderRadius: 10
    },
    textCenter: {
        textAlign: "center"
    }
});

export default CardComment
