import { useEffect, useState } from "react";
import PlacesList from "../components/PlacesList";
import { useIsFocused } from "@react-navigation/native";

// function AllPlaces(){
function AllPlaces({ route }){
    const [loadedPlaces, setLoadedPlaces] = useState([]);
    const isFocused = useIsFocused();
    useEffect(() => {
        // we define a function that should execute whenever this function receives data
        // we also use useIsFocused
        if (isFocused && route.params) {
             // we create loadedPlaces
             setLoadedPlaces(curPlaces => [...curPlaces, route.params.place]);
        }
    }, [isFocused])
    // return <PlacesList />;
    return <PlacesList places={loadedPlaces} />;
}

export default AllPlaces;