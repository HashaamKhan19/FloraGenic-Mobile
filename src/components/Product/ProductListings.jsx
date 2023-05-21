import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  View,
} from 'react-native';
import {PanGestureHandler, State} from 'react-native-gesture-handler';
import ProductCard from './ProductCard';
import {gql, useQuery} from '@apollo/client';
import {ActivityIndicator} from 'react-native-paper';
import Colors from '../../utils/Colors';

const GET_PRODUCTS = gql`
  query ExampleQuery {
    products {
      id
      nurseryID
      nursery {
        name
        id
        details
        images
      }
      name
      description
      category {
        name
      }
      hidden
      retailPrice
      wholesalePrice
      stock
      sold
      images
      overallRating
      tags
      createdAt
      updatedAt
      reviews {
        createdAt
        likes
        rating
        review
        userID
      }
    }
  }
`;

const {width: screenWidth} = Dimensions.get('window');

const ProductListings = ({products, navigation}) => {
  const {data, loading, error} = useQuery(GET_PRODUCTS);

  const firstFourProducts = data?.products.slice(0, 4);

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
      {loading && (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 50,
          }}>
          <ActivityIndicator animating={true} color={Colors.secondaryGreen} />
        </View>
      )}

      {error && (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 50,
          }}>
          <Text>Something went wrong, Could not load products</Text>
        </View>
      )}

      {firstFourProducts?.map((product, index) => (
        <PanGestureHandler key={index} onGestureEvent={handleGestureEvent}>
          <TouchableOpacity
            style={styles.productContainer}
            onPress={() =>
              navigation.navigate('ProductDetails', {
                product: product,
              })
            }>
            <ProductCard data={product} />
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
