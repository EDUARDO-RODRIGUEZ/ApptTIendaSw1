import React from 'react'
import { StyleSheet, View } from 'react-native';
import { Text, Title } from 'react-native-paper';
import { Theme } from '../../const/theme';
import { ProductoParcial } from '../../Types/interfaces'

interface Props {
    productoParcial: ProductoParcial
}

const ItemPedido = (props: Props) => {

    const { productoParcial } = props;
    const { idproducto, nombre, precio } = productoParcial;

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Producto</Text>
            <Text style={styles.text}>idpedido:  {idproducto}</Text>
            <Text style={styles.text}>nombre :  {nombre}</Text>
            <Text style={styles.text}>precio :  {precio}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        padding: 10,
        backgroundColor: Theme.primary,
        marginVertical:5
    },
    text: {
        color: Theme.text
    }
});

export default ItemPedido
