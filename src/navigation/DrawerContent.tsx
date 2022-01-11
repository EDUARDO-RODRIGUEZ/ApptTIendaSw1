import React, { useContext } from 'react'
import {
    DrawerContentComponentProps,
    DrawerContentScrollView,
    DrawerItemList
} from '@react-navigation/drawer';
import { StyleSheet, View } from 'react-native';
import { Avatar, Drawer, Text, Title } from 'react-native-paper';
import { authContext } from '../context/authContext';

const DrawerContent = (props: DrawerContentComponentProps) => {

    const { auth } = useContext(authContext);
    const { name } = auth;

    return (
        <DrawerContentScrollView {...props}>

            <View style={styles.ContentAvatar}>
                <Title style={styles.title}>Ecommerce</Title>
                <Avatar.Image style={styles.avatar} size={60} source={require('../assets/images/avatar.png')} />
                <Text style={styles.title}>{name}</Text>
            </View>

            <Drawer.Section>
                <DrawerItemList {...props} />
            </Drawer.Section>
        </DrawerContentScrollView>
    )

}

const styles = StyleSheet.create({
    ContentAvatar: {
        marginVertical: 5,
    },
    title: {
        textAlign: "center",
        marginVertical: 3
    },
    avatar: {
        alignSelf: "center"
    }
});

export default DrawerContent

