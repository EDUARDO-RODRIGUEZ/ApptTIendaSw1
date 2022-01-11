import React from 'react'
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';


interface Props {
    message: string
}

const Loading = (props: Props) => {

    const { message } = props;

    return (
        <View style={styles.card}>
            <Text style={styles.textInfo}>
                {message}
            </Text>
        </View>
    )
}


const styles = StyleSheet.create({
    card: {
        height: "100%",
        width: "100%",
        position: "absolute",
        backgroundColor: "#4c5265",
        opacity: 0.7,
        alignItems: "center",
        justifyContent: "center",
    },
    textInfo: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#fff"
    }
});


export default Loading
