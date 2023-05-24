import React from 'react';
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Colors from '../../utils/Colors';
import Star from '../../assets/svg/star.svg';

const NurseryCard = ({image, name, location, ratings}) => {
  console.log('NurseryCard.jsx: NurseryCard: image: ', image);

  return (
    <View style={styles.container}>
      <Image source={{uri: image}} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.location} numberOfLines={1} ellipsizeMode="tail">
          {location}
        </Text>
        <View style={styles.ratingContainer}>
          <Star fill={Colors.secondaryGreen} />
          <Text style={styles.rating}>{ratings}</Text>
        </View>
      </View>
    </View>
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
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    marginBottom: 20,
    width: '100%',
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
    fontFamily: 'Urbanist-Bold',
    marginBottom: 4,
    color: Colors.secondaryGreen,
  },
  location: {
    fontSize: 16,
    color: Colors.black,
    marginBottom: 4,
    fontFamily: 'Urbanist-Regular',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 16,
    fontFamily: 'Urbanist-Bold',
    marginLeft: 6,
    color: Colors.secondaryGreen,
  },
});

export default NurseryCard;
