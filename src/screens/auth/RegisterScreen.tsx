import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Button, TextInput } from 'react-native-paper';
import { Theme } from '../../const/theme';
import { RootStackAuth } from '../../navigation/NavigationPublic';


interface Props extends NativeStackScreenProps<RootStackAuth, "Register"> {

}

const RegisterScreen = (props: Props) => {

    const { navigation } = props;

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>

            <Image source={require('../../assets/images/Login.png')} />

            <View style={styles.contentRegister}>

                <TextInput
                    style={styles.input}
                    label="nombre"
                    placeholder={"nombre..."}
                    onChangeText={text => console.log(text)}
                />

                <TextInput
                    style={styles.input}
                    label="email"
                    placeholder={"email..."}
                    onChangeText={text => console.log(text)}
                />

                <TextInput
                    style={styles.input}
                    label="password"
                    placeholder={"password..."}
                    onChangeText={text => console.log(text)}
                />

                <Text onPress={() => navigation.replace("Login")} style={styles.link}>sing In ?</Text>

                <Button
                    style={styles.btn}
                    color={"#6C63FF"}
                    mode="contained"
                    onPress={() => console.log('Pressed')}
                >
                    register
                </Button>

            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        minHeight: "100%",
        backgroundColor: Theme.background,
        alignItems: "center",
        justifyContent: "center"
    },
    contentRegister: {
        minHeight: 400,
        width: "80%",

        borderRadius: 5,
        padding: 5
    },
    input: {
        marginVertical: 5
    },
    btn: {
        marginVertical: 5
    },
    link: {
        marginVertical: 5
    }
});


export default RegisterScreen
