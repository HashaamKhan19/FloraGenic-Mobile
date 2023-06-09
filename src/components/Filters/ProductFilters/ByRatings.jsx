import {View, Text} from 'react-native';
import React from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Colors from '../../../utils/Colors';
import Star from '../../../assets/svg/star.svg';
import dimensions from '../../../utils/Dimensions';

const ByRatings = () => {
  const maxStarCount = 5;

  const stars = Array.from({length: maxStarCount}, (_, index) => {
    return (
      <Star
        key={index}
        fill={Colors.orange}
        width={dimensions.Width / 21}
        height={dimensions.Height / 21}
      />
    );
  });

  return (
    <View style={{padding: 5}}>
      <Text
        style={{
          color: Colors.black,
          fontSize: 18,
          fontFamily: 'Urbanist-Bold',
          marginBottom: 10,
        }}>
        Filter By Ratings
      </Text>
      {stars.map((star, index) => (
        <BouncyCheckbox
          key={index}
          size={22}
          text={
            <View style={{flexDirection: 'row', gap: 5}}>
              {stars.slice(0, index + 1)}
            </View>
          }
          unfillColor="#FFFFFF"
          fillColor={Colors.secondaryGreen}
          iconStyle={{borderColor: Colors.secondaryGreen}}
          innerIconStyle={{borderWidth: 2, borderRadius: 8}}
        />
      ))}
    </View>
  );
};

export default ByRatings;
