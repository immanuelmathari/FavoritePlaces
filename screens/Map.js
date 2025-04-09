import { useState } from "react";
import { StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

function Map(){
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
        
        setSelectedLocation({lat: latitude, lng: longitude });
    }

    return <MapView initialRegion={region} style={styles.map} onPress={selectedLocationHandler}>
        {selectedLocation && (
            <Marker title="Picked Location" coordinate={{ latitude: selectedLocation.lat, longitude: selectedLocation.lng }} />
        )} 
    </MapView>
}

export default Map;

const styles = StyleSheet.create({
    map: {
        flex: 1
    }
});