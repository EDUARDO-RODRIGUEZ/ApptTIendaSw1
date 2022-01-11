import React, { useState } from 'react'
import { View, StyleSheet, SectionList } from 'react-native';
import { ActivityIndicator, Title } from 'react-native-paper';
import useLoadPedidos from '../../hooks/useLoadPedidos';
import ItemPedido from './ItemPedido';

const MisPedidos = () => {

    const { auth, pedidosAdaptados, isLoading, HandleGetMyPedidos } = useLoadPedidos();

    const [refresh, setrefresh] = useState<boolean>(false);

    const onRefresh = (): void => {

        setrefresh(true);

        HandleGetMyPedidos().then(() => {
            setrefresh(false);
        });

    }

    return (
        <View style={styles.container}>

            <Title style={{ textAlign: "center" }}>Pedidos pendientes</Title>

            {isLoading && <ActivityIndicator size={"small"} />}

            <SectionList
                refreshing={refresh}
                onRefresh={onRefresh}
                sections={pedidosAdaptados}
                keyExtractor={(item, index) => item.idproducto.toString() + index}
                renderItem={({ item }) => (
                    <ItemPedido productoParcial={item} />
                )}
                renderSectionHeader={({ section: { title } }) => (
                    <Title>Total Pedido:{title}</Title>
                )}
            />

        </View>
    );

}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        padding: 10,
    }

});

export default MisPedidos
