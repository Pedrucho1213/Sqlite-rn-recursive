import React, {useEffect} from 'react';
import {StatusBar} from "expo-status-bar";
import {StyleSheet, TextInput, View, Image, Alert} from 'react-native';
import * as SQLite from 'expo-sqlite';
import MyButton from "../components/MyButton";

const db = SQLite.openDatabase('vacas.db');

// @ts-ignore
export default function SaveScreen({navigation}) {

    const [vacaState, setVaca] = React.useState('Nombre de la vaca');
    const [areteo, setAreteo] = React.useState('Numero de areteo');
    const [color, setColor] = React.useState('Color');

    useEffect(() => {
        db.transaction(tx => {
            tx.executeSql(
                "create table if not exists storevaca (id integer not null primary key AUTOINCREMENT, nombre text, areteo int, color text);"

            );
            Alert.alert('BD', 'Base de datos creada');

        },(error => console.log(error)));
    }, [])

    //useEffect(()=>{console.log("componentes actualizado")},[color,areteo,vacaState])
    //useEffect(()=>{return ()=>{console.log("desmontado")}})

    function saveVaca() {
        if (vacaState === null || vacaState === "") {
            return ;
        }
        if (areteo === null || areteo === "") {
            return ;
        }
        if (color === null || color === "") {
            return ;
        }
        db.transaction(tx => {
            tx.executeSql("insert into storevaca (nombre, areteo, color) values (?, ?, ?)", [vacaState, areteo, color]);
            Alert.alert('Registro', 'Datos registrado satisfactoriamente');
        });

    }

    return (
        <View style={styles.container}>
            <Image source={require("../assets/vacalogo.png")} style={styles.imagen}/>
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
                customCLick={() => saveVaca()}
            />
            <MyButton
                title="Mostrar datos"
                customCLick={() => navigation.navigate('ShowData')}
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
