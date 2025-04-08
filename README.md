# This is a favorite places App

## 12.190 Adding a "Favorite Places" List
- we add screens and components folder and in 
screens/AllPlaces.js and 
screens/PlaceDetails.js and 
screens/AddPlace.js and 
screens/Map.js

AllPlaces.js
- this one is to show the places

create 
components/PlacesList.js
- here we shall be outputing our places so we expect a list and display with a FlatList

- we define a blueprint for our places 
create 
models/place.js
place.js
- this will be our constructor
PlacesList.js
- renderItem is what points to the function that will be executed when the list is called. yani, how each list will be outputted