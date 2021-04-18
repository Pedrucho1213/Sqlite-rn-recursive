import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from "react-native";

// @ts-ignore
const MyButton = (props) => {
    return (
        <TouchableOpacity style={styles.button} onPress={props.customCLick}>
            <Text style={styles.textInButton}>{props.title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        backgroundColor: "#FE434C",
        borderRadius: 10,
        padding: 10,
        borderColor: "#7a42f4",
        borderWidth: 1,
    },
    textInButton: {
        color: "#ffffff"
    }
})

export default MyButton;