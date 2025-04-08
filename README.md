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

## 12.193 Adding a Header Buttons
App.js
- we want to have a plus button in AllPlaces to go to addPlaces
- never forget that tintColor is what we get as a default prop
- we need to add an icon
create components/UI/
IconButton.js
- when building reusable components, we have things that we must add onto it from the place its being used thats why we use props. props is like saying we take this data from where this component will be used and bring it here to build it
- in the view the values that belong to this place say in onPress are the ones on the left. what we bring in is on the right
- we use this reusable component in App.js
App.js
- so where we use the reusable component, we need to pass data that will go and feed the componenet ili iijenge . the component is like the skeleton and the data we give it is like the meat. so like app says, on its left hii ndio unataka and on its right we give it.
- at this point, we need to have access to navigation so that we can navigate to that place. 
so we turn the options into a function
when its like this
{( ) =>
we get an object from here we need to destructure it
so we add the {( {} )}
- remember that we use onPressOut in the navigations