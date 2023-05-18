import React from 'react';
import {
  View,
  ScrollView,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Colors from '../../utils/Colors';
import Edit from '../../assets/svg/edit.svg';
import Delete from '../../assets/svg/delete.svg';
import MasterCard from '../../assets/svg/masterCard.svg';

const payments = [
  {id: 1, name: 'Payment 1', cardNumber: '1234 5678 9012 3456'},
  {id: 2, name: 'Payment 2', cardNumber: '9876 5432 1098 7654'},
  {id: 3, name: 'Payment 3', cardNumber: '4567 8901 2345 6789'},
];

const Payments = () => {
  const handleAddPayment = () => {
    console.log('Payment METHOD added xD');
  };

  return (
    <View style={styles.screenContainer}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContainer}
        showsVerticalScrollIndicator={false}>
        {payments.map(payment => (
          <View key={payment.id} style={styles.cardContainer}>
            <MasterCard />
            <View style={styles.detailsContainer}>
              <View>
                <Text style={styles.name}>{payment.name}</Text>
                <Text style={styles.cardNumber}>{payment.cardNumber}</Text>
              </View>
              <View style={styles.btnsCont}>
                <TouchableOpacity>
                  <Edit />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Delete />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.addButton} onPress={handleAddPayment}>
        <Text style={styles.addButtonText}>Add Payment</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scrollViewContainer: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 100,
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 19,
    paddingHorizontal: 21,
    backgroundColor: Colors.lightGray,
    borderRadius: 22,
    marginBottom: 20,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btnsCont: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  name: {
    fontSize: 22,
    fontFamily: 'Urbanist-Bold',
    marginBottom: 4,
    color: Colors.secondaryGreen,
  },
  cardNumber: {
    fontSize: 16,
    color: Colors.black,
    marginBottom: 4,
    fontFamily: 'Urbanist-Regular',
  },
  addButton: {
    backgroundColor: Colors.secondaryGreen,
    borderRadius: 100,
    paddingVertical: 18,
    paddingHorizontal: 50,
    alignItems: 'center',
    position: 'absolute',
    bottom: 60,
    alignSelf: 'center',
    width: '90%',
  },
  addButtonText: {
    fontSize: 18,
    color: Colors.white,
    fontFamily: 'Urbanist-Bold',
  },
});

export default Payments;
