import React, { useState } from 'react'
import { StyleSheet, View, FlatList, RefreshControl } from 'react-native'
import { ActivityIndicator, Title } from 'react-native-paper';
import CustomIcon from '../../components/CustomIcon';
import useAnalysisSentiment from '../../hooks/useAnalysisSentiment';
import useLoadProductCalificar from '../../hooks/useLoadProductCalificar';
import CardComment from './CardComment';

const ProductoSinCalificar = () => {

    const { isloading, productoCalificar, HandleGetProductCalificar } = useLoadProductCalificar();
    const { showMessage, commentState, iconstate, HandleAnalyisText } = useAnalysisSentiment();
    const [refresh, setrefresh] = useState<boolean>(false);

    const onRefresh = (): void => {

        setrefresh(true);

        HandleGetProductCalificar().then(() => {
            setrefresh(false);
        });

    }

    return (
        <View style={styles.container}>

            <Title style={{ textAlign: "center" }}>Pedidos sin Calificar</Title>

            {isloading && <ActivityIndicator size={"small"} />}

            <FlatList
                refreshing={refresh}
                onRefresh={onRefresh}
                data={productoCalificar}
                renderItem={({ item }) => (<CardComment HandleAnalyisText={HandleAnalyisText} productoCalificar={item} />)}
                keyExtractor={(item) => item.Iddetalle.toString()}
            />

            {
                showMessage &&
                <CustomIcon
                    color='#fff'
                    iconName={iconstate}
                    size={40}
                    text={commentState}
                    customStyle={styles.btn}
                />
            }

        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        position: "relative",
    },
    btn: {
        position: "absolute",
        width: "100%",
        left: 10,
        top: 10,
    }
});

export default ProductoSinCalificar
