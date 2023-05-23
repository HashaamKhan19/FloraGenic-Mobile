import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  gql,
} from '@apollo/client';
import DeviceStorage from '../../utils/DeviceStorage';
import Colors from '../../utils/Colors';
import DropDownPicker from 'react-native-dropdown-picker';
import {PakistanCities} from '../Filters/NurseryFilters/Cities';

const httpLink = new HttpLink({
  uri: 'https://floragenic.herokuapp.com/graphql',
});

const authLink = new ApolloLink(async (operation, forward) => {
  const token = await DeviceStorage.loadItem('token');

  operation.setContext({
    headers: {
      Authorization: token ? `${token}` : '',
    },
  });

  return forward(operation);
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const ADD_ADDRESS = gql`
  mutation Mutation($input: AddressInput!) {
    addressCreate(input: $input)
  }
`;

const AddAddress = () => {
  const [addressName, setAddressName] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [city, setCity] = React.useState('');
  const [btnLoading, setBtnLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(null);
  const [defaultValue, setDefaultValue] = React.useState(false);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Address Name"
        value={addressName}
        onChangeText={text => setAddressName(text)}
        style={styles.input}
        placeholderTextColor={Colors.darkGray}
      />
      <TextInput
        placeholder="Address Location"
        value={location}
        onChangeText={text => setLocation(text)}
        style={styles.input}
        placeholderTextColor={Colors.darkGray}
      />
      <DropDownPicker
        open={open}
        value={value}
        setValue={setValue}
        setOpen={setOpen}
        theme="LIGHT"
        multiple={false}
        mode="BADGE"
        items={PakistanCities}
        badgeDotColors={['#62A82C', '#8ac926']}
        style={{
          backgroundColor: Colors.lightGray,
          width: '100%',
          height: 55,
          borderRadius: 16,
          marginBottom: 14,
          borderColor: Colors.lightGray,
        }}
        zIndex={1000}
        containerStyle={{
          width: '90%',
          height: 55,
          borderRadius: 16,
          marginBottom: 14,
          zIndex: 1000,
          borderWidth: 0,
        }}
        itemStyle={{
          justifyContent: 'flex-start',
        }}
        dropDownStyle={{
          backgroundColor: Colors.lightGray,
          width: '90%',
          height: 55,
          borderRadius: 16,
          marginBottom: 14,
        }}
        placeholder="Select User Type"
        placeholderStyle={{
          color: Colors.darkGray,
          fontFamily: 'Urbanist-Regular',
          paddingLeft: 8,
        }}
        labelStyle={{
          color: Colors.darkGray,
          fontFamily: 'Urbanist-Regular',
          paddingLeft: 8,
        }}
        selectedLabelStyle={{
          color: Colors.darkGray,
          fontFamily: 'Urbanist-Regular',
          paddingLeft: 8,
        }}
      />
      <TouchableOpacity>
        <Text style={styles.btnTxt}>Set as Default</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          setBtnLoading(true);
          onSubmit({addressName, location, city});
        }}>
        <Text style={styles.btnTxt}>
          {btnLoading ? (
            <ActivityIndicator animating={true} color={Colors.white} />
          ) : (
            'Add Address'
          )}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
    paddingTop: 20,
  },
  input: {
    width: '90%',
    height: 55,
    backgroundColor: Colors.lightGray,
    color: Colors.black,
    fontSize: 16,
    borderRadius: 16,
    padding: 20,
    marginBottom: 14,
    fontFamily: 'Urbanist-Regular',
  },
  btn: {
    width: '90%',
    height: 55,
    backgroundColor: Colors.secondaryGreen,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  btnTxt: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: 'Urbanist-Regular',
  },
});

export default AddAddress;
