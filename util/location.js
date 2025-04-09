const GOOGLE_API_KEY = 'AIzaSyAHZMQKYMj6r2pCwxF53IVSQIJD3CFWNbk';

export function getMapPreview(latitude, longitude) {
    const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${latitude},${longitude}&key=${GOOGLE_API_KEY}`

    return imagePreviewUrl;
}