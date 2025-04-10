import PlaceForm from "../components/PlaceForm";

function AddPlaces({navigation}) {
    function createPlaceHandler(place) {
        // insert into DB 
        // for now we just pass this data to display it without saving
        navigation.navigate('AllPlaces', {
            place: place
        })
    }
    return <PlaceForm onCreatePlace={createPlaceHandler} />
}

export default AddPlaces;