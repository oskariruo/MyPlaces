import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Button, TextInput, Alert } from 'react-native';
import Mapview, { Marker } from 'react-native-maps'

export default function Map(place) {
    const latitudeDelta= 0.0322;
    const longitudeDelta= 0.0221;
    const key= "YQArfeZ6vUbfN2xDe9A1Trk0f8PlcrKD";

    const [region, setRegion] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: latitudeDelta,
        longitudeDelta: longitudeDelta,
    });
    useEffect(() => {
        fetch(`https://www.mapquestapi.com/geocoding/v1/address?key=${key}&location=${place.route.params}`)
        .then((response) => response.json())
        .then(data => {
            location = data.results[0].locations[0]

            setRegion({
                latitude: location.latLng.lat,
                longitude: location.latLng.lng,
                latitudeDelta: latitudeDelta,
                longitudeDelta: longitudeDelta
          });
        })
        .catch((e) => { Alert.alert('Error', e);
    });
    
    })


    return (
        <View style={styles.container}>
            <Mapview
            style={{flex: 1, height: '100%', width: '100%'}}
            region={region}>
                <Marker
                coordinate={{
                    latitude: region.latitude,
                    longitude:region.longitude}}
                    title={place.route.params}/>
            </Mapview>
        </View>
    )
    
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    }
  });