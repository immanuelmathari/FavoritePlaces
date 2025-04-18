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


## 12.194 Global Colors and Styling
App.js 
@options - title 
we create constants/
colors.js
App.js 
@Stack.Navigator 
- to change background
- whenever we want to make a change affecting all screens we do it in Stack.Navigator
PlacesList.js
@fallbackTex

## 12.195 Getting Started with a custom Form
PlaceForm.js
- We want to get a title for every place 
- allow a user to take photos
- show a preview of that photo
- so we also set state for the TextInput
- you need to know that if changeTitleHandler is the onChangeText function for TextInput, that function changeTitleHandler will receiver a default prop from react native enteredText. but im not sure about this. it might be because of our useState

## 12.196 Adding & Configuring the Camera Package (for Native Camera Access)
create 
components/Places/
ImagePicker.js
- we open the camera,
- show a button to allow taking the picture
expo camera
expo location 
expo storage
https://docs.expo.dev/versions/latest/sdk/camera/
https://docs.expo.dev/versions/latest/sdk/imagepicker/
> npm install expo-image-picker 
- we need to register permisions
you add plugins to app.json that you find in the dos
- we want to open the camera so we use plugin cameraPermission
"cameraPermission": "The app accesses your camera to take photos of your favorite places."
NOTE) Say this is something you can do

## 12.197 Taking Photos on android
imagePicker.js
- we import launchCameraAsync from expo-image-picker and it returns a promise before it finishes taking the photo because the user has to take time and capture the shot
- to configure your camera, you pass a configuration to launchCameraAsync
https://docs.expo.dev/versions/latest/sdk/imagepicker/
ImagePickerOptions
- options are heer
PlaceForm.js
- go add this file ImagePicker
***
198
ImagePicker.js
@useCameraPermissions() for ios 
199. Showing an image preview
NOTE) if an image comes from a source, we have to have style width and style. this is where we dont require an image

Very very Big NOTE)
https://dontkillmyapp.com/samsung
There is no good and easy solution.

What is happening is, when you launch the camera, it launches as a new Activity, leaving your app mainActivity in background.

From Android P (9) and on, the OS can kill your background activity. There is even a website just about whose implementation is worse for devs: https://dontkillmyapp.com/

Possible solutions:

Be prepared to crash. Save all states and navigation stack on local-storage, launchCamera. The app will restart, you will restore all the screen/navigation/data/etc, and get photo using the ImagePicker.getPendingResultAsync.
Change lib to expo-camera or react-native-vision-camera as they use the camera on mainActivity but needs boring reimplementation, and don' t look as good as the manufacturer native cameras.

I had set my phone's developer options for the background task to none so anytime expo go launched the camera, it was launching a new activity and it would kill my app. a solution would be this below
- use expo-camera (lauches camera within the app not exteranlly)
npx expo install expo-camera
import { useEffect, useRef, useState } from "react";
import { Camera } from "expo-camera";
import { Alert, Button, Image, StyleSheet, Text, View } from "react-native";
import { Colors } from '../../constants/colors';

function ImagePicker() {
    const [hasPermission, setHasPermission] = useState(null);
    const [pickedImage, setPickedImage] = useState(null);
    const [isCameraVisible, setIsCameraVisible] = useState(false);
    const cameraRef = useRef(null);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    if (hasPermission === null) {
        return <View><Text>Requesting permissions...</Text></View>;
    }

    if (hasPermission === false) {
        return <View><Text>No access to camera</Text></View>;
    }

    async function takePicture() {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync({
                quality: 0.5,
                skipProcessing: true,
            });

            console.log("Image captured:", photo.uri);
            setPickedImage(photo.uri);
            setIsCameraVisible(false); // hide camera preview after taking photo
        }
    }

    let imagePreview = <Text>No image taken yet.</Text>;
    if (pickedImage) {
        imagePreview = <Image source={{ uri: pickedImage }} style={styles.image} />;
    }

    return (
        <View style={{ flex: 1 }}>
            {!isCameraVisible && (
                <>
                    <View style={styles.imagePreview}>
                        {imagePreview}
                    </View>
                    <Button title="Take Image" onPress={() => setIsCameraVisible(true)} />
                </>
            )}

            {isCameraVisible && (
                <View style={styles.cameraContainer}>
                    <Camera ref={cameraRef} style={styles.camera} type={Camera.Constants.Type.back} />
                    <Button title="Capture" onPress={takePicture} />
                    <Button title="Cancel" onPress={() => setIsCameraVisible(false)} />
                </View>
            )}
        </View>
    );
}

export default ImagePicker;

const styles = StyleSheet.create({
    imagePreview: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary100,
        borderRadius: 4,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    cameraContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    camera: {
        flex: 1,
        width: '100%',
    },
});

two, use a getPendingResultAsync()
import * as ImagePicker from 'expo-image-picker';

useEffect(() => {
  async function getImageAfterCrash() {
    const result = await ImagePicker.getPendingResultAsync();
    if (result && result.length > 0) {
      const imageUri = result[0].assets?.[0]?.uri;
      if (imageUri) {
        setPickedImage(imageUri);
      }
    }
  }
  getImageAfterCrash();
}, []);
 
 or simply remove this developer option. my friend i went for this option..

 but id like you to set it back and go to apps where the same feature of launching an app is needed and see what happens to other apps

 ## 12.200 Creating a Custom Button
 create 
 Ui/
 OutlineButton.js
 - we use this button in 
 ImagePicker
 where there was @Button -> OutlinedButton

 ## 12.201 Location Picker
 create
 Places/
 LocationPicker.js
  
  NOTE) when we say flex row we are saying that we want the buttons to sit on the same row

we use it in 
PlaceForm.js

## 12.202 Locating Users
- we want to get location  of the users

https://docs.expo.dev/versions/latest/sdk/location/

> npx expo install expo-location
- in some apps, not that you'd require to get location while its in the background

LocationPicker.js
we inport getCurrentPositionAsync
@LocationPicker
- we say we need to get permission
@verifyPermissions
- this is where we use useForegroundPermissions
- now we use this in 
@getLocationHandler

## 12.203 Adding a preview location map
- we use this api
https://developers.google.com/maps/documentation/maps-static/overview

Go to Get Started > and create a project
https://console.cloud.google.com/google/maps-apis/home?project=react-native-myfavoriteapp&invt=AbuSwA

- we get api key for that and then 

create
util/
location.js
- we paste the google maps api and refactor it from 

https://maps.googleapis.com/maps/api/staticmap?center=Brooklyn+Bridge,New+York,NY&zoom=13&size=600x300&maptype=roadmap
&markers=color:blue%7Clabel:S%7C40.702147,-74.015794&markers=color:green%7Clabel:G%7C40.711614,-74.012318
&markers=color:red%7Clabel:C%7C40.718217,-73.998284
&key=YOUR_API_KEY&signature=YOUR_SIGNATURE

- we change the size

to 

https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=13&size=400x2&maptype=roadmap&markers=color:red%7Clabel:S%7C${latitude},${longitude}&key=${GOOGLE_API_KEY}

we use it in
LocationPicker.js 
@mapPreview
@pickedLocation state

## 12.204 Adding an interactive Map
- we want to add a full screen map when the pick on map is pressed
Map.js
- we use expo-maps
https://docs.expo.dev/versions/latest/sdk/map-view/
> npx expo install react-native-maps

TODO i keep getting this warning 
https://docs.expo.dev/guides/new-architecture/

- we use MapView and we also need a marker using initialRegion to control the region shown when the map first loads

App.js 
- register a new screen to get here
- we navigate to it through LocationPicker.js
LocationPicker.js
@pickOnMapHandler
- remember because LocationPicker is not a screen component, we have to add the navigation prop or use useNavigation
- we now need to add styles to see it flex 1
Map.js

## 12.205 Allowing Map Interaction & Adding Markers
- we want to know and detect when the user clicks a place
Map.js
- the MapView can give us those coordinates
- we use the @selectedLocationHandler
- then we save them i a state @selectedLocation state
- then we add a @Marker inside MapView
- we render this marker conditionally when we have this marker

## 12.206 Confirming Picked Locations and going back with the location or alerting when there is none
Map.js
@savePickedLocationHandler()
- okay, if its not a screen component, use useNavigation if it is, add a prop {navigation}
- we see how to add parameters as we pass from screen to screen. we use this to pass the data we picked
- so we add a button that can add the location
- we use headerOptions, we use useLayoutEffect. - this allows us to run some code when this component is rendered for the first time
- after adding the useLayoutEffect, we realise that we risk running into an infinite loop because at the dependancies we are passing a function TODO research on this NOTE so what we do is we wrap the savePickedLocationHandler with reacts useCallback hook
- useCallback ensures that a function is not recreated un-necessarily
- so its whenever this changes [navigation, selectedLocation] that we call that function savePickedLocationHandler

## 12.207 Previewing Picked Locations
LocationPicker.js
- we want to set if the user decided to pick a random location instead
- we want to get data provided by Maps here we use useNavigation we could also useRoute
@route useRoute
- we want in @mapPickedLocation to set what we put in pickedLat
@useEffect
- you need to know that say when we go from AppPlace to Map to set a map through a stack Navigation the map is placed ontop of AddPlace but when we go back we dont get what we had in Map component. 
- so we cant use useEffect because there was no rerender. so  we use useIsFocused() this hook returns a boolean true if the screen is focused else false. so when we move from appPlace to Map screen this return false. so this isFocused will be false when we switch to map screen and true when we come from the map

## 12.208 Adding a Form Submit Button
create
Ui/
Button.js
- we use this button in
PlaceForm.js

