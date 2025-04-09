import { useState } from "react";
import { launchCameraAsync, useCameraPermissions, PermissionStatus } from "expo-image-picker";
import { Alert, Button, Image, StyleSheet, Text, View } from "react-native";
import { Colors } from '../../constants/colors'
import OutlinedButton from "../UI/OutlinedButton";

function ImagePicker({onTakeImage}) {
// function ImagePicker() {
    const [cameraPermissionInformation, requestPermission] = useCameraPermissions();
    const [pickedImage, setPickedImage] = useState(null);

    console.log('you hit image picker');

    async function verifyPermissions() {
        if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission();
            return permissionResponse.granted;
        }
        if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
            Alert.alert('Insufficient Permissions!', 'You need to grant camera permissions to use this app');
            return false;
        }
        return true;
    }

    async function takeImageHandler() {
        console.log('you hit takeImageHandler');
        const hasPermission = await verifyPermissions();
        if (!hasPermission) return;

        try {
            const image = await launchCameraAsync({
                allowsEditing: false,
                aspect: [16, 9],
                quality: 0.5,
            });

            if (!image || image.canceled) {
                console.log("User cancelled image capture");
                return;
            }

            const imageUri = image.assets[0]?.uri;
            console.log("Image result:", imageUri);
            setPickedImage(imageUri); 
            onTakeImage(imageUri);
        } catch (error) {
            console.error("Camera error:", error);
        }
    }

    let imagePreview = <Text>No image taken yet.</Text>
    if(pickedImage) {
        imagePreview =  <Image source={{ uri: pickedImage }} style={styles.image} />
    }

    return (
        <View >
            {/* {pickedImage && <Image source={{ uri: pickedImage }} style={{ width: 200, height: 200 }} />} */}
            <View style={styles.imagePreview}>{imagePreview}</View>
            {/* <Button title="Take Image" onPress={takeImageHandler} /> */}
            <OutlinedButton onPress={takeImageHandler} icon="camera" >Take Image</OutlinedButton>
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
    }
})
