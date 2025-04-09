import { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { Colors } from "../constants/colors";
import ImagePicker from "./Places/ImagePicker";
import LocationPicker from "./Places/LocationPicker";
import Button from "./UI/Button";

function PlaceForm() {
    const [enteredTitle, setEnteredTitle] = useState('');

    function changeTitleHandler(enteredText) {
        setEnteredTitle(enteredText);
    }

    function savePlaceHandler() {
        console.log('you hit me')
    }
    return (
        <ScrollView style={styles.form}>
            <View>
                {/* a label */}
                <Text style={styles.label}>Title</Text>
                <TextInput style={styles.input} onChangeText={changeTitleHandler} value={enteredTitle} />
            </View>
            <ImagePicker />
            <LocationPicker />
            <Button onPress={savePlaceHandler}>Add Place</Button>
        </ScrollView>
    )
}

export default PlaceForm;

const styles = StyleSheet.create({
    form: {
        flex: 1, // take as much space
        padding: 24, // leave some space on the edges
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 4,
        color: Colors.primary500
    },
    input: {
        marginVertical: 8,
        paddingHorizontal: 4,
        paddingVertical: 8,
        fontSize: 16,
        borderBottomColor: Colors.primary700,
        borderBottomWidth: 2,
        backgroundColor: Colors.primary100
    }
})