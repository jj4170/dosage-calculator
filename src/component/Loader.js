import React from 'react';
import {
  View,
  ActivityIndicator,
  Dimensions,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
const {width, height} = Dimensions.get('window');
import Modal from 'react-native-modal';
// import {themeColor} from '../common/common';

const LoaderAnimated = ({visible}) => {
  return (
    <View style={styles.spinnerStyle}>
      <Modal isVisible={visible}>
        <View
          style={{
            height: height,
            width: width * 0.9,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={require('../assets/GIF/sun_loader.gif')}
            style={{width: 200, height: 100, resizeMode: 'contain'}}
          />
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  spinnerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export {LoaderAnimated};
