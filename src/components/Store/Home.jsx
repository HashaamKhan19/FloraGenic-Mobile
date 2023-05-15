import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

import UserProfileInfo from './UserProfileInfo';
import SearchInput from './SearchInput';
import Colors from '../../utils/Colors';
import ProductListings from '../Product/ProductListings';
import {ScrollView} from 'react-native-gesture-handler';

const Home = ({navigation}) => {
  const products = [
    {
      id: 1,
      name: 'Product 1',
      image:
        'https://images.unsplash.com/photo-1528475563668-e15742001b92?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
      rating: 4.5,
      amountSold: 120,
      price: 29.99,
    },
    {
      id: 2,
      name: 'Product 2',
      image:
        'https://images.unsplash.com/photo-1528475563668-e15742001b92?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
      rating: 4.5,
      amountSold: 120,
      price: 29.99,
    },
    {
      id: 3,
      name: 'Product 3',
      image:
        'https://images.unsplash.com/photo-1528475563668-e15742001b92?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
      rating: 4.5,
      amountSold: 120,
      price: 29.99,
    },
  ];

  return (
    <ScrollView>
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.white,
        }}>
        <UserProfileInfo
          userImage="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          userName="John Doe"
          userEmail="johndoe@example.com"
        />
        <SearchInput />
        <View style={styles.container}>
          <Text style={styles.mainText}>Special Offers</Text>
          <Text style={styles.secondaryText}>See All</Text>
        </View>
        <View
          style={{
            marginBottom: 20,
          }}>
          <ProductListings products={products} navigation={navigation} />
        </View>

        <View style={styles.container}>
          <Text style={styles.mainText}>Most Popular</Text>
          <Text style={styles.secondaryText}>See All</Text>
        </View>
        <View
          style={{
            marginBottom: 20,
          }}>
          <ProductListings products={products} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 24,
    backgroundColor: 'white',
  },
  mainText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.black,
  },
  secondaryText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.secondaryGreen,
  },
});

export default Home;
