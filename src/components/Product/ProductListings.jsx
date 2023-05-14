import React from 'react';
import {View, StyleSheet} from 'react-native';
import ProductCard from './ProductCard';

const ProductListings = () => {
  return (
    <View style={styles.container}>
      <ProductCard
        imageSource="https://images.unsplash.com/photo-1528475563668-e15742001b92?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
        name="Beautiful Plant"
        ratings={4.5}
        amountSold={120}
        price={29.99}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

export default ProductListings;
