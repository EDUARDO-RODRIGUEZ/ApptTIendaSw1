import React from 'react'
import { StyleSheet, View } from 'react-native';
import { Button, IconButton, Text } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


interface Props {
    iconName: string;
    size: number;
    text: string;
    color: string;
    customStyle?: object;
}

const CustomIcon = (props: Props) => {

    const { iconName, text, color, size, customStyle = {} } = props;

    return (
        <View style={customStyle}>
            <Icon.Button name={iconName} size={size} color={color} >
                {text}
            </Icon.Button>
        </View>
    )

}

export default CustomIcon
