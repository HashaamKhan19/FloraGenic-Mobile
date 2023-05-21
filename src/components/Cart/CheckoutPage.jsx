import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import Colors from '../../utils/Colors';
import {CartContext} from '../../context/cartContext';
import CartItemCard from './CartItemCard';
import {useNavigation} from '@react-navigation/native';

const CheckoutPage = () => {
  const [selectedAddress, setSelectedAddress] = useState(null);

  const navigation = useNavigation();

  const {cartItems} = useContext(CartContext);

  const addresses = [
    {id: 1, address: '123 Main Street'},
    {id: 2, address: '456 Elm Street'},
  ];

  const handleAddressSelection = address => {
    setSelectedAddress(address);
  };

  const handleContinueToPayment = () => {
    // Handle the action when the "Continue to Payment" button is pressed
    navigation.navigate('PaymentPage');
    console.log('Continue to Payment');
  };

  return (
    <View style={styles.container}>
      <View style={styles.addressesContainer}>
        <Text style={styles.heading}>Select Address</Text>
        {addresses.map(address => (
          <TouchableOpacity
            key={address.id}
            style={[
              styles.addressItem,
              selectedAddress &&
                selectedAddress.id === address.id &&
                styles.selectedAddressItem,
            ]}
            onPress={() => handleAddressSelection(address)}>
            <Text style={styles.addressText}>{address.address}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.orderListContainer}>
        <Text style={styles.heading}>Order List</Text>
        <View style={styles.listCntr}>
          <FlatList
            data={cartItems}
            keyExtractor={item => item.id}
            renderItem={({item}) => <CartItemCard item={item} />}
            scrollEnabled={true}
          />
        </View>
      </View>

      <TouchableOpacity
        style={styles.continueButton}
        onPress={handleContinueToPayment}>
        <Text style={styles.continueButtonText}>Continue to Payment</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: Colors.white,
    flex: 1,
  },
  addressesContainer: {
    marginBottom: 16,
  },
  heading: {
    fontSize: 18,
    marginBottom: 8,
    fontFamily: 'Urbanist-Bold',
    color: Colors.black,
  },
  addressItem: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
  },
  selectedAddressItem: {
    backgroundColor: Colors.lightGreen,
    borderColor: Colors.floraGreen,
  },
  addressText: {
    fontSize: 16,
    fontFamily: 'Urbanist-Regular',
    color: Colors.black,
  },
  orderListContainer: {
    marginBottom: 16,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  continueButton: {
    backgroundColor: Colors.secondaryGreen,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  continueButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  listCntr: {
    marginBottom: 16,
    marginTop: 16,
  },
});

export default CheckoutPage;
