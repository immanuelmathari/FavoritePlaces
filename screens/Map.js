import { useCallback, useLayoutEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import IconButton from "../components/UI/IconButton";

function Map({navigation, route}){
    
    // this is only when we are opening the map from the map details screen
    // const initialLocation = route.params ? {latitude: route.params.initialLatitude, longitude: route.params.initialLongitude} : null;
    const initialLocation = route.params && {latitude: route.params.initialLatitude, longitude: route.params.initialLongitude} ;
    
    // we get initial location first rather than it being undefined
    // const [selectedLocation, setSelectedLocation] = useState();
    const [selectedLocation, setSelectedLocation] = useState(initialLocation);

    // const region = {
    //     latitude: -1.2921,
    //     longitude: 36.8219,
    //     latitudeDelta: 0.0922,
    //     longitudeDelta: 0.0421,
    // }
    const region = {
        latitude: initialLocation ? initialLocation.latitude : -1.2921,
        longitude: initialLocation ? initialLocation.longitude :  36.8219,
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
        if (initialLocation) {
            return;
        }
        navigation.setOptions({
            headerRight: ({ tintColor }) => <IconButton icon="save" size={24} color={tintColor} onPress={savePickedLocationHandler} />
        })
    }, [navigation, savePickedLocationHandler, initialLocation]);

    return (
     <MapView initialRegion={region} style={styles.map} onPress={selectedLocationHandler}>
        {selectedLocation && (
            <Marker title="Picked Location" coordinate={{ latitude: selectedLocation.latitude, longitude: selectedLocation.longitude }} />
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