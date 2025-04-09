import { Alert, StyleSheet, View } from "react-native";
import OutlinedButton from "../UI/OutlinedButton";
import { Colors } from "../../constants/colors";
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from "expo-location";

function LocationPicker() {
    const [locationPermissionInformation, requestPermission] = useForegroundPermissions();
    async function verifyPermissions() {
        if(locationPermissionInformation.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission();

            return permissionResponse.granted;
        }

        if(locationPermissionInformation.status === PermissionStatus.DENIED) {
            Alert.alert(
                'Insufficinent Permissions!',
                'You need to grant camera permissions to use this app.'
            );
            return false; 
        }
        return true;
    }
    async function getLocationHandler() { 
        const hasPermission = await verifyPermissions();

        if(!hasPermission){
            return;
        }

        try {

            const location = await getCurrentPositionAsync();
            // const location = await getCurrentPositionAsync({
            //     // we can configure even the accuracy
            // });
            console.log(location);
        } catch (error)
        {
            console.log('Error getting location', error)
        }

    }

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
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    
    },
})