import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductoSinCalificar from '../screens/ProductonSinCalificar/ProductoSinCalificar';

export type StackCalificarParamList = {
    calificar: undefined
};

const Stack = createNativeStackNavigator<StackCalificarParamList>();

const StackCalificar = () => {

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name={"calificar"} component={ProductoSinCalificar} />
        </Stack.Navigator>
    );

}

export default StackCalificar
