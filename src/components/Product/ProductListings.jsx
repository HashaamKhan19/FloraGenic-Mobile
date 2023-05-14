import React from 'react';
import {View, ScrollView, StyleSheet, Dimensions} from 'react-native';
import {PanGestureHandler, State} from 'react-native-gesture-handler';
import ProductCard from './ProductCard';

const {width: screenWidth} = Dimensions.get('window');

const ProductListings = ({products}) => {
  const handleGestureEvent = ({nativeEvent}) => {
    if (nativeEvent.translationX > 50 && nativeEvent.state === State.ACTIVE) {
      console.log('Swiped right');
    } else if (
      nativeEvent.translationX < -50 &&
      nativeEvent.state === State.ACTIVE
    ) {
      console.log('Swiped left');
    }
  };

  return (
    <ScrollView
      horizontal
      contentContainerStyle={styles.container}
      showsHorizontalScrollIndicator={false}>
      {products.map((product, index) => (
        <PanGestureHandler key={index} onGestureEvent={handleGestureEvent}>
          <View style={styles.productContainer}>
            <ProductCard
              imageSource={product.image}
              name={product.name}
              ratings={product.rating}
              amountSold={product.amountSold}
              price={product.price}
            />
          </View>
        </PanGestureHandler>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  productContainer: {
    width: screenWidth * 0.45,
    marginHorizontal: 5,
  },
});

export default ProductListings;
