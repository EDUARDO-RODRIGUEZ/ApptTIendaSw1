import React, { useState } from 'react'
import { Image, ScrollView, StyleSheet, View, TextInput } from 'react-native'
import { Title, Text } from 'react-native-paper'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { StackHomeParamList } from '../../navigation/StackHome'
import { CustomButton } from '../../components/CustomButton'
import { Theme } from '../../const/theme'
import useCommentProduct from '../../hooks/useCommentProduct'
import Icon from 'react-native-vector-icons/Ionicons';
import BoxComments from './BoxComments'
import { url } from '../../const/url'

interface Props extends NativeStackScreenProps<StackHomeParamList, "details"> {

}

const Star = <Icon name="star" size={20} color="orange" />;

const DetailsScreen = (props: Props) => {

    const { route, navigation } = props;
    const { product } = route.params;
    const { id, nombre, imagen, precio, stock } = product;
    const { points, messageProduct, HandleGetMessageProduct } = useCommentProduct(id);
    const [refresh, setrefresh] = useState<boolean>(false);

    const pullRefresh = () => {

        setrefresh(true);

        HandleGetMessageProduct().then(() => {
            setrefresh(false);
        });

    }

    return (
        <View style={styles.container}>

            <Title style={styles.title}>Detalle del Producto</Title>

            <View style={styles.containerImage}>
                <Image
                    style={styles.img}
                    source={{ uri: `${url.url + imagen}` }}
                />
            </View>

            <View>

                <View style={styles.containerDescription}>
                    <View>
                        <Text style={{ ...styles.text, fontWeight: "700" }}>Puntos</Text>
                        <Text style={{ ...styles.text, fontWeight: "700" }}>Nombre </Text>
                        <Text style={{ ...styles.text, fontWeight: "700" }}>Precio </Text>
                        <Text style={{ ...styles.text, fontWeight: "700" }}>Stock </Text>
                    </View>
                    <View>
                        <Text style={styles.text}>{points}{Star}</Text>
                        <Text style={styles.text}>{nombre}</Text>
                        <Text style={styles.text}>{precio} $</Text>
                        <Text style={styles.text}>{stock}</Text>
                    </View>
                </View>

            </View>

            <BoxComments
                pullRefresh={pullRefresh}
                data={messageProduct}
                refresh={refresh}
            />

            <CustomButton
                text={"Comprar"}
                backgroundColor={Theme.primary}
                icon={"rocket"}
                onPress={() => navigation.navigate('pago', { idProducto: id })}
                style={styles.btn}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    contentStyleScrooll: {
        minHeight: "100%"
    },
    title: {
        textAlign: "center",
        marginVertical: 3
    },
    containerImage: {
        height: 300,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        borderBottomEndRadius: 130,
        borderBottomStartRadius: 130,
        backgroundColor: "rgba(108, 99, 255,0.7)",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 5
    },
    img: {
        height: 150,
        width: 150,
    },
    containerDescription: {
        flexDirection: "row",
    },
    text: {
        marginVertical: 3,
        fontSize: 17,
    },
    description: {
        textAlign: "justify"
    },
    btn: {
        marginTop: 10,
        height: 40,
        width: "100%",
    }
});

export default DetailsScreen
