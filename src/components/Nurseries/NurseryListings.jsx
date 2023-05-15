import React from 'react';
import {View, StyleSheet} from 'react-native';
import NurseryCard from './NurseryCard';

const NurseryListings = () => {
  return (
    <View style={styles.container}>
      <NurseryCard
        image={require('../../assets/images/Nurseries/1.jpg')}
        name="Happy Seeds Nursery"
        location="123 Nursery Street, City"
        ratings="4.5"
      />
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
