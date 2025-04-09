import { Alert, Image, StyleSheet, Text, View } from "react-native";
import OutlinedButton from "../UI/OutlinedButton";
import { Colors } from "../../constants/colors";
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from "expo-location";
import { useState } from "react";
import { getMapPreview } from "../../util/location";
import { useNavigation } from "@react-navigation/native";

function LocationPicker() {
    const [pickedLocation, setPickedLocation] = useState();
    const navigation = useNavigation();
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
            setPickedLocation({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            })
        } catch (error)
        {
            console.log('Error getting location', error)
        }

    }

    function pickOnMapHandler() {
        navigation.navigate('Map');
     }

    let locationPreview = <Text>No Location picked yet.</Text>

    if(pickedLocation) {
        locationPreview = (
            <Image source={{ uri: getMapPreview(pickedLocation.latitude, pickedLocation.longitude)}}  style={styles.image}/>
        )
    }

    return (
        <View>
            <View style={styles.mapPreview}>
                {locationPreview}
            </View>
            <View style={styles.action}>
                <OutlinedButton onPress={getLocationHandler} icon="location">Find My Location</OutlinedButton>
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
        overflow: 'hidden'
    },
    action: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    
    },

    image: {
        width: '100%',
        height: '100%',
        borderRadius: 4,
    }
})