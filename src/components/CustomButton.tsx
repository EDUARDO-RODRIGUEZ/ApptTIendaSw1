import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
    icon: string;
    iconColor?: string;
    backgroundColor: string;
    text: string;
    onPress: () => void;
    style?: object;
}

export const CustomButton = (props: Props) => {

    const { backgroundColor, icon, iconColor = "#fff", onPress, text, style } = props;

    return (
        <TouchableOpacity onPress={onPress} style={{ ...styles.container, backgroundColor, ...style }}>
            <Text style={styles.textBtn}>
                <Icon name={icon} size={20} color={iconColor} />
                {text}
            </Text>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    container: {
        minHeight: 30,
        borderRadius: 10,
        padding: 2,
        marginVertical: 5
    },
    textBtn: {
        color: "#fff",
        textAlign: "center",
        paddingHorizontal: 8
    }
});