import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MisPedidos from '../screens/Pedido/MisPedidos';

export type StackPedidoParamList = {
    mispedidos: undefined;
};

const Stack = createNativeStackNavigator<StackPedidoParamList>();

const StackPedidos = () => {

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name={"mispedidos"} component={MisPedidos} />
        </Stack.Navigator>
    )
}

export default StackPedidos
