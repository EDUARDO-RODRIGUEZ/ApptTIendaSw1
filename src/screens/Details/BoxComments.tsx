import React, { useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Theme } from '../../const/theme';
import { DataProduct } from '../../Types/interfaces'

interface Props {
    data: DataProduct[],
    pullRefresh: () => void;
    refresh: boolean;
}

const BoxComments = (props: Props) => {

    const { data, pullRefresh, refresh } = props;


    if (data.length === 0) {
        return <Text>No hay comentarios</Text>
    }

    return (
        <FlatList
            refreshing={refresh}
            onRefresh={pullRefresh}
            data={data}
            renderItem={({ item }) => <Item item={item} />}
        />
    )
}

const Item = (props: { item: DataProduct }) => {

    const { item } = props;
    const { promedio, comentario, calificacion } = item;

    return (
        <View style={styles.message}>
            <Text>{comentario} : {calificacion} ({parseFloat(promedio)})</Text>
        </View>
    )

}


const styles = StyleSheet.create({
    message: {
        padding: 5,
        minHeight: 50,
        marginVertical: 2,
        borderTopWidth: 4,
        borderWidth: 0.2,
        borderTopColor: Theme.primary,
        borderRadius: 5,
    }
});

export default BoxComments
