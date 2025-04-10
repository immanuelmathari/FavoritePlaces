import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AllPlaces from './screens/AllPlaces';
import AddPlaces from './screens/AddPlace';
import IconButton from './components/UI/IconButton';
import { Colors } from './constants/colors';
import Map from './screens/Map';
import { useEffect, useState } from 'react';
import { init } from './util/database';
import AppLoading from 'expo-app-loading';
import PlaceDetails from './screens/PlaceDetails';

const Stack = createNativeStackNavigator();

export default function App() {
  const [dbInitialized, setDbInitialized] = useState();
  // useEffect(() => {
  //   init().then(() => {
  //     // this then is the good old way to set callbacks from promises
  //     setDbInitialized(true);
  //   }).catch((err) => {
  //     console.log(err);
  //   });
  // }, []); // since this dependancy is empty it executes when the app intializes

  useEffect(() => {
    async function initializeDatabase() {
      try {
        await init(); // runs the async init
        setDbInitialized(true);
      } catch (err) {
        console.log('DB init failed:', err);
      }
    }
  
    initializeDatabase();
  }, []);

  if(!dbInitialized){
    return <AppLoading />;
  }
  return (
    <>
    <StatusBar style="dark" />
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500},
        headerTintColor: Colors.gray700,
        contentStyle: { backgroundColor: Colors.gray700}
      }}>
        {/* <Stack.Screen name="AllPlaces" component={AllPlaces} options={{
           headerRight: ({tintColor }) => <IconButton icon="add" size={24} color={tintColor} onPress={() => } />
        }} /> */}
        <Stack.Screen name="AllPlaces" component={AllPlaces} options={( {navigation} ) => ({
          title: "Your Favorite places",
           headerRight: ({tintColor }) => <IconButton icon="add" size={24} color={tintColor} onPress={() => navigation.navigate('AddPlace')} />
        })} />
        <Stack.Screen name="AddPlace" component={AddPlaces} options={{
          title: 'Add a new place',
        }} />
        <Stack.Screen name="Map" component={Map} /> 
        <Stack.Screen name="PlaceDetails" component={PlaceDetails} options={{
          title: 'Loading Place...',
        }} />
      </Stack.Navigator>
    </NavigationContainer>
    </>
  );
}

