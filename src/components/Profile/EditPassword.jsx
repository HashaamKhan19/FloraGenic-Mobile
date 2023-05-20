import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Colors from '../../utils/Colors';
import {ActivityIndicator} from 'react-native-paper';
import {notification} from '../Popups/Alert';
import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  gql,
  useMutation,
} from '@apollo/client';
import DeviceStorage from '../../utils/DeviceStorage';

const EDIT_PASSWORD = gql`
  mutation Mutation($oldPassword: String!, $newPassword: String!) {
    changePassword(oldPassword: $oldPassword, newPassword: $newPassword)
  }
`;

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

const EditPassword = () => {
  const [oldPassword, setOldPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [cnfrmNewPassword, setCnfrmNewPassword] = React.useState('');
  const [btnLoading, setBtnLoading] = React.useState(false);

  const [editPassword] = useMutation(EDIT_PASSWORD, {
    client,
    onCompleted: () => {
      setBtnLoading(false);
      notification(
        'success',
        'Password Updated',
        'Your password has been updated successfully',
      );
    },
    onError: error => {
      setBtnLoading(false);
      console.log(error);
      notification(
        'error',
        // {error: error?.message},
        'There was an error updating your password',
      );
    },
  });

  const onSubmit = () => {
    editPassword({
      variables: {
        oldPassword,
        newPassword,
      },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Edit Password</Text>
      <TextInput
        placeholder="Old Password"
        // secureTextEntry
        value={oldPassword}
        onChangeText={text => setOldPassword(text)}
        style={styles.input}
        placeholderTextColor={Colors.darkGray}
      />
      <TextInput
        placeholder="New Password"
        // secureTextEntry
        value={newPassword}
        onChangeText={text => setNewPassword(text)}
        style={styles.input}
        placeholderTextColor={Colors.darkGray}
      />
      <TextInput
        placeholder="Confirm New Password"
        // secureTextEntry
        value={cnfrmNewPassword}
        onChangeText={text => setCnfrmNewPassword(text)}
        style={styles.input}
        placeholderTextColor={Colors.darkGray}
      />
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          setBtnLoading(true);
          onSubmit();
        }}>
        <Text style={styles.btnTxt}>
          {btnLoading ? (
            <ActivityIndicator animating={true} color={Colors.white} />
          ) : (
            'Update Password'
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
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontFamily: 'Urbanist-Bold',
    color: Colors.black,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 55,
    backgroundColor: Colors.lightGray,
    color: Colors.black,
    borderRadius: 16,
    padding: 20,
    marginBottom: 14,
    fontFamily: 'Urbanist-Regular',
  },
  btn: {
    width: '100%',
    height: 55,
    backgroundColor: Colors.secondaryGreen,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  btnTxt: {
    fontSize: 16,
    fontFamily: 'Urbanist-Bold',
    color: Colors.white,
  },
});

export default EditPassword;
