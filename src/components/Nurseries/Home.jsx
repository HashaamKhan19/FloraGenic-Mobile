import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import SearchInput from '../Store/SearchInput';
import NurseryListings from './NurseryListings';
import Colors from '../../utils/Colors';
import Filter from '../Filters/NurseryFilters/Filter';

const Home = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <ScrollView>
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.white,
        }}>
        <SearchInput />

        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: 'bold',
                margin: 20,
                color: Colors.black,
              }}>
              Nurseries
            </Text>
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
          <NurseryListings navigation={navigation} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  btnsCont: {
    height: 40,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterCont: {
    marginRight: 20,
    backgroundColor: Colors.secondaryGreen,
    borderRadius: 10,
  },
});

export default Home;
