import React, { useContext } from 'react'
import { NavigationContainer, Theme, DefaultTheme } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { authContext } from '../context/authContext';
import NavigationPrivate from './NavigationPrivate';
import NavigationPublic from './NavigationPublic';
import { Theme as ThemeConst } from '../const/theme';

const CustomTheme: Theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: ThemeConst.primary,
    }
}

const Navition = () => {

    const { auth } = useContext(authContext);
    const { isAuthenticated } = auth;

    return (
        <NavigationContainer theme={CustomTheme}>
            <PaperProvider>

                <StatusBar backgroundColor={"#000"} barStyle={'light-content'} />

                {
                    (isAuthenticated)
                        ? <NavigationPrivate />
                        : <NavigationPublic />
                }

            </PaperProvider>
        </NavigationContainer>
    )
}

export default Navition
