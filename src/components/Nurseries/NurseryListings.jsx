import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  RefreshControl,
} from 'react-native';
import NurseryCard from './NurseryCard';
import {gql, useQuery} from '@apollo/client';
import {useNavigation} from '@react-navigation/native';
import {ActivityIndicator} from 'react-native-paper';
import Colors from '../../utils/Colors';

const GET_NURSERIES = gql`
  query Query {
    nurseries {
      id
      nurseryOwnerID
      name
      details
      blockedStatus
      openingHours
      closingHours
      rating
      address
      phoneNumber
      email
      website
      images
      createdAt
      updatedAt
      products {
        id
        nurseryID
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
        reviews {
          id
          userID
          productID
          productType
          rating
          review
          likes
          createdAt
          updatedAt
          totalReviews
        }
        createdAt
        updatedAt
        nursery {
          name
        }
      }
      nurseryOwner {
        firstName
        lastName
      }
    }
  }
`;

const NurseryListings = ({navigation, query, setQuery}) => {
  const {data, loading, error} = useQuery(GET_NURSERIES);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      {loading && (
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
        </View>
      )}

      {error && (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>Something went wrong, Could not load nurseries</Text>
        </View>
      )}

      {data?.nurseries
        ?.filter(data => {
          if (query === '') {
            return data;
          } else if (data?.name?.toLowerCase().includes(query?.toLowerCase())) {
            return data;
          }
        })
        ?.map(nursery => (
          <TouchableOpacity
            key={nursery?.id}
            onPress={() =>
              navigation.navigate('NurseryDetails', {
                nursery: nursery,
              })
            }>
            <NurseryCard
              key={nursery?.id}
              image={nursery?.images[0]}
              name={nursery?.name}
              location={nursery?.address}
              ratings={nursery?.rating}
            />
          </TouchableOpacity>
        ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});

export default NurseryListings;
