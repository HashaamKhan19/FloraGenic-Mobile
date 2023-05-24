import {Text, TouchableOpacity, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import Colors from '../../utils/Colors';
import Hand from '../../assets/svg/hand.svg';
import ImageCropPicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import {notification} from '../Popups/Alert';
import {ActivityIndicator} from 'react-native-paper';

const Home = () => {
  const [image, setImage] = useState(null);

  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    try {
      const image = await ImageCropPicker.openPicker({
        cropping: true,
      });

      // Create a unique filename for the image
      const filename = `${Date.now()}.jpg`;
      // Upload the image to Firebase Storage
      const reference = storage().ref(filename);
      setLoading(true);
      // uploads file
      await reference.putFile(image.path);
      const url = await reference.getDownloadURL();
      setLoading(false);
      setImage(url);
      notification('success', 'Image uploaded successfully!');
    } catch (error) {
      console.log('Error uploading image:', error);
      notification('error', 'Image upload failed!');
    }
  };

  const openCamera = async () => {
    try {
      const image = await ImageCropPicker.openCamera({
        cropping: true,
      });

      // Create a unique filename for the image
      const filename = `${Date.now()}.jpg`;
      // Upload the image to Firebase Storage
      const reference = storage().ref(filename);
      setLoading(true);
      // uploads file
      await reference.putFile(image.path);
      const url = await reference.getDownloadURL();
      setLoading(false);
      setImage(url);
      notification('success', 'Image uploaded successfully!');
    } catch (error) {
      console.log('Error uploading image:', error);
      notification('error', 'Image upload failed!');
    }
  };

  return (
    <>
      <View style={styles.imgCont}>
        <Hand fill={Colors.floraGreen} style={styles.img} />

        <Text style={styles.imgText}>
          Get free assistance from our Virtual Botanist to take care of your
          plant!
        </Text>
      </View>
      {!loading ? (
        <View style={styles.container}>
          <TouchableOpacity style={styles.btn} onPress={openCamera}>
            <Text style={styles.title}>Select from Camera</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              pickImage();
            }}>
            <Text style={styles.title}>Select from Gallery</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 20,
          }}>
          <ActivityIndicator
            animating={true}
            size={'large'}
            color={Colors.floraGreen}
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 20,
    gap: 5,
  },
  imgCont: {
    flex: 2,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 20,
  },
  img: {
    width: 200,
    height: 200,
  },
  imgText: {
    fontSize: 24,
    textAlign: 'center',
    color: Colors.black,
    fontFamily: 'Urbanist-Regular',
  },
  btn: {
    backgroundColor: Colors.floraGreen,
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    color: Colors.white,
    fontFamily: 'Urbanist-Regular',
  },
});

export default Home;
