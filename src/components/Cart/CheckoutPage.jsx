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
import CartItemCard from './CartItemCard';
import {useNavigation} from '@react-navigation/native';
import {ShopContext} from '../../context/shopContextProvider';
import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  gql,
  useQuery,
} from '@apollo/client';
import DeviceStorage from '../../utils/DeviceStorage';
import {ActivityIndicator} from 'react-native-paper';

const httpLink = new HttpLink({
  uri: 'https://floragenic.herokuapp.com/graphql',
});

const authLink = new ApolloLink(async (operation, forward) => {
  const token = await DeviceStorage.loadItem('token');

  operation.setContext({
    headers: {
      Authorization: token ? `${token}` : '',
    },
  });

  return forward(operation);
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const GET_ADDRESSES = gql`
  query Addresses {
    addresses {
      id
      userID
      name
      location
      pin
      city
      setAsDefault
    }
  }
`;

const CheckoutPage = () => {
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [defaultAddress, setDefaultAddress] = useState(false);

  const {data, loading, error} = useQuery(GET_ADDRESSES, {
    client,
    onCompleted: data => {
      console.log(data.addresses);
      if (data.addresses && data.addresses.length > 0) {
        // Find the address with setAsDefault = true
        const defaultAddress = data.addresses.find(
          address => address.setAsDefault,
        );
        if (defaultAddress) {
          setSelectedAddress(defaultAddress);
          setDefaultAddress(true);
        }
      }
    },
    onError: error => {
      console.log(error);
    },
  });

  const navigation = useNavigation();

  const {cartItems, addToCart, removeFromCart, processing, totalPrice} =
    useContext(ShopContext);

  const handleAddressSelection = address => {
    setSelectedAddress(address);
  };

  const handleContinueToPayment = () => {
    navigation.navigate('PaymentPage');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.addressesContainer}>
        <Text style={styles.heading}>Select Address</Text>

        {loading && (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: 50,
            }}>
            <ActivityIndicator size="large" color={Colors.secondaryGreen} />
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
            <Text>Something went wrong, Could not load addresses</Text>
          </View>
        )}

        {data?.addresses?.map(address => (
          <TouchableOpacity
            key={address.id}
            style={[
              styles.addressItem,
              selectedAddress &&
                selectedAddress.id === address.id &&
                styles.selectedAddressItem,
            ]}
            onPress={() => handleAddressSelection(address)}>
            <Text style={styles.addressText}>{address.name}</Text>
            <Text style={styles.addressText}>{address.location}</Text>
            {setDefaultAddress && address.setAsDefault && (
              <Text style={styles.defaultAddressText}>Default Address</Text>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

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

      <View style={styles.orderSummaryContainer}>
        <Text style={styles.heading}>Order Summary</Text>
        <View style={styles.orderItem}>
          <Text style={styles.orderText}>Total Price</Text>
          <Text style={styles.orderText}>Rs. {totalPrice}</Text>
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
  defaultAddressText: {
    color: Colors.floraGreen,
    fontSize: 14,
    fontFamily: 'Urbanist-Regular',
  },
  orderSummaryContainer: {
    marginBottom: 16,
  },
  orderText: {
    fontSize: 18,
    fontFamily: 'Urbanist-Bold',
    color: Colors.black,
  },
});

export default CheckoutPage;
