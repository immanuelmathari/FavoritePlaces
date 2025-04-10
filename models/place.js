// class Place {
export class Place {
    // constructor(title, imageUri, address, location) {
    //     this.title = title;
    //     this.imageUri = imageUri;
    //     this.address = address;
    //     this.location = location;
    //     this.id = new Date().toString() + Math.random().toString();
    // }
    constructor(title, imageUri, location, id) {
        // we add id for the database
        this.title = title;
        this.imageUri = imageUri;
        this.address = location.address;
        this.location = { latitude: location.latitude, longitude: location.longitude};
        // this.id = new Date().toString() + Math.random().toString();
        this.id = id;
    }
}