import React, {useContext, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Colors from '../../utils/Colors';
import {ShopContext} from '../../context/shopContextProvider';

const PaymentPage = () => {
  const [selectedPaymentOption, setSelectedPaymentOption] = useState(null);
  const [productDetails, setProductDetails] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const {cartItems, addToCart, removeFromCart, processing} =
    useContext(ShopContext);

  const paymentOptions = [
    {id: 1, name: 'Credit Card ending in 1234'},
    {id: 2, name: 'PayPal'},
  ];

  const handlePaymentOptionSelection = option => {
    setSelectedPaymentOption(option);
  };

  const calculateTotalPrice = () => {
    let total = 0;
    productDetails.forEach(product => {
      total += product.price * product.quantity;
    });
    setTotalPrice(total);
  };

  useEffect(() => {
    setProductDetails(cartItems);
    calculateTotalPrice();
  }, [cartItems]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.paymentOptionsContainer}>
        <Text style={styles.heading}>Choose Payment Option</Text>
        {paymentOptions.map(option => (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.paymentOptionItem,
              selectedPaymentOption &&
                selectedPaymentOption.id === option.id &&
                styles.selectedPaymentOptionItem,
            ]}
            onPress={() => handlePaymentOptionSelection(option)}>
            <Text style={styles.paymentOptionText}>{option.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.productDetailsContainer}>
        <Text style={styles.heading}>Product Details</Text>
        {productDetails.map(product => (
          <View key={product.id} style={styles.productItem}>
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productQuantity}>
              Quantity: {product.quantity}
            </Text>
            <Text style={styles.productPrice}>Price: Rs. {product.price}</Text>
          </View>
        ))}
      </View>

      <View style={styles.totalPriceContainer}>
        <Text style={styles.totalPriceLabel}>Total Price:</Text>
        <Text style={styles.totalPriceValue}>Rs. {totalPrice}</Text>
      </View>

      {/* Stripe component or other payment form goes here */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: Colors.white,
    flex: 1,
  },
  paymentOptionsContainer: {
    marginBottom: 16,
  },
  heading: {
    fontSize: 24,
    marginBottom: 8,
    fontFamily: 'Urbanist-Bold',
    color: Colors.black,
  },
  paymentOptionItem: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
  },
  selectedPaymentOptionItem: {
    backgroundColor: Colors.lightGreen,
    borderColor: Colors.floraGreen,
  },
  paymentOptionText: {
    fontSize: 16,
    fontFamily: 'Urbanist-Medium',
    color: Colors.black,
  },
  productDetailsContainer: {
    marginBottom: 16,
  },
  productItem: {
    marginBottom: 8,
  },
  productName: {
    fontSize: 22,
    fontFamily: 'Urbanist-Medium',
    color: Colors.secondaryGreen,
  },
  productQuantity: {
    fontSize: 18,
    fontFamily: 'Urbanist-Medium',
    color: Colors.darkGray,
  },
  productPrice: {
    fontSize: 18,
    fontFamily: 'Urbanist-Medium',
    color: Colors.black,
  },
  totalPriceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  totalPriceLabel: {
    fontSize: 20,
    fontFamily: 'Urbanist-Bold',
    color: Colors.black,
    marginRight: 8,
  },
  totalPriceValue: {
    fontSize: 20,
    fontFamily: 'Urbanist-Bold',
    color: Colors.red,
  },
});

export default PaymentPage;
