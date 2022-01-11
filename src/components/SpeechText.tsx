import React, { useEffect } from 'react'
import { Alert, StyleSheet, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import Voice, {
    SpeechEndEvent,
    SpeechErrorEvent,
    SpeechResultsEvent,
    SpeechStartEvent,
    SpeechVolumeChangeEvent
} from '@react-native-community/voice';

import { Theme } from '../const/theme';
import { Producto } from '../Types/interfaces';

interface Props {
    setLoading: (value: React.SetStateAction<boolean>) => void;
    set: (productosFilter: React.SetStateAction<Producto[]>) => void;
}

const SpeechText = (props: Props) => {

    const { setLoading, set } = props;

    useEffect(() => {

        Voice.onSpeechStart = onSpeechStart;
        Voice.onSpeechEnd = onSpeechEnd;
        Voice.onSpeechError = onSpeechError;
        Voice.onSpeechResults = onSpeechResults;
        Voice.onSpeechPartialResults = onSpeechPartialResults;
        Voice.onSpeechVolumeChanged = onSpeechVolumeChanged;

        return () => {
            Voice.destroy().then(Voice.removeAllListeners);
            console.log("destroy");
        };

    }, []);

    const onSpeechStart = (e: SpeechStartEvent) => {
        // Se invoca cuando se llama a start () sin error
        setLoading(true);
        console.log("onSpeechStart", e);
    }

    const onSpeechEnd = (e: SpeechEndEvent) => {
        // Invocada cuando SpeechRecognizer detiene el reconocimiento
        console.log("onSpeechEnd", e);
        setLoading(false);
    }

    const onSpeechError = (e: SpeechErrorEvent) => {
        // Invocada cuando se produce un error.
        console.log('onSpeechError: ', e);
        setLoading(false);
    };

    const onSpeechResults = (e: SpeechResultsEvent) => {
        // Invocada cuando SpeechRecognizer ha terminado de reconocer
        // console.log("Result:");
        setLoading(false);
        HandleSearchProduct(e.value);
    };

    const onSpeechPartialResults = (e: any) => {

    }

    const onSpeechVolumeChanged = (e: SpeechVolumeChangeEvent) => {

    }

    const startRecognizing = async () => {
        try {
            await Voice.start('es-ES');
        } catch (e) {
            console.error(e);
        }
    }

    const HandleSearchProduct = (ArrayText: any) => {

        let text = ArrayText[0].toLowerCase();

        if (!text.includes('buscar')) {
            Alert.alert(`Expresion no reconocida: ${text}`, `Mencione la palabra buscar frase !!!`);
            return;
        }

        text = text.replace("buscar", "");
        text = text.trim();

        ToastAndroid.show(`Buscando la palabra: ${text}`, 1000);

        set((productos) => {

            let dataFilter = productos.filter((item) => item.nombre.toLowerCase().includes(text.toLowerCase()));

            if (dataFilter.length === 0) {
                ToastAndroid.show(`No se encontraron productos`, 1000);
                return productos;
            }

            return dataFilter;
        });

    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={startRecognizing}>
                <Icon name="volume-medium-outline" size={30} color={Theme.background} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: 20,
        marginHorizontal: "auto",
        height: 70,
        width: 70,
        borderRadius: 40,
        backgroundColor: Theme.primary,
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center"
    }
});


export default SpeechText
