import React, {useState} from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Right from '../../assets/svg/right.svg';
import Left from '../../assets/svg/left.svg';
import dimensions from '../../utils/Dimensions';

const ImageCarousel = ({images}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentImageIndex(prevIndex =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1,
    );
  };

  const handleNext = () => {
    setCurrentImageIndex(prevIndex =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1,
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePrevious} style={styles.button}>
        <Left
          fill="#000"
          width={dimensions.Width / 17}
          height={dimensions.Height / 17}
        />
      </TouchableOpacity>
      <Image source={images[currentImageIndex]} style={styles.image} />
      <TouchableOpacity onPress={handleNext} style={styles.button}>
        <Right
          fill="#000"
          size={20}
          width={dimensions.Width / 17}
          height={dimensions.Height / 17}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    width: 300,
    height: 320,
  },
  button: {
    padding: 10,
  },
  icon: {
    width: 20,
    height: 20,
  },
});

export default ImageCarousel;
