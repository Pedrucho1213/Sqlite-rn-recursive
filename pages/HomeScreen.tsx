import React from 'react';
import {StatusBar} from "expo-status-bar";
// @ts-ignore
import vacaLogo from './assets/vaca.png';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    Image,
    Alert
} from 'react-native';

export default function HomeScreen() {
    const [vacaState, setVaca] = React.useState('Nombre de la vaca');
    const [areteo, setAreteo] = React.useState('Numero de areteo');
    const [color, setColor] = React.useState('Color');

    return (
        <View style={styles.container}>
            <Image source={vacaLogo} style={styles.imagen} />
            <TextInput
                placeholder='Nombre de la vaca'
                onChangeText={setVaca}
                style={styles.input}
            />
            <TextInput
                placeholder='Numero de areteo'
                onChangeText={setAreteo}
                style={styles.input}
            />
            <TextInput
                placeholder='Color'
                onChangeText={setColor}
                style={styles.input}
            />
            <TouchableOpacity
                style={styles.boton}
                onPress={() => Alert.alert('Variables', vacaState + areteo + color)}
            >
                <Text style={styles.textinButton}>Enviar</Text>
            </TouchableOpacity>
            <StatusBar style="auto" />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    boton: {
        alignItems: "center",
        backgroundColor: "#FE434C",
        borderRadius: 10,
        padding: 10,
        borderColor: "#7a42f4",
        borderWidth: 1,
    },
    imagen: {
        height: 200,
        width: 200,
    },
    input: {
        fontSize: 22,
        width: 300,
        margin: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        paddingTop: 8,
        borderWidth: 1.5,
        borderRadius: 5,
    },
    textinButton: {
        color: "white"
    },
});
