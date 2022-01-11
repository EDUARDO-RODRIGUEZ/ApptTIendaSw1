import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from './DrawerContent';
import StackHome from './StackHome';
import { Theme } from '../const/theme';
import StackPedidos from './StackPedidos';
import StackCalificar from './StackCalificar';

const Drawer = createDrawerNavigator();

const NavigationPrivate = () => {

    return (
        <Drawer.Navigator
            screenOptions={{
                headerTitleAlign: "center",
                headerTintColor: "white",
                headerStyle: {
                    backgroundColor: Theme.primary
                }
            }}
            drawerContent={(props) => <DrawerContent {...props} />}
        >
            <Drawer.Screen name={"Home"} component={StackHome} />
            <Drawer.Screen name={"Pedidos"} component={StackPedidos} />
            <Drawer.Screen name={"Calificar"} component={StackCalificar} />
        </Drawer.Navigator>
    )

}

export default NavigationPrivate
