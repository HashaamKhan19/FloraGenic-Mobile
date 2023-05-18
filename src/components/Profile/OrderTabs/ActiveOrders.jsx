import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';
import Colors from '../../../utils/Colors';

const ActiveOrders = () => {
  const name = 'Product Name';
  const quantity = '1';
  const status = 'In Delivery';
  const price = '4050';
  const imageSource =
    'https://images.unsplash.com/photo-1528475563668-e15742001b92?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80';

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.cardContainer}>
        <View style={styles.mainDiv}>
          <Image
            source={{
              uri: imageSource,
            }}
            style={styles.image}
          />
          <View style={styles.secDiv}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.quantity}>Quantity = {quantity}</Text>
            <TouchableOpacity style={styles.statusCont}>
              <Text style={styles.status}>{status}</Text>
            </TouchableOpacity>

            <View style={styles.reviewContainer}>
              <Text style={styles.price}>Rs. {price}</Text>
              <TouchableOpacity style={styles.giveRev}>
                <Text style={styles.giveRevTxt}>Review</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
  cardContainer: {
    backgroundColor: Colors.lightGray,
    padding: 17,
    marginVertical: 20,
    borderRadius: 30,
  },
  image: {
    width: 106,
    height: 106,
    borderRadius: 20,
  },
  mainDiv: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  secDiv: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 8,
  },
  name: {
    fontFamily: 'Urbanist-SemiBold',
    fontSize: 22,
    color: Colors.black,
  },
  quantity: {
    fontFamily: 'Urbanist-Medium',
    fontSize: 16,
    color: Colors.darkGray,
  },
  statusCont: {
    backgroundColor: Colors.lightGreen,
    fontFamily: 'Urbanist-SemiBold',
    paddingVertical: 4,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  status: {
    fontFamily: 'Urbanist-Medium',
    fontSize: 12,
    color: Colors.secondaryGreen,
  },
  price: {
    fontFamily: 'Urbanist-Bold',
    fontSize: 22,
    color: Colors.secondaryGreen,
  },
  reviewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '70%',
  },
  giveRev: {
    backgroundColor: Colors.secondaryGreen,
    fontFamily: 'Urbanist-SemiBold',
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  giveRevTxt: {
    fontFamily: 'Urbanist-Medium',
    fontSize: 16,
    color: Colors.white,
  },
});

export default ActiveOrders;
