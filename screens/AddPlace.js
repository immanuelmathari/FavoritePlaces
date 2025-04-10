import PlaceForm from "../components/PlaceForm";
import { insertPlace } from "../util/database";

function AddPlaces({navigation}) {
    async function createPlaceHandler(place) {
        // insert into DB 
        // for now we just pass this data to display it without saving
        await insertPlace(place);
        // navigation.navigate('AllPlaces', {
        //     place: place
        // })
        navigation.navigate('AllPlaces')
    }
    return <PlaceForm onCreatePlace={createPlaceHandler} />
}

export default AddPlaces;