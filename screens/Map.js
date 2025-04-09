import { useCallback, useLayoutEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import IconButton from "../components/UI/IconButton";

function Map({navigation}){
    const [selectedLocation, setSelectedLocation] = useState();
    const region = {
        latitude: -1.2921,
        longitude: 36.8219,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    }

    function selectedLocationHandler(event) {
        const latitude = event.nativeEvent.coordinate.latitude;
        const longitude = event.nativeEvent.coordinate.longitude;
        
        setSelectedLocation({latitude: latitude, longitude: longitude });
    }

    // function savePickedLocationHandler() {
    //     if(!selectedLocation) {
    //         Alert.alert('No location picked!', 'You have to pick a location by tapping on the map first!');
    //         return;
    //     }
    //     navigation.navigate('AddPlace', {
    //         pickedLat: selectedLocation.lat,
    //         pickedLng: selectedLocation.lng,
    //     });

    // }

    const  savePickedLocationHandler = useCallback(() => {
        if(!selectedLocation) {
            Alert.alert('No location picked!', 'You have to pick a location by tapping on the map first!');
            return;
        }
        navigation.navigate('AddPlace', {
            pickedLat: selectedLocation.latitude,
            pickedLng: selectedLocation.longitude,
        });

    }, [navigation, selectedLocation]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: ({ tintColor }) => <IconButton icon="save" size={24} color={tintColor} onPress={savePickedLocationHandler} />
        })
    }, [navigation, savePickedLocationHandler]);

    return (
     <MapView initialRegion={region} style={styles.map} onPress={selectedLocationHandler}>
        {selectedLocation && (
            <Marker title="Picked Location" coordinate={{ latitude: selectedLocation.lat, longitude: selectedLocation.lng }} />
        )} 
    </MapView>
    )
}

export default Map;

const styles = StyleSheet.create({
    map: {
        flex: 1
    }
});