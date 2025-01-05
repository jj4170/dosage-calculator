import React, {useEffect, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  BackHandler,
  Animated,
  Button,
  StatusBar,
  ImageBackground,
  Image,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {
  height,
  width,
  themeColor,
  images,
  customFont,
} from '../../common/common';
const {PoppinsBlack, PoppinsSemiBold, PoppinsRegular, PoppinsBold} = customFont;
const {white, black, mainColor, mediumDarkGray, mediumGray} = themeColor;
const {orangeBackground, SunPharmaLogo} = images;
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

import {CheckInternet} from '../../api/utils';
import GeneralStatusBarColor from '../../component/GenralStatusBar';

export default function NoInernetScreen({onPress}) {


  return (
    <>
      <GeneralStatusBarColor backgroundColor={white} barStyle="dark-content" />

      <SafeAreaView>
        <ImageBackground
          source={orangeBackground}
          resizeMode="cover"
          style={{height: height, width: width}}>
          <View style={styles.containerMain}>
            <View
              style={{
                width: width * 0.78,
                height: height * 0.72,
                justifyContent: 'flex-end',
              }}>
              <Text style={styles.oopsText}>OOPS!</Text>
              <Text style={styles.oopsText}>NO INTERNET</Text>
              <Text style={[styles.oopsTextSmall, {marginTop: height * 0.02}]}>
                Please Check your network connection.
              </Text>
              <TouchableOpacity
                onPress={onPress}
                style={styles.tryAgainButton}
                activeOpacity={0.8}>
                <Text>TRY AGAIN</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,

    alignItems: 'center',
    backgroundColor: white,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  tryAgainButton: {
    backgroundColor: white,
    width: width * 0.72,
    height: width * 0.12,
    shadowColor: black,
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: Platform.OS == 'ios' ? 0.3 : 0.8,
    shadowRadius: 2,
    elevation: 5,
    borderRadius: 8,
    marginTop: height * 0.02,
    alignItems: 'center',
    justifyContent: 'center',
  },
  oopsText: {
    fontFamily: PoppinsBold,
    fontSize: 23,
  },
  oopsTextSmall: {
    fontFamily: PoppinsRegular,
    fontSize: 12,
    color: mediumGray,
  },
});
