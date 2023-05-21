import React, {useState} from 'react';
import {
  View,
  Image,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ScrollView,
} from 'react-native';
import Colors from '../../utils/Colors';
import NurseryDetailsModal from './NurseryDetailsModal';
import ImageCarousel from '../Product/ImageCarousel';
import ProductCard from '../Product/ProductCard';
import {useNavigation} from '@react-navigation/native';

const NurseryDetails = ({
  route: {
    params: {nursery},
  },
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const contactNursery = phoneNumber => {
    const phoneUrl = `tel:${phoneNumber}`;
    Linking.openURL(phoneUrl).catch(err =>
      console.error('Failed to open Phone app:', err),
    );
  };

  const handleViewNurseryDetails = () => {
    setModalVisible(true);
  };

  const handleSearch = text => {
    console.log('Search:', text);
  };

  const handleFilter = () => {
    console.log('Filter');
  };

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.imgCont}>
        <ImageCarousel images={nursery?.images} />
      </View>
      {/* <Image source={{uri: nursery?.images[0]}} style={styles.image} /> */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => {
            contactNursery(nursery?.phoneNumber);
          }}
          style={styles.btns}>
          <Text style={styles.btnsTxt}>Contact Nursery</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleViewNurseryDetails}
          style={styles.btns}>
          <NurseryDetailsModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            nursery={nursery}
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
      <Text style={styles.heading}>
        Products of {nursery?.name ? nursery?.name : 'Nursery Name'}
      </Text>

      <ScrollView>
        <View style={styles.prdctsCont}>
          {nursery?.products?.length === 0 && (
            <Text
              style={{
                color: Colors.black,
                textAlign: 'center',
                marginTop: 10,
                flex: 1,
                fontFamily: 'Urbanist-Medium',
              }}>
              No products available at the moment
            </Text>
          )}
          {nursery?.products?.map(product => (
            <TouchableOpacity
              key={product.id}
              style={styles.productCardContainer}
              onPress={() =>
                navigation.navigate('ProductDetails', {
                  product: product,
                })
              }>
              <ProductCard key={product?._id} data={product} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: Colors.white,
  },
  imgCont: {
    width: '100%',
    height: 200,
    marginBottom: 10,
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
  prdctsCont: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productCardContainer: {
    width: '49%',
    marginBottom: 10,
  },
});

export default NurseryDetails;
