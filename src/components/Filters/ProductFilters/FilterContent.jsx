import {View, Text} from 'react-native';
import React from 'react';
import ByRatings from './ByRatings';
import ByCategory from './ByCategory';
import ByPrice from './ByPrice';

const FilterContent = () => {
  return (
    <View style={{width: '100%'}}>
      <ByRatings />
      <ByCategory />
    </View>
  );
};

export default FilterContent;
