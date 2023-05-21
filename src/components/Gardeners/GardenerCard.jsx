import React from 'react';
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Colors from '../../utils/Colors';

const GardenerCard = ({data}) => {
  return (
    <View style={styles.container}>
      <Image source={{uri: data?.image}} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>
          {data?.firstName} {data?.lastName}
        </Text>
        <Text style={styles.location}>{data?.city}</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>
            Rs. {data?.price} / {data?.duration}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
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
    width: 100,
    height: 100,
    borderRadius: 4,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 16,
  },
  name: {
    fontSize: 24,
    fontFamily: 'Urbanist-Bold',
    marginBottom: 4,
    color: Colors.secondaryGreen,
  },
  location: {
    fontSize: 18,
    color: Colors.black,
    marginBottom: 4,
    fontFamily: 'Urbanist-Medium',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 20,
    fontFamily: 'Urbanist-Bold',
    // marginLeft: 2,
    color: Colors.secondaryGreen,
  },
  ratingText: {
    fontSize: 16,
    color: '#888888',
  },
});

export default GardenerCard;
