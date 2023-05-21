import React from 'react';
import {View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import GardenerCard from './GardenerCard';
import {gql, useQuery} from '@apollo/client';
import {ActivityIndicator} from 'react-native-paper';
import Colors from '../../utils/Colors';

const GET_GARDENERS = gql`
  query Query {
    gardeners {
      id
      firstName
      lastName
      gender
      phoneNumber
      city
      CNIC
      price
      duration
      rating
      experience
      image
      createdAt
      updatedAt
      skills {
        id
        name
        description
        image
      }
    }
  }
`;

const GardenerListings = ({navigation, query, setQuery}) => {
  const {data, loading, error} = useQuery(GET_GARDENERS);

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
          <Text>Something went wrong, Could not load gardeners</Text>
        </View>
      )}

      {data?.gardeners
        ?.filter(data => {
          if (query === '') {
            return data;
          } else if (
            data?.firstName?.toLowerCase().includes(query?.toLowerCase()) ||
            data?.lastName?.toLowerCase().includes(query?.toLowerCase())
          ) {
            return data;
          }
        })
        ?.map(gardener => (
          <TouchableOpacity
            key={gardener.id}
            onPress={() => {
              navigation.navigate('GardenerDetails', {
                gardener: gardener,
              });
            }}>
            <GardenerCard data={gardener} />
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

export default GardenerListings;
