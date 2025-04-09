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