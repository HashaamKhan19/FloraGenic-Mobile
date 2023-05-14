import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import Colors from '../../utils/Colors';
import Star from '../../assets/svg/star.svg';
import dimensions from '../../utils/Dimensions';

const ProductCard = ({imageSource, name, ratings, amountSold, price}) => {
  return (
    <View style={styles.container}>
      <Image source={{uri: imageSource}} style={styles.image} />
      <Text style={styles.name}>{name}</Text>
      <View style={styles.infoContainer}>
        <View style={styles.ratingsContainer}>
          <Star fill={Colors.secondaryGreen} />
          <Text style={styles.ratings}>{ratings}</Text>
        </View>
        <Text style={{color: Colors.black}}>|</Text>
        <View style={styles.soldCont}>
          <Text style={styles.amountSold}>{amountSold} Sold</Text>
        </View>
      </View>
      <Text style={styles.price}>${price}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 260,
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
  ratingsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 5,
    alignItems: 'center',
  },
  ratings: {
    color: Colors.black,
    fontSize: 16,
  },
  amountSold: {
    color: Colors.secondaryGreen,
    fontSize: 16,
  },
  price: {
    fontSize: 21,
    fontWeight: 'bold',
    color: Colors.secondaryGreen,
    marginTop: 3,
  },
  soldCont: {
    borderWidth: 1,
    borderColor: Colors.secondaryGreen,
    borderStyle: 'solid',
    paddingVertical: 3,
    paddingHorizontal: 4,
    borderRadius: 10,
  },
});

export default ProductCard;
