import { useEffect, useState } from "react";
import PlacesList from "../components/PlacesList";
import { useIsFocused } from "@react-navigation/native";
import { fetchPlaces } from "../util/database";

// function AllPlaces(){
function AllPlaces({ route }){
    const [loadedPlaces, setLoadedPlaces] = useState([]);

    const isFocused = useIsFocused();

    useEffect(() => {
        // we define a function that should execute whenever this function receives data
        // we also use useIsFocused

        async function loadPlaces() {
            // await fetchPlaces();
            const places = await fetchPlaces();
            setLoadedPlaces(places);
        }

        // if (isFocused && route.params) {
        //      // we create loadedPlaces
        //      setLoadedPlaces(curPlaces => [...curPlaces, route.params.place]);
        // }
        if (isFocused) {
            loadPlaces();
        }
    // }, [isFocused, route])
    }, [isFocused])
    // return <PlacesList />;
    return <PlacesList places={loadedPlaces} />;
}

export default AllPlaces;