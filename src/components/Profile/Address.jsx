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
import GroupAddress from '../../assets/svg/groupAddress.svg';

const addresses = [
  {id: 1, name: 'Address 1', location: 'Location 1'},
  {id: 2, name: 'Address 2', location: 'Location 2'},
  {id: 3, name: 'Address 3', location: 'Location 3'},
];

const Address = () => {
  const handleAddAddress = () => {
    console.log('Address added xD');
  };

  return (
    <View style={styles.screenContainer}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContainer}
        showsVerticalScrollIndicator={false}>
        {addresses.map(address => (
          <View key={address.id} style={styles.cardContainer}>
            <GroupAddress />
            <View style={styles.detailsContainer}>
              <View>
                <Text style={styles.name}>{address.name}</Text>
                <Text style={styles.location}>{address.location}</Text>
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
      <TouchableOpacity style={styles.addButton} onPress={handleAddAddress}>
        <Text style={styles.addButtonText}>Add Address</Text>
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
    marginLeft: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btnsCont: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
  },
  name: {
    fontSize: 22,
    fontFamily: 'Urbanist-Bold',
    marginBottom: 4,
    color: Colors.black,
  },
  location: {
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

export default Address;
