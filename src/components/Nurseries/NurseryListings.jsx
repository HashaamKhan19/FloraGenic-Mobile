import React from 'react';
import {View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import NurseryCard from './NurseryCard';

const NurseryListings = ({navigation}) => {
  const nurseries = [
    {
      id: 1,
      name: 'Happy Seeds Nursery',
      location: '1 Nursery Street, City',
      ratings: '4',
      image: require('../../assets/images/Nurseries/1.jpg'),
    },
    {
      id: 2,
      name: 'Happy Seeds Nursery',
      location: '2 Nursery Street, City',
      ratings: '5',
      image: require('../../assets/images/Nurseries/2.jpg'),
    },
    {
      id: 3,
      name: 'Happy Seeds Nursery',
      location: '3 Nursery Street, City',
      ratings: '3',
      image: require('../../assets/images/Nurseries/3.jpg'),
    },
    {
      id: 4,
      name: 'Happy Seeds Nursery',
      location: '4 Nursery Street, City',
      ratings: '1.5',
      image: require('../../assets/images/Nurseries/4.jpg'),
    },
  ];

  return (
    <View style={styles.container}>
      {nurseries.map(nursery => (
        <TouchableOpacity
          key={nursery.id}
          onPress={() => {
            navigation.navigate('NurseryDetails');
            console.log('ajskdhakjsdhakd');
          }}>
          <NurseryCard
            key={nursery.id}
            image={nursery.image}
            name={nursery.name}
            location={nursery.location}
            ratings={nursery.ratings}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});

export default NurseryListings;
