import {View, Text} from 'react-native';
import React from 'react';
import ByRatings from './ByRatings';
import ByCity from './ByCity';

const FilterContent = () => {
  return (
    <View>
      <ByCity />
      <ByRatings />
    </View>
  );
};

export default FilterContent;
