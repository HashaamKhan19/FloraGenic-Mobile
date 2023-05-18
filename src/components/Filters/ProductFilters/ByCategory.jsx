import {View, Text} from 'react-native';
import React from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Colors from '../../../utils/Colors';

const ByCategory = () => {
  const categories = ['Plants', 'Medicines', 'Tools', 'Decorations', 'Seeds'];

  return (
    <View style={{padding: 5}}>
      <Text
        style={{
          color: Colors.black,
          fontSize: 18,
          fontFamily: 'Urbanist-Bold',
          marginBottom: 16,
        }}>
        Filter By Category
      </Text>
      {categories.map((category, index) => (
        <BouncyCheckbox
          key={index}
          size={22}
          fillColor={Colors.secondaryGreen}
          unfillColor="#FFFFFF"
          text={
            <View>
              <Text
                style={{
                  color: Colors.black,
                  fontFamily: 'Urbanist-Medium',
                  fontSize: 16,
                }}>
                {category}
              </Text>
            </View>
          }
          iconStyle={{borderColor: Colors.secondaryGreen}}
          innerIconStyle={{borderWidth: 2, borderRadius: 8}}
          style={{marginBottom: 12}}
        />
      ))}
    </View>
  );
};

export default ByCategory;
