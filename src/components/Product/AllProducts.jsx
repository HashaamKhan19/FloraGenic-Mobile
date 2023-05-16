import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import SearchInput from '../Store/SearchInput';
import Colors from '../../utils/Colors';
import Filter from '../Filters/ProductFilters/Filter';

const AllProducts = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.secondContainer}>
        <View style={styles.searchCont}>
          <SearchInput />
        </View>
        <View style={styles.filterCont}>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(true);
            }}
            style={styles.btnsCont}>
            <Filter
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 10,
  },
  secondContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
    paddingBottom: 10,
  },
  searchCont: {
    flex: 1,
  },
  filterCont: {
    marginLeft: 10,
  },
  btnsCont: {
    backgroundColor: Colors.secondaryGreen,
    padding: 10,
    borderRadius: 10,
  },
});

export default AllProducts;
