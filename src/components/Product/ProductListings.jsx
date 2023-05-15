import React from 'react';
import {ScrollView, StyleSheet, Dimensions} from 'react-native';
import {
  PanGestureHandler,
  State,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import ProductCard from './ProductCard';

const {width: screenWidth} = Dimensions.get('window');

const ProductListings = ({products, navigation}) => {
  const handleGestureEvent = ({nativeEvent}) => {
    if (nativeEvent.translationX > 50 && nativeEvent.state === State.ACTIVE) {
      console.log('Swiped right ->');
    } else if (
      nativeEvent.translationX < -50 &&
      nativeEvent.state === State.ACTIVE
    ) {
      console.log('Swiped left <-');
    }
  };

  return (
    <ScrollView
      horizontal
      contentContainerStyle={styles.container}
      showsHorizontalScrollIndicator={false}>
      {products.map((product, index) => (
        <PanGestureHandler key={index} onGestureEvent={handleGestureEvent}>
          <TouchableOpacity
            style={styles.productContainer}
            onPress={() => navigation.navigate('ProductDetails')}>
            <ProductCard
              imageSource={product.image}
              name={product.name}
              ratings={product.rating}
              amountSold={product.amountSold}
              price={product.price}
            />
          </TouchableOpacity>
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
