import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import Colors from '../../utils/Colors';

const PlantDetails = ({
  route: {
    params: {
      data: {data},
      image: {image},
    },
  },
}) => {
  const [isSection1Open, setSection1Open] = useState(false);
  const [isSection2Open, setSection2Open] = useState(false);
  const [isSection3Open, setSection3Open] = useState(false);

  const toggleSection1 = () => {
    setSection1Open(!isSection1Open);
  };

  const toggleSection2 = () => {
    setSection2Open(!isSection2Open);
  };

  const toggleSection3 = () => {
    setSection3Open(!isSection3Open);
  };

  console.log('data in plant details page: ', data);

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: image,
        }}
        style={{width: '100%', height: 200}}
        resizeMode="cover"
      />
      <TouchableOpacity onPress={toggleSection1} style={styles.accordionBtn}>
        <Text style={{padding: 16, color: 'white'}}>Accordion 1</Text>
      </TouchableOpacity>
      {isSection1Open && (
        <View style={{backgroundColor: '#f5f5f5', padding: 16, color: 'black'}}>
          <Text>Details for Accordion 1</Text>
        </View>
      )}
      <TouchableOpacity
        onPress={toggleSection2}
        style={{backgroundColor: 'green'}}>
        <Text style={{padding: 16, color: 'white'}}>Accordion 2</Text>
      </TouchableOpacity>
      {isSection2Open && (
        <View style={{backgroundColor: '#f5f5f5', padding: 16, color: 'black'}}>
          <Text>Details for Accordion 2</Text>
        </View>
      )}
      <TouchableOpacity
        onPress={toggleSection3}
        style={{backgroundColor: 'green'}}>
        <Text style={{padding: 16, color: 'white'}}>Accordion 3</Text>
      </TouchableOpacity>
      {isSection3Open && (
        <View style={{backgroundColor: '#f5f5f5', padding: 16, color: 'black'}}>
          <Text>Details for Accordion 3</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  accordionBtn: {
    backgroundColor: 'green',
  },
});

export default PlantDetails;
