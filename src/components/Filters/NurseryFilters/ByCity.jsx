import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {MultiSelect} from 'react-native-element-dropdown';
import {PakistanCities} from './Cities';
import Colors from '../../../utils/Colors';

const ByCity = () => {
  const [selected, setSelected] = useState([]);

  return (
    <View style={styles.container}>
      <Text style={styles.city}>Filter By City</Text>
      <MultiSelect
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        search
        data={PakistanCities}
        labelField="label"
        valueField="value"
        placeholder="Select item"
        searchPlaceholder="Search..."
        value={selected}
        onChange={item => {
          setSelected(item);
        }}
        selectedStyle={styles.selectedStyle}
        itemTextStyle={{color: Colors.black}}
        showsVerticalScrollIndicator={true}
      />
    </View>
  );
};

export default ByCity;

const styles = StyleSheet.create({
  container: {padding: 16},
  dropdown: {
    height: 50,
    backgroundColor: 'transparent',
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  city: {
    color: Colors.black,
    fontSize: 16,
    fontFamily: 'Urbanist-Bold',
    marginBottom: 10,
  },
  placeholderStyle: {
    fontSize: 16,
    color: Colors.black,
  },
  selectedTextStyle: {
    fontSize: 14,
    color: Colors.black,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: Colors.black,
  },
  icon: {
    marginRight: 5,
  },
  selectedStyle: {
    borderRadius: 12,
    color: Colors.black,
  },
});
