import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Colors from '../../utils/Colors';

const HiringDetails = ({
  route: {
    params: {gardenerOrder},
  },
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.txt}>
        {gardenerOrder.gardener.firstName} {gardenerOrder.gardener.lastName}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  txt: {
    fontSize: 20,
    fontFamily: 'Urbanist-Regular',
    color: Colors.secondaryGreen,
  },
});

export default HiringDetails;
