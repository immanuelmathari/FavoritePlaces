import * as SQLite from 'expo-sqlite';
import { Place } from '../models/place';

// this creates a new database or opens if existing
const database = SQLite.openDatabaseAsync('places.db')

// we want to set up initial db structure that should run at least once
// export function init() {
//     const promise = new Promise((resolve, reject) => {
//         database.transaction((tx) => {
//             tx.executeSql(`CREATE TABLE IF NOT EXISTS places (
//                 id INTEGER PRIMARY KEY NOT NULL,
//                 title TEXT NOT NULL,
//                 imageUri TEXT NOT NULL,
//                 address TEXT NOT NULL,
//                 latitude REAL NOT NULL,
//                 longitude REAL NOT NULL
//                 )`,
//                 [],
//                 // this is a callback executed when done
//                 () => {
//                     resolve();
//                 },
//                 // this is for errors 
//                 (_, error) => {
//                     reject(error);
//                 }
//             );
//         });
//     });
//     return promise;
// }
export async function init() {
    try {
        const database = await SQLite.openDatabaseAsync('places.db');

        await database.execAsync(`
        CREATE TABLE IF NOT EXISTS places (
          id INTEGER PRIMARY KEY NOT NULL,
          title TEXT NOT NULL,
          imageUri TEXT NOT NULL,
          address TEXT NOT NULL,
          latitude REAL NOT NULL,
          longitude REAL NOT NULL
        );
      `);

        return database; // return db instance if you need it elsewhere
    } catch (error) {
        console.error('Error initializing DB:', error);
        throw error;
    }
}

//   export function insertPlace(place) {
//     const promise = new Promise((resolve, reject) => {
//         database.transaction((tx) => {
//             tx.executeSql(`INSERT INTO places (title, imageUri, address, latitude, longitude) VALUES (? , ?, ?, ?, ?)`,
//                 [place.title, place,imageUri, place.address, place.location.latitude, place.location.longitude],
//             (_, result) => {
//                 console.log(result);
//                 resolve(result)
//             },
//             (_, error) => {
//                 reject(error);
//             }
//             );
//         });
//     });
//     return promise;
//   }

export async function insertPlace(place) {
    try {
        const database = await SQLite.openDatabaseAsync('places.db');

        const query = `
        INSERT INTO places (title, imageUri, address, latitude, longitude)
        VALUES (?, ?, ?, ?, ?)
      `;

        const args = [
            place.title,
            place.imageUri, // <- you had a typo here: should be `place.imageUri`, not `place,imageUri`
            place.address,
            place.location.latitude,
            place.location.longitude,
        ];

        const result = await database.runAsync(query, args);
        console.log('Insert result:', result);
        return result;
    } catch (error) {
        console.error('Insert error:', error);
        throw error;
    }
}

// export function fetchPlaces() {
//     const promise = new Promise((resolve, reject) => {
//         database.transaction((tx) => {
//             tx.executeSql('SELECT * FROM places', [],
//                 // help me to convert this into an array like this
//                 (_, result) => {
//                     console.log(result);
//                     // resolve(result);
//                     const places = [];
//                     // dp is a data point
//                     for (const dp of result.rows._array) {
//                         // this places is from my model and looks like this
//                         /*
// export class Place {

//     constructor(title, imageUri, location, id) {
//         // we add id for the database
//         this.title = title;
//         this.imageUri = imageUri;
//         this.address = location.address;
//         this.location = { latitude: location.latitude, longitude: location.longitude};
//         // this.id = new Date().toString() + Math.random().toString();
//         this.id = id;
//     }
// }
//                         */
//                         places.push(new Place(dp.title, dp.imageUri,
//                             { address: dp.address, latitude: dp.latitude, longitude: dp.longitude },
//                             dp.id

//                         )
//                         );
//                     }
//                     // resolve(result);
//                     resolve(places);
//                 },
//                 (_, error) => {
//                     reject(error);
//                 }
//             );
//         });
//     });
//     return promise;
// }

// export async function fetchPlaces() {
//     try {
//         const database = await SQLite.openDatabaseAsync('places.db');


//         const results = await database.getAllAsync(
//             'SELECT * FROM places'
//         );

//         // Optional: log results
//         console.log('Fetched places:', results);

//         return results;
//     } catch (error) {
//         console.error('Error fetching places:', error);
//         throw error;
//     }
// }

// we want to have an array of data
export async function fetchPlaces() {
    try {
      // Open the database
      const database = await SQLite.openDatabaseAsync('places.db');
  
      // Execute the query to fetch all rows
      const rows = await database.getAllAsync('SELECT * FROM places');
  
      console.log('Fetched places:', rows);
  
      // Convert each row into a Place object
      const places = rows.map((dp) => 
        new Place(
          dp.title,
          dp.imageUri,
          { address: dp.address, latitude: dp.latitude, longitude: dp.longitude },
          dp.id
        )
      );
      console.log('places looks now like this after conversion', places)
  
      return places;
    } catch (error) {
      console.error('Error fetching places:', error);
      throw error;
    }
  }

// or
// export function fetchPlaces(database) {
//     return database
//         .getAllAsync('SELECT * FROM places')
//         .then((results) => {
//             console.log('Fetched places:', results);
//             return results;
//         })
//         .catch((error) => {
//             console.error('Error fetching places:', error);
//             throw error;
//         });
// }

// export function fetchPlaceDetails(id) {
//     const promise = new Promise((resolve, reject) => {
//         database.transaction((tx) => {
//             tx.executeSql('SELECT * FROM places WHERE id = ?', [id],
//                 (_, result) => {
//                     console.log(result);
//                     resolve(result.rows._array[0]);
//                 },
//                 (_, error) => {
//                     reject(error);
//                 }
//             );
//         });
//     });
// }

export async function fetchPlaceDetails(id) {
    try {
        // Open the database
        const database = await SQLite.openDatabaseAsync('places.db');

        // Use `getFirstAsync` to fetch the first matching result
        const result = await database.getFirstAsync('SELECT * FROM places WHERE id = ?', [id]);

        // Log the result (for debugging)
        console.log('Fetched place details:', result);

        const place= new Place(
            result.title,
            result.imageUri,
              { latitude: result.latitude, longitude: result.longitude, address: result.address },
              result.id
            )

        return place; 
    } catch (error) {
        console.error('Error fetching place details:', error);
        throw error;
    }
}

