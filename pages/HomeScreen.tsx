import React, { useEffect } from 'react';
import {StatusBar} from "expo-status-bar";
import MyButton from "../components/MyButton";
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('vacas.db');

import {
    StyleSheet,
    TextInput,
    View,
    Image,
    Alert
} from 'react-native';

export default function HomeScreen() {

    const [vacaState, setVaca] = React.useState('Nombre de la vaca');
    const [areteo, setAreteo] = React.useState('Numero de areteo');
    const [color, setColor] = React.useState('Color');

    useEffect(()=>{
        console.log("montado")
    }, [])
    useEffect(()=>{
            console.log("componentes actualizado")
        },[color,areteo,vacaState])
    useEffect(()=>{

        return ()=>{
            console.log("desmontado")
        }
    })

    return (
        <View style={styles.container}>
            <Image source={require("../assets/vacalogo.jpg")} style={styles.imagen}/>
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
            <MyButton
                title="Enviar"
                customCLick={() => Alert.alert('Notificación', 'Elemento Enviado = ' + vacaState + ' ' + areteo + ' ' + color)}
            />
            <StatusBar style="auto"/>
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
});
