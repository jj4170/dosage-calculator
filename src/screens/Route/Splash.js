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
} from 'react-native';
import {
  height,
  width,
  themeColor,
  images,
  customFont,
} from '../../common/common';
const {PoppinsBlack, PoppinsSemiBold, PoppinsRegular, PoppinsBold} = customFont;
const {white, black, mainColor} = themeColor;
const {orangeBackground, SunPharmaLogo} = images;
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

import {CheckInternet} from '../../api/utils';
import GeneralStatusBarColor from '../../component/GenralStatusBar';

export default function Splash({route}) {
  const navigation = useNavigation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      isUserLoggedIn();
    }, 2000);
  }, []);

  const isUserLoggedIn = async () => {
    const token = await AsyncStorage.getItem('@token', null);
    if (token == null) {
      setIsLoggedIn(false);
      navigation.replace('Login');
    } else {
      setIsLoggedIn(true);
      navigation.replace('Home', {modaldata: isLoggedIn});
      // console.log(' token splash  -->', token);
      // console.log(' isLoggedIn  -->', isLoggedIn);
    }
  };
  return (
    <>
      <GeneralStatusBarColor backgroundColor={white} barStyle="dark-content" />

      <SafeAreaView>
        <View
          style={{
            height: height,
            width: width,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: white,
          }}>
          <View>
            <Text
              style={{
                fontFamily: PoppinsBold,
                color: black,
                textAlign: 'center',
                fontSize: 28,
                height: 33,
              }}>
              DERMA DOSAGE
            </Text>
            <Text
              style={{
                fontFamily: PoppinsBold,
                color: mainColor,
                textAlign: 'center',
                fontSize: 28,
                height: 33,
              }}>
              CALCULATOR
            </Text>
          </View>
          <View style={{position: 'absolute', bottom: height * 0.1}}>
            <Image
              source={SunPharmaLogo}
              style={{
                resizeMode: 'contain',
                width: width * 0.12,
                height: height * 0.12,
                // marginTop: height * 0.05,
              }}
            />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}
