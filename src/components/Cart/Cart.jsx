import {View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import React, {useContext} from 'react';
import Colors from '../../utils/Colors';
import CartItemCard from './CartItemCard';
import {useNavigation} from '@react-navigation/native';
import {ShopContext} from '../../context/shopContextProvider';

const Cart = () => {
  const {cartItems, addToCart, removeFromCart, processing} =
    useContext(ShopContext);
  const navigation = useNavigation();

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.heading}>My Cart Items</Text>

        {cartItems.length === 0 && (
          <Text style={styles.secondTxt}>No items in your cart</Text>
        )}
        <View style={styles.listCntr}>
          {!processing && (
            <FlatList
              data={cartItems}
              keyExtractor={item => item.id}
              renderItem={({item}) => <CartItemCard item={item} />}
              scrollEnabled={true}
            />
          )}
        </View>

        {cartItems.length > 0 && (
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate('CheckoutPage')}>
            <Text style={styles.btnTxt}>Checkout</Text>
          </TouchableOpacity>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  listCntr: {
    padding: 20,
    marginTop: 20,
  },
  heading: {
    fontSize: 28,
    textAlign: 'center',
    marginTop: 20,
    fontFamily: 'Urbanist-Bold',
    color: Colors.black,
  },
  secondTxt: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
    fontFamily: 'Urbanist-Regular',
    color: Colors.black,
  },
  btnTxt: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'Urbanist-Regular',
    color: Colors.white,
  },
  btn: {
    backgroundColor: Colors.floraGreen,
    width: 150,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
});

export default Cart;
