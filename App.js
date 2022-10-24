import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyPlaces from './screens/myplaces';
import Map from './screens/map';


export default function App() {

  const Stack =createNativeStackNavigator();

  return (
    <NavigationContainer style={styles.container}>
          <Stack.Navigator>
            <Stack.Screen name='My Places' component={MyPlaces}/>
            <Stack.Screen name='Map' component={Map}/>
          </Stack.Navigator>
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
