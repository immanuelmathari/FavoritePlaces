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

## 12.191 Editing the Favorite Places List
PlacesList.js
@FlatList renderItem
- we get every element as an object
renderItem={({item})}
create 
components/PlaceItem.js
PlaceItem.js just write starter code
PlaceList.js 
@FlatList renderItem, item will be an object that carries the data in place.js
PlaceItem.js
- we work on the structure of the return 
- add the prop place because we have to be expecting it as we pass it from PlacesList at the FlatList.
- this is an object
- we need to pass on a function that should be executed when Pressable is clicked
- we need to foward the value we get from the prop to the onPress in Pressable
- add the styles
PlacesList.js
- we add fall back test @!places || ..
- style
- with this two, we use them in 
AllPlaces.js

## 12.192 Adding a add place screen + Navigation
AddPlace.js
- we want to return an interface to allow us to add a new place
create components/
PlaceForm.js
- go add it in the 
AddPlaces.js
- we want to add navigation
> npm install @react-navigation/native @react-navigation/native-stack
App.js
- we need navigationContainer and createNativeStackNavigator
- remember that every screen receives a name