import * as SQLite from 'expo-sqlite';

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