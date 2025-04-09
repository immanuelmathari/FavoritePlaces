import { StyleSheet, View } from "react-native";
import OutlinedButton from "../UI/OutlinedButton";

function LocationPicker() {
    function getLocationHandler() { }

    function pickOnMapHandler() { }
    return (
        <View>
            <View style={styles.mapPreview}></View>
            <View style={styles.action}>
                <OutlinedButton onPress={getLocationHandler} icon="location">Locate User</OutlinedButton>
                <OutlinedButton onPress={pickOnMapHandler} icon="map">Pick on Map</OutlinedButton>
            </View>
        </View>
    )
}

export default LocationPicker;

const styles = StyleSheet.create({
    mapPreview: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary100,
        borderRadius: 4,
    },
    action: {
        flex: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    
    },
})