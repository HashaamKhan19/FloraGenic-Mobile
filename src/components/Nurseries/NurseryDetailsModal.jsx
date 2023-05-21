import React, {useState} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TouchableOpacity,
} from 'react-native';
import Colors from '../../utils/Colors';

const NurseryDetailsModal = ({modalVisible, setModalVisible, nursery}) => {
  console.log('Nursery details:', nursery);

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Nursery Details</Text>
            <View style={styles.contentView}>
              <Text style={styles.contentTxtHeading}>Nursery Name: </Text>
              <Text style={styles.contentTxt}>
                {nursery?.name ? nursery?.name : 'Not available'}
              </Text>
            </View>
            <View style={styles.contentView}>
              <Text style={styles.contentTxtHeading}>Nursery Email: </Text>
              <Text style={styles.contentTxt}>
                {nursery?.email ? nursery?.email : 'Not available'}
              </Text>
            </View>
            <View style={styles.contentView}>
              <Text style={styles.contentTxtHeading}>Nursery Address: </Text>
              <Text style={[styles.contentTxt, styles.addressText]}>
                {nursery?.address ? nursery?.address : 'Not available'}
              </Text>
            </View>
            <View style={styles.contentView}>
              <Text style={styles.contentTxtHeading}>
                Nursery Phone Number:{' '}
              </Text>
              <Text style={styles.contentTxt}>
                {nursery?.phoneNumber ? nursery?.phoneNumber : 'Not available'}
              </Text>
            </View>
            <View style={styles.contentView}>
              <Text style={styles.contentTxtHeading}>Nursery Details: </Text>
              <Text style={styles.contentTxt}>
                {nursery?.details ? nursery?.details : 'Not available'}
              </Text>
            </View>
            <View style={styles.contentView}>
              <Text style={styles.contentTxtHeading}>
                Nursery Opening Hours:{' '}
              </Text>
              <Text style={styles.contentTxt}>
                {nursery?.openingHours
                  ? nursery?.openingHours
                  : 'Not available'}
              </Text>
            </View>
            <View style={styles.contentView}>
              <Text style={styles.contentTxtHeading}>
                Nursery Closing Hours:{' '}
              </Text>
              <Text style={styles.contentTxt}>
                {nursery?.closingHours
                  ? nursery?.closingHours
                  : 'Not available'}
              </Text>
            </View>
            <View style={styles.contentView}>
              <Text style={styles.contentTxtHeading}>Nursery Owner: </Text>
              <Text style={styles.contentTxt}>
                {nursery?.nurseryOwner?.firstName
                  ? nursery?.nurseryOwner?.firstName
                  : 'Not available'}
                {nursery?.nurseryOwner?.lastName
                  ? nursery?.nurseryOwner?.lastName
                  : 'Not available'}
              </Text>
            </View>
            <View style={styles.contentView}>
              <Text style={styles.contentTxtHeading}>
                Nursery Owner Phone:{' '}
              </Text>
              <Text style={styles.contentTxt}>
                {nursery?.nurseryOwner?.phoneNumber
                  ? nursery?.nurseryOwner?.phoneNumber
                  : 'Not available'}
              </Text>
            </View>
            <View style={styles.contentView}>
              <Text style={styles.contentTxtHeading}>Nursery Website: </Text>
              <Text style={styles.contentTxt}>
                {nursery?.website ? nursery?.website : 'Not available'}
              </Text>
            </View>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Text style={styles.btnsTxt}>View Nursery Details</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  addressText: {
    width: '70%',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
  },
  contentView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 12,
  },
  contentTxt: {
    color: Colors.black,
    fontFamily: 'Urbanist-Regular',
    flexWrap: 'wrap',
    flexShrink: 1,
  },
  contentTxtHeading: {
    color: Colors.black,
    fontFamily: 'Urbanist-Bold',
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: Colors.floraGreen,
  },
  textStyle: {
    color: 'white',
    fontFamily: 'Urbanist-Bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 20,
    textAlign: 'center',
    color: Colors.black,
    fontFamily: 'Urbanist-Bold',
    fontSize: 20,
  },
  btnsTxt: {
    color: Colors.white,
    fontSize: 16,
    height: 40,
    marginBottom: 2,
    fontFamily: 'Urbanist-Bold',
    // backgroundColor: 'red',
  },
});

export default NurseryDetailsModal;