## 12.209 Managing Location & Image State in the Form
PlaceForm.js
be keen much more dont loose track of what we tryna do
@ImagePicker and LocationPicker we add onTakeImage and onPickLocation. these are to help us to pass data from ImagePicker and LocationPicker back to placeform so we can have these props
- then we add @takeImageHandler and @pickLocationHandler and add states selectedImage and pickedLocation
- we go make sure that these functions are called from these components
ImagePicker.js
we add @onTakeImage at @launchCameraAsync undersand that we want to manage this image externaly so we want to call onTakeImage whenever an image is taken. we are trying to pass it back.
LocationPicker.js
- here we just add another effect when that state pickedLocation changes
- we need to wrap pickedLocationHandler with a useCallback effect to avoid unnecessary renders
- all this was to help us have the functions takeImageHandler and pickLocationHandler when the user takes a photo or picks a location
- the purpose is to have our data in place form from everywhere we get it from
- now at savePlaceHandler we get all our data imagine

## 12.210 Converting picked locations to Human-Readable Address
- we use GeoCoding API
- allows us to translate addresses to coordinates and coordinates to addresses the latter is called reverse geocodng
https://developers.google.com/maps/documentation/geocoding/overview
- enable this api
- in console.cloud.google, make sure you enable geocoding api
- in credentials, take the api key
location.js
@getAddress
- look for reverse geocoding requests and response
- in fetch, we get a response once the promise resolves
LocationPicker.js
- we want to execute this 
@2nd UseEffect
NOTE) say you know how to handle asynchronous events
- so this is sent to the function that is received by onPickLocation which is in placeForm, pickLocationHandler 
so in 
PlaceForm.js,
pickLocationHandler will have the latitude and longitude coordinates and human readable address

## 12.211 Passing Entered Data to the AllPlaces Screen
AddPlace.js
- we want to pass createPlaceHandler through props to PlaceForm so that we trigger this function
PlaceForm.js
@ funtion header
@savePlaceHandler
- our placeData should follow the structure we defined in Place.js
Place.js 
export it
PlaceForm.js
@savePlaceHandler
- then we add it in 
AddPlace.js
@return PlaceForm

## 12.212 Outputting a list of places
AllPlaces.js
- we want to get that data we are passing
- and then AllPlaces fowards data to PlaceList.js

## 12.213 Styling Place Items
PlaceItem.js

## 12.214 SQLite initialization
https://docs.expo.dev/versions/v50.0.0/sdk/sqlite/
- runs on android and ios
> npx expo install expo-sqlite
create 
util/
database.js
- i want you to know NOTE TODO learn SQL 
- NOTE NB that we dont store images in the database rather we store paths
- we execute this code in 
App.js
@useEffect
- we also want to load
> expo install expo-app-loading
- to find out if we done we use a 
@useState dbInitialized

check this warning
expo-app-loading is deprecated in favor of expo-splash-screen: use SplashScreen.preventAutoHideAsync() and SplashScreen.hideAsync() instead.

Expo SDK 52 introduced breaking changes in how SQLite is accessed. The new openDatabaseAsync() method returns a promise, so the database you're currently assigning isn't actually the database itself, but a pending promise.

That’s why database.transaction is undefined — you're trying to call .transaction() on a Promise, not the actual database instance.

## 12.215 Inserting Data into Expo SQL 52
database.js
- we use ? to insert dynamic data

## 12.216 Inserting Places(records) into the database
AddPlace.js
@createPlaceHandler

## 12.217 Fetching Places in the Database
database.js
@fetchPlaces
AllPlace.js
@useEffect for setting up the database
- when we know that this screen is focused, we want to get the latest data/fetch data
AddPlace.js
- remove navigation dependancy that was carrying our data initially

- now we want to convert our data into an array datapoints

GPT:
With the new API, the query result from getAllAsync is an array of row objects. You can simply map over that array and create your Place objects. 

then in 
AllPlaces.js
we set our places like that at the 
@useEffect

- but i feel like the way it was was just okay

## 12.218 Adding the Place Details Screen
PlaceDetails.js

AllPlaces.js
- we want to make sure we can navigate to a single place
PlacesList.js
@ PlaceItem
- we add onSelect
@useNavigation
@selectPlaceHandler
- we set up route params here coz well need them in PlaceDetails.js
- so in PlaceList is where we call the selectPlaceHandler that needs a routeId, so we place it PlaceItem.js so here is where
PlaceItem.js
we use the onPress bind
- we then register that screen
App.js
- we add screen PlaceDetails

## 12.219 Fetching Place Details Data from the DataBase
database.js
@fetchPlaceDetails
PlaceDetails.js
@useEffect
- we add a state to put it in a state
@fetchedPlace
- we also want to update our header title so we add navigation prop in the title and setOptions. and we do it in useEffect not in useLayoutEffect because we cant set it while we are transitioning to this screen because we wount have fetched at that time
then in 
PlaceDetails.js
- we set the values
- we also add an ifcheck to see if data isset if !fetchedPlace

## 12.220 Showing a readonly map
PlaceDetails.js
@showonMapHandler
- we open the map
- so set the marker,
Map.js
@initialLocation
- we override region if we have a location
- and we set the marker to use the initial location througn the selectedLocation state
- then the if initialLocation isset in the 
@useLayoutEffect, we dont put the save 
- now we want to set the route parameters used in Map.js
in
PlaceDetails.js
@showonMapHandler and the navigate we set route parameters
- we need to go set the fetchPlaceDetails result to our constructor Place object