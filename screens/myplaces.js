import React, { useEffect, useState } from 'react';
import { View, FlatList, Text } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { Header, Icon, Input, Button, ListItem } from 'react-native-elements';

const db = SQLite.openDatabase('myPlacesdb.db');

export default function MyPlaces({navigation}) {
    const [place, setPlace] = useState('');
    const [data, setData] = useState([]);
  
useEffect(() => {
    db.transaction(tx => {
        tx.executeSql('create table if not exists myPlaces (id integer primary key not null, place text);');
    }, null, updateList
    );
}, []);

  const saveItem = () => {
    db.transaction(tx => {
        tx.executeSql('insert into myPlaces(place) values (?);', [place]);
    }, null, updateList
    )
  }

  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from myPlaces;', [], (_, { rows }) =>
        setData(rows._array)
      ); 
    });
  }

  const deleteItem = (id) => {
    db.transaction(
        tx => {
            tx.executeSql(`delete from myPlaces where id = ?`, [id]);
        }, null, updateList
    )
  }
    return (
      <View>
        <Text>Address must be written with a comma in between address and city. For example Mannerheimintie 1, Helsinki</Text>
  <Input placeholder='Type in adress' label='PLACEFINDER' onChangeText={place => setPlace(place)} value={place} />
    <Button buttonStyle={{backgroundColor: 'gray'}} raised icon={{name:'save', color:'white'}} onPress={saveItem} title="SAVE" />
    <FlatList
      keyExtractor={(item, index) => index.toString()}
      data={data}
      renderItem={({ item }) =>
      <ListItem bottomDivider onLongPress={() => deleteItem(item.id)}>
        <ListItem.Content>
          <ListItem.Title>{item.place}</ListItem.Title>
          </ListItem.Content>
          <Text onPress={() => navigation.navigate("Map", item.place)} style={{color: 'gray'}}>
            show on map
    </Text>
    <Icon name='keyboard-arrow-right' color='gray'/>
        </ListItem>
      }
    />
  </View>
);
}