import React, {useEffect} from "react";
import {View, StyleSheet, ScrollView, Alert, TextInput} from "react-native";
import {Card, ListItem, Button, Icon, ThemeContext} from 'react-native-elements'
import {Dialog} from 'react-native-simple-dialogs';

import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('vacas.db');

export default function ShowData() {
    const [datosDb, setdatosDB] = React.useState([]);
    const [modalIs, setModal] = React.useState(false);
    const [nombre, setNombre] = React.useState();
    const [areteo, setAreteo] = React.useState("");
    const [color, setColor] = React.useState();
    const [id, setId] = React.useState();
    const contextType = ThemeContext;

    function toggleModal() {
        setModal(!modalIs);
    }

    async function getDatos() {
        db.transaction(tx => {
            tx.executeSql(
                "select * from storevaca", [], (tx, data) => {
                    // @ts-ignore
                    const datos = data.rows._array;
                    setdatosDB(datos);
                }
            )
        });
    }

    async function deleteData(id) {
        db.transaction(tx => {
            tx.executeSql("delete  from storevaca where id = ?", [id]);
            getDatos();
            Alert.alert('Data base', 'Datos eliminados satisfactoriamente');
        }, (error => console.log(error)));
    }

    async function updateData() {
        db.transaction(tx => {
            tx.executeSql("update storevaca set nombre = ?, areteo = ?, color = ? where id = ?", [nombre, areteo, color, id]);
            Alert.alert('Data base', 'Datos actualizados satisfactoriamente');
            getDatos();
        }, (error => console.log(error)))
    }

    useEffect(() => {
        const data = getDatos();
    }, [])
    return (
        <View>
            <ScrollView>
                {datosDb.map(data => (
                    <Card key={data.id}>
                        <Card.Title>{data.nombre}</Card.Title>
                        <ListItem key={data.id} bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title>Areteo de la vaca: </ListItem.Title>
                                <ListItem.Subtitle>{data.areteo}</ListItem.Subtitle>
                                <ListItem.Title>Color de la vaca: </ListItem.Title>
                                <ListItem.Subtitle>{data.color}</ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                        <Button
                            icon={<Icon name='delete' color='red'/>}
                            type="outline"
                            onPress={() => deleteData(data.id)}
                            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0,}}
                            title='Borrar'/>
                        <Button
                            icon={<Icon name='edit' color='blue'/>}
                            type="outline"
                            onPress={() => {
                                setId(data.id)
                                setNombre(data.nombre)
                                setAreteo(data.areteo + "")
                                setColor(data.color)
                                toggleModal()
                            }}
                            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0,}}
                            title='Editar'/>
                    </Card>
                ))}
            </ScrollView>
            <Dialog
                visible={modalIs}
                title="Actualizar registro"
                onTouchOutside={() => toggleModal()}>
                <View>
                    <TextInput
                        placeholder='Nombre de la vaca'
                        style={styles.input}
                        onChangeText={setNombre}
                        value={nombre}
                    />
                    <TextInput
                        placeholder='Numero de areteo'
                        style={styles.input}
                        onChangeText={setAreteo}
                        value={areteo}
                    />
                    <TextInput
                        placeholder='Color de la vaca'
                        style={styles.input}
                        onChangeText={setColor}
                        value={color}
                    />
                    <Button
                        icon={<Icon name='save' color='blue'/>}
                        type="outline"
                        onPress={() => {
                            updateData();
                            toggleModal();
                        }}
                        buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0,}}
                        title='Guardar cambios'/>
                </View>
            </Dialog>
        </View>
    )
}
const styles = StyleSheet.create({
    input: {
        fontSize: 22,
        width: 300,
        margin: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        paddingTop: 8,
        borderWidth: 1.5,
        borderRadius: 5,
    }
})