import React, { useState } from 'react'
import { View, StyleSheet, TextInput } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import List from '../../components/List'
import Loading from '../../components/Loading'
import SpeechText from '../../components/SpeechText'
import { useLoadProducts } from '../../hooks/useLoadProducts'

const HomeScreen = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const [refresh, setRefresh] = useState<boolean>(false);
    const { checking, HadleChangeSearch, productosFilter, setProductosFilter, productos } = useLoadProducts();

    const HandlePullRefresh = () => {

        setRefresh(true);

        setTimeout(() => {
            setProductosFilter(productos);
            setRefresh(false);
        }, 1000);

    }


    return (

        <View style={styles.container}>

            <View style={styles.content}>

                <TextInput
                    style={styles.input}
                    placeholder={"search..."}
                    onChangeText={(text) => HadleChangeSearch(text)}
                />

                {
                    checking
                        ? <ActivityIndicator />
                        : <List data={productosFilter} refresh={refresh} PullRefresh={HandlePullRefresh} />
                }

                <SpeechText
                    setLoading={setLoading}
                    set={setProductosFilter}
                />

            </View>

            {loading && <Loading message={"escuchando..."} />}

        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        padding: 10
    },
    input: {
        height: 40,
        backgroundColor: "white",
        marginVertical: 10,
        borderRadius: 10
    }
});


export default HomeScreen
