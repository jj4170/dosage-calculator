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
const {
  PoppinsBlack,
  PoppinsSemiBold,
  PoppinsRegular,
  PoppinsBold,
  PoppinsMedium,
} = customFont;
const {white, black, mainColor} = themeColor;
const {orangeBackground, SunPharmaLogo} = images;
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import {CheckInternet} from '../../api/utils';
import GeneralStatusBarColor from '../../component/GenralStatusBar';
import Header from '../../component/Header';
export default function PrivacyPolicy({route}) {
  const navigation = useNavigation();

  const isNavigate = route.params;
  console.log(' isNavigate-->', isNavigate);
  return (
    <>
      <GeneralStatusBarColor
        backgroundColor={'#ffa448'}
        barStyle="dark-content"
      />
      <SafeAreaView style={{flex: 1, backgroundColor: white}}>
        <ImageBackground
          source={orangeBackground}
          resizeMode="cover"
          style={{height: height, width: width}}>
          <Header text={'Privacy Policy'} />
          <View style={styles.containerMain}>
            <View>
              {/* <Text style={styles.disclamerText}>Disclaimer</Text> */}
            </View>
            <View style={styles.disclaimerView}>
              <Text style={[styles.modalText, {marginTop: width * 0.09}]}>
                This app is only for registered medical practitioners
                (Dermatologists). This app is not diagnosing any condition or
                disease and users should use their own discretion and expertise
                while using any information. The content herein is only
                indicative; please refer to the approved prescribing
                information. Nothing contained herein shall be construed as a
                recommendation to use or prescribe any product. Sun Pharma shall
                not be liable for any claims, damages, or causes of action,
                inaction, present or future, arising out of or connected to
                contents, advice, instructions, exercises or any other
                recommendations contained herein.
              </Text>
              {/* <Text
                style={[
                  styles.modalText,
                  {marginTop: width * 0.01, marginBottom: 30},
                ]}>
                Sun pharma has validated the accuracy of the formula for the
                dosage calculation. However Sun pharma is not responsible for
                the arithmetic errors, prescriptions developed in reliance on
                the user’s calculations or patient response to such
                prescription.
              </Text> */}
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.okView}
              onPress={() => {
                if (isNavigate.isNavigate == true) {
                  navigation.replace('Profile');
                } else {
                  navigation.replace('Login');
                }
                // navigation.replace('Home');
              }}>
              <Text
                style={{
                  color: white,
                  fontFamily: PoppinsMedium,
                }}>
                OK
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </SafeAreaView>
    </>
  );
}
const styles = StyleSheet.create({
  modalText: {
    fontSize: 13,
    width: width * 0.82,
    fontFamily: PoppinsRegular,
  },
  containerMain: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: white,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  okView: {
    backgroundColor: mainColor,
    borderRadius: 10,
    width: width * 0.3,
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 0.05,
    marginBottom: width * 0.1,
    marginTop: width * 0.09,
  },
  disclaimerView: {
    backgroundColor: white,
    // shadowColor: '#000',
    // shadowOffset: {width: 0, height: 1},
    // shadowOpacity: Platform.OS == 'ios' ? 0.4 : 0.8,
    // shadowRadius: 2,
    // elevation: 5,
    borderRadius: 22,
    width: width * 0.9,
    alignItems: 'center',
    marginTop: height * 0.07,
  },
  disclamerText: {
    marginTop: width * 0.05,
    fontFamily: PoppinsBold,
    color: mainColor,
    fontSize: 20,
  },
});
