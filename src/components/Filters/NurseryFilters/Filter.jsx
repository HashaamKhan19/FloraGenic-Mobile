import React, {useState} from 'react';
import {Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import Colors from '../../../utils/Colors';
import FilterContent from './FilterContent';

const Filter = ({modalVisible, setModalVisible}) => {
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
            {/* Filters */}
            <FilterContent />

            {/* Buttons */}
            <View style={styles.btnsCont}>
              <Pressable style={styles.apply}>
                <Text style={styles.textStyle}>Apply Filter</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <Text style={styles.btnsTxt}>Filter</Text>
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
    width: '80%',
  },
  btnsCont: {
    flexDirection: 'column',
    gap: 10,
    width: '100%',
    marginTop: 30,
  },
  contentView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 40,
  },
  contentTxt: {
    color: Colors.black,
  },
  contentTxtHeading: {
    color: Colors.black,
    fontWeight: 'bold',
  },
  button: {
    borderRadius: 8,
    padding: 8,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: Colors.red,
  },
  apply: {
    backgroundColor: Colors.floraGreen,
    borderRadius: 8,
    padding: 8,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 20,
    textAlign: 'center',
    color: Colors.black,
    fontWeight: 'bold',
    fontSize: 20,
  },
  btnsTxt: {
    color: Colors.white,
    fontSize: 16,
    height: 40,
    marginBottom: 3,
  },
});

export default Filter;
