import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
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
        name
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

  return (
    <View style={styles.container}>
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
    </View>
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
