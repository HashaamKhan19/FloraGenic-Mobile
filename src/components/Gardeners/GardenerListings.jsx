import React from 'react';
import {View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import GardenerCard from './GardenerCard';

const GardenerListings = ({navigation}) => {
  const gardeners = [
    {
      id: 1,
      name: 'Hashaam Khan',
      location: 'i8 Islamabad, zaki center',
      price: '1000',
      image: require('../../assets/images/Nurseries/1.jpg'),
    },
    {
      id: 2,
      name: 'Hashaam Khan',
      location: 'i8 Islamabad, zaki center',
      price: '1000',
      image: require('../../assets/images/Nurseries/1.jpg'),
    },
    {
      id: 3,
      name: 'Hashaam Khan',
      location: 'i8 Islamabad, zaki center',
      price: '1000',
      image: require('../../assets/images/Nurseries/1.jpg'),
    },
  ];

  return (
    <View style={styles.container}>
      {gardeners.map(gardener => (
        <TouchableOpacity
          key={gardener.id}
          onPress={() => {
            navigation.navigate('GardenerDetails');
          }}>
          <GardenerCard
            key={gardener.id}
            image={gardener.image}
            name={gardener.name}
            location={gardener.location}
            price={gardener.price}
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

export default GardenerListings;
