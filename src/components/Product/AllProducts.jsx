import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native';
import React, {useRef, useState} from 'react';
import SearchInput from '../Store/SearchInput';
import Colors from '../../utils/Colors';
import Filter from '../Filters/ProductFilters/Filter';
import {gql, useQuery} from '@apollo/client';
import {ActivityIndicator} from 'react-native-paper';
import ProductCard from './ProductCard';
import {useNavigation} from '@react-navigation/native';

const GET_PRODUCTS = gql`
  query ExampleQuery {
    products {
      id
      nurseryID
      nursery {
        name
        id
        details
        images
      }
      name
      description
      category {
        name
      }
      hidden
      retailPrice
      wholesalePrice
      stock
      sold
      images
      overallRating
      tags
      createdAt
      updatedAt
      reviews {
        createdAt
        likes
        rating
        review
        userID
      }
    }
  }
`;

const AllProducts = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const {data, loading, error} = useQuery(GET_PRODUCTS);

  const navigation = useNavigation();

  const [query, setQuery] = useState('');

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  if (loading) return;
  <View
    style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <ActivityIndicator
      animating={true}
      size={'large'}
      color={Colors.secondaryGreen}
    />
    ;
  </View>;
  if (error) return <Text>Error loading Products</Text>;

  const filteredProducts = data.products?.filter(data => {
    if (query === '') {
      return data;
    } else if (data?.name?.toLowerCase().includes(query?.toLowerCase())) {
      return data;
    }
  });

  const inputRef = useRef(null);

  const removeFocus = () => {
    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  return (
    <View style={styles.container} onTouchStart={() => removeFocus()}>
      <View style={styles.secondContainer}>
        <View style={styles.searchCont}>
          <SearchInput query={query} setQuery={setQuery} inputRef={inputRef} />
        </View>
        <View style={styles.filterCont}>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(true);
            }}
            style={styles.btnsCont}>
            <Filter
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.prdctsCont}>
          {filteredProducts?.map(product => (
            <TouchableOpacity
              key={product.id}
              style={[
                styles.productCardContainer,
                filteredProducts.length === 1 && {width: '100%'},
              ]}
              onPress={() =>
                navigation.navigate('ProductDetails', {
                  product: product,
                })
              }>
              <ProductCard data={product} />
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
    backgroundColor: Colors.white,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  prdctsCont: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productCardContainer: {
    marginBottom: 10,
    width: '49%',
  },
  secondContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
    paddingBottom: 10,
  },
  searchCont: {
    flex: 1,
  },
  filterCont: {
    marginLeft: 10,
  },
  btnsCont: {
    backgroundColor: Colors.secondaryGreen,
    padding: 10,
    borderRadius: 10,
  },
});

export default AllProducts;
