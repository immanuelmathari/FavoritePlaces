const GOOGLE_API_KEY = 'AIzaSyAHZMQKYMj6r2pCwxF53IVSQIJD3CFWNbk';

export function getMapPreview(latitude, longitude) {
    const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${latitude},${longitude}&key=${GOOGLE_API_KEY}`

    return imagePreviewUrl;
}

export async function getAddress(latitude, longitude) {
    // we want to send a reverse geocoding to 
    // this url we get it from geocoding api google
    // https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=YOUR_API_KEY
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`
    const response = await fetch(url);
    if(!response.ok) {
        throw new Error('Failed to fetch address!');
    }
    const data = await response.json();
    // we get this from the docs we see the kind of result we'll get back
    const address = data.results[0].formatted_address;
    return address;
}