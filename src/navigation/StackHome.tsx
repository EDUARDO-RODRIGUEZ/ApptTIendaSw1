import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screens/Home/HomeScreen';
import DetailsScreen from '../screens/Details/DetailsScreen';
import { Producto } from '../Types/interfaces';
import PayScreen from '../screens/Pago/PayScreen';

export type StackHomeParamList = {
    home: undefined;
    details: { product: Producto }
    pago: { idProducto: number };
};

const StackHome = () => {

    const Stack = createNativeStackNavigator<StackHomeParamList>();

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name={"home"} component={HomeScreen} />
            <Stack.Screen name={"details"} component={DetailsScreen} />
            <Stack.Screen name={"pago"} component={PayScreen} />
        </Stack.Navigator>
    )
}


export default StackHome
