import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import OutlinedButton from "../components/UI/OutlinedButton";
import { Colors } from "../constants/colors";
import { useEffect, useState } from "react";
import { fetchPlaceDetails } from "../util/database";

function PlaceDetails({ route, navigation }) {
    const [fetchedPlace, setFetchedPlace] = useState();

    const selectedPlaceId = route.params.placeId;

    function showOnMapHandler() {
        navigation.navigate('Map', {
            initialLatitude: fetchedPlace.location.latitude,
            initialLongitude: fetchedPlace.location.longitude,
        });
    }

    useEffect(() => {
        // use this selectedPlaceId to fetch data
        async function loadPlaceData(){
            const place = await fetchPlaceDetails(selectedPlaceId);
            console.log("place looks like this manu",place);
            setFetchedPlace(place);
            navigation.setOptions({
                title: place.title
            })
        };
        loadPlaceData();
    }, [selectedPlaceId])

    if(!fetchedPlace) {
        return <View style={styles.fallback}>
            <Text>Loading Place Data...</Text>
        </View>
    }

    return <ScrollView>
        <Image style={styles.image} source={{uri: fetchedPlace.imageUri}} />
        <View style={styles.locationContainer}>
            <View style={styles.addressContainer}>
                <Text style={styles.address}>{fetchedPlace.address}</Text>
            </View>
            <OutlinedButton icon="map" onPress={showOnMapHandler}>View on Map</OutlinedButton>
        </View>
    </ScrollView>
}

export default PlaceDetails;

const styles = StyleSheet.create({
    fallback: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    screen: {
        alignItems: 'center',
    },
    image: {
        height: '35%',
        minHeight: 300,
        width: '100%'
    },
    locationContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    addressContainer: {
        padding: 20,
    },
    address: {
        color: Colors.primary500,
        textAlign: 'center',
        fontSize: 16,
    }
});