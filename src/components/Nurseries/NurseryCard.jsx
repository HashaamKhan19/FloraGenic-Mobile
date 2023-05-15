import React from 'react';
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Colors from '../../utils/Colors';
import Star from '../../assets/svg/star.svg';

const NurseryCard = ({image, name, location, ratings}) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Image source={image} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.location}>{location}</Text>
        <View style={styles.ratingContainer}>
          <Star fill={Colors.secondaryGreen} />
          <Text style={styles.rating}>{ratings}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 4,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
    color: Colors.secondaryGreen,
  },
  location: {
    fontSize: 16,
    color: Colors.black,
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 6,
    color: Colors.secondaryGreen,
  },
  ratingText: {
    fontSize: 16,
    color: '#888888',
  },
});

export default NurseryCard;
