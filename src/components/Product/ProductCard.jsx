import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import Colors from '../../utils/Colors';
import Star from '../../assets/svg/star.svg';

const ProductCard = ({data}) => {
  return (
    <View style={styles.container}>
      <Image source={{uri: data?.images[0]}} style={styles.image} />
      <Text style={styles.name}>{data?.name}</Text>
      <View style={styles.infoContainer}>
        <View style={styles.ratingsContainer}>
          <Star fill={Colors.secondaryGreen} />
          <Text style={styles.ratings}>{data?.overallRating?.toFixed(1)}</Text>
        </View>
        <Text style={{color: Colors.black}}>|</Text>
        <View style={styles.soldCont}>
          <Text style={styles.amountSold}>{data?.sold} Sold</Text>
        </View>
      </View>
      <Text style={styles.price}>Rs. {data?.retailPrice}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 260,
    maxWidth: '100%',
    // backgroundColor: Colors.lightGray,
    borderColor: Colors.lightGray,
    borderWidth: 1,
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
    color: Colors.black,
    marginTop: 10,
    fontFamily: 'Urbanist-Bold',
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
    fontFamily: 'Urbanist-Regular',
  },
  amountSold: {
    color: Colors.secondaryGreen,
    fontSize: 16,
    fontFamily: 'Urbanist-Regular',
  },
  price: {
    fontSize: 21,
    color: Colors.secondaryGreen,
    marginTop: 3,
    fontFamily: 'Urbanist-ExtraBold',
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
