import React, {useState} from 'react';
import {
  View,
  Image,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Colors from '../../utils/Colors';
import NurseryDetailsModal from './NurseryDetailsModal';

const NurseryDetails = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const nursery = {
    name: 'Happy Seeds Nursery',
    image: require('../../assets/images/Nurseries/1.jpg'),
    products: [
      {id: 1, name: 'Product 1'},
      {id: 2, name: 'Product 2'},
      {id: 3, name: 'Product 3'},
      // Add more products here
    ],
  };

  const handleContactNursery = () => {
    // Handle contact nursery action
    console.log('Contact nursery');
  };

  const handleViewNurseryDetails = () => {
    setModalVisible(true);
  };

  const handleSearch = text => {
    // Handle search action
    console.log('Search:', text);
  };

  const handleFilter = () => {
    // Handle filter action
    console.log('Filter');
  };

  return (
    <View style={styles.container}>
      <Image source={nursery.image} style={styles.image} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleContactNursery} style={styles.btns}>
          <Text style={styles.btnsTxt}>Contact Nursery</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleViewNurseryDetails}
          style={styles.btns}>
          <NurseryDetailsModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="🔎︎ Search for a product..."
          onChangeText={handleSearch}
          placeholderTextColor="darkgrey"
        />
      </View>
      <View>
        <Text style={styles.heading}>Products</Text>
        <Text style={{color: Colors.black, fontFamily: 'Urbanist-Regular'}}>
          Products of this nursery here
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: Colors.white,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    gap: 10,
  },
  btns: {
    flex: 1,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
    backgroundColor: Colors.secondaryGreen,
    borderRadius: 8,
  },
  btnsTxt: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: 'Urbanist-Bold',
  },
  filterBtn: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
    backgroundColor: Colors.secondaryGreen,
    borderRadius: 8,
    paddingHorizontal: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: 'transparent',
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    marginRight: 10,
    paddingHorizontal: 10,
    color: Colors.black,
    fontFamily: 'Urbanist-Medium',
  },
  heading: {
    fontSize: 20,
    fontFamily: 'Urbanist-Bold',
    marginVertical: 10,
    color: Colors.black,
  },
  productItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
});

export default NurseryDetails;
