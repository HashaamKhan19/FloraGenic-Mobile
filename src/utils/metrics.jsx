import {Dimensions, StatusBar} from 'react-native';

const {width, height} = Dimensions.get('screen');

const statusBarHeight = StatusBar.currentHeight || 0; // set to 0 if StatusBar.currentHeight is false

const newHeight = height - statusBarHeight;

const metrics = {
  screenWidth: width < newHeight ? width : newHeight,
  screenHeight: width < newHeight ? newHeight : width,
};

export default metrics;
