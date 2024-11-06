import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const dimensions = {
  screenWidth: width,
  screenHeight: height,
};

export default dimensions;
