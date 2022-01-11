import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useContext } from 'react'
import { Alert, Image, ScrollView, StyleSheet, Text, ToastAndroid, View } from 'react-native'
import { Button, TextInput } from 'react-native-paper';
import { Theme } from '../../const/theme';
import { authContext } from '../../context/authContext';
import { useForm } from '../../hooks/useForm';
import { RootStackAuth } from '../../navigation/NavigationPublic';


interface Props extends NativeStackScreenProps<RootStackAuth, "Login"> {

}

interface Cliente {
    email: string;
    password: string;
}


const LoginScreen = (props: Props) => {

    const { navigation } = props;

    const { login } = useContext(authContext);

    const { value, HandleInputChange } = useForm<Cliente>({
        email: 'daylertaboadad@gmail.com',
        password: 'nanetasd10010'
    });

    const { email, password } = value;

    const HandleButtonLogin = () => {

        if (email.length === 0 || password.length === 0) {
            ToastAndroid.show("Datos invalidos!!!", 1000);
            return;
        }

        login(email, password, (message) => {
            ToastAndroid.show(message, 1000);
        });
    }


    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>

            <Image source={require('../../assets/images/Login.png')} />

            <View style={styles.contentLogin}>

                <TextInput
                    style={styles.input}
                    keyboardType={"email-address"}
                    label="email"
                    placeholder={"email..."}
                    value={email}
                    onChangeText={text => HandleInputChange({ email: text })}
                />

                <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    label="password"
                    placeholder={"password..."}
                    value={password}
                    onChangeText={text => HandleInputChange({ password: text })}
                />

                <Text onPress={() => navigation.replace("Register")} style={styles.link}>create new account?</Text>

                <Button
                    style={styles.btn}
                    color={"#6C63FF"}
                    mode="contained"
                    onPress={HandleButtonLogin}
                >
                    login
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
    contentLogin: {
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
    title: {
        textAlign: "center",
    },
    link: {
        marginVertical: 5
    }
});

export default LoginScreen
