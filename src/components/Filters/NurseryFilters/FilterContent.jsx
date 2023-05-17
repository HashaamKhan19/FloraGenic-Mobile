import {View, Text} from 'react-native';
import React from 'react';
import ByRatings from '../ProductFilters/ByRatings';
import ByCity from './ByCity';

const FilterContent = () => {
  return (
    <View style={{width: '100%'}}>
      <ByRatings />
      <ByCity />
    </View>
  );
};

export default FilterContent;
