import {View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import React, {useContext} from 'react';
import Colors from '../../utils/Colors';
import {CartContext} from '../../context/cartContext';
import CartItemCard from './CartItemCard';

const Cart = () => {
  const {cartItems} = useContext(CartContext);

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.heading}>My Cart Items</Text>
      </View>

      {cartItems.length === 0 && (
        <Text style={styles.secondTxt}>No items in your cart</Text>
      )}
      <FlatList
        data={cartItems}
        keyExtractor={item => item.id}
        renderItem={({item}) => <CartItemCard item={item} />}
        scrollEnabled={true}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
