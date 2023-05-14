import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import Colors from '../../utils/Colors';

const ProductCard = ({imageSource, name, ratings, amountSold, price}) => {
  return (
    <View style={styles.container}>
      <Image source={{uri: imageSource}} style={styles.image} />
      <Text style={styles.name}>{name}</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.ratings}>{ratings}</Text>
        <Text style={{color: Colors.black}}>|</Text>
        <Text style={styles.amountSold}>{amountSold} Sold</Text>
      </View>
      <Text style={styles.price}>${price}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 250,
    maxWidth: 180,
    backgroundColor: Colors.lightGray,
    borderRadius: 20,
    padding: 10,
    marginTop: 10,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.black,
    marginTop: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratings: {
    color: Colors.black,
  },
  amountSold: {
    color: Colors.black,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.secondaryGreen,
  },
});

export default ProductCard;
