import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react'
import { FlatList, Image, RefreshControl, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper';
import { Theme } from '../const/theme';
import { url } from '../const/url';
import { StackHomeParamList } from '../navigation/StackHome';
import { Producto } from '../Types/interfaces';
import { CustomButton } from './CustomButton';

interface Props {
    data: Producto[];
    refresh: boolean;
    PullRefresh: () => void;
}

type DetailsNavigate = NativeStackNavigationProp<StackHomeParamList, 'details'>;

const List = (props: Props) => {

    const { data, refresh, PullRefresh } = props;
    
    const navigation = useNavigation<DetailsNavigate>();

    return (
        <FlatList
            refreshControl={
                <RefreshControl
                    refreshing={refresh}
                    onRefresh={PullRefresh}
                />
            }
            data={data}
            renderItem={({ item }) => Item(item, navigation)}
            keyExtractor={(item) => (item.id.toString())}
        />
    )

}


const Item = (item: Producto, navigation: DetailsNavigate) => {

    const { imagen, nombre, precio, id } = item;

    return (
        <View style={styles.ContentCard}>

            <View style={styles.card}>

                <Image
                    style={styles.Image}
                    source={{ uri: `${url.url + imagen}` }}
                />

                <View style={styles.contentInfo}>

                    <Text style={styles.title}>{nombre}</Text>

                    <View>

                        <Text style={styles.title}>Precio: {precio}$</Text>

                        <CustomButton
                            backgroundColor={Theme.primary}
                            icon={"rocket"}
                            onPress={() => navigation.navigate("pago", { idProducto: id })}
                            text={"Comprar"}
                        />

                        <CustomButton
                            backgroundColor={Theme.secondary}
                            icon={"log-in-outline"}
                            onPress={() => navigation.navigate("details", { product: item })}
                            text={"Descripcion"}
                        />

                    </View>

                </View>

            </View>

        </View>
    );
}

const styles = StyleSheet.create({

    ContentCard: {
        height: 200,
        paddingVertical: 5
    },
    card: {
        flex: 1,
        flexDirection: "row",
    },
    Image: {
        flex: 5,
        height: "100%",
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10
    },
    contentInfo: {
        flex: 5,
        borderTopWidth: 0.3,
        borderBottomWidth: 0.3,
        borderEndWidth: 0.3,

        borderTopEndRadius: 5,
        borderBottomEndRadius: 5,
        padding: 5,
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        fontSize: 12,
        fontWeight: "600",
        textAlign: "center",
    }
});

export default List
