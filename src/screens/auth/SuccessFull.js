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
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import LoginBackground from '../../assets/LoginBackground.png';
import {height, width, themeColor, customFont} from '../../common/common';
import GeneralStatusBarColor from '../../component/GenralStatusBar';

const {white, black, lightgray, mediumGray, mainColor, error} = themeColor;
const {
  PoppinsBlack,
  PoppinsSemiBold,
  PoppinsMedium,
  PoppinsRegular,
  PoppinsBold,
} = customFont;
export default function SuccessFull({route}) {
  const navigation = useNavigation();
  const passEmail = route.params;
  // useEffect(() => {}, []);
  
  return (
    <View>
      <ScrollView
        keyboardShouldPersistTaps={'always'}
        nestedScrollEnabled={true}>
        <ImageBackground
          source={LoginBackground}
          resizeMode="cover"
          style={{height: height, width: width}}>
          <GeneralStatusBarColor
            backgroundColor={'#ffa448'}
            barStyle="dark-content"
          />
          <View
            style={{
              width: width,
              alignItems: 'center',
            }}>
            <View style={styles.mainView}>
              <Image
                source={require('../../assets/emailSentRight.png')}
                style={styles.imageStyle}
              />

              <Text style={styles.successfulText}>Successful</Text>
              <View style={{width: width * 0.85}}>
                <Text style={styles.usermsg}>
                  Your Password has been shared to registered Email address
                </Text>
              </View>
              <TouchableOpacity
                style={styles.loginSubmitView}
                activeOpacity={0.8}
                onPress={() =>
                  navigation.navigate('Login', {email: passEmail})
                }>
                <Text style={styles.loginSubmitText}>Back to Login</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              position: 'absolute',
              bottom: 30,
              width: width,
              alignItems: 'center',
            }}>
            <Image
              source={require('../../assets/SunPharmaLogo.png')}
              style={styles.sunLogoImg}
            />
          </View>
        </ImageBackground>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: white,
    width: width * 0.85,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: Platform.OS == 'ios' ? 0.4 : 0.8,
    shadowRadius: 2,
    elevation: 5,
    width: width * 0.9,
    borderRadius: 30,
    marginTop: height * 0.1,
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 0.7,
  },
  imageStyle: {
    width: width * 0.5,
    resizeMode: 'contain',
  },
  successfulText: {
    fontFamily: PoppinsBold,
    color: mainColor,
    fontSize: 20,
  },
  usermsg: {
    textAlign: 'center',
    fontFamily: PoppinsRegular,
  },
  loginSubmitText: {
    fontSize: 15,
    fontFamily: PoppinsSemiBold,
    color: white,
    marginTop: 3,
  },
  loginSubmitView: {
    backgroundColor: mainColor,
    width: width * 0.5,
    shadowColor: mainColor,
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: Platform.OS == 'ios' ? 0.4 : 0.8,
    shadowRadius: 2,
    elevation: 5,
    borderRadius: 14,
    height: width * 0.12,
    marginTop: height * 0.04,
    alignItems: 'center',
    justifyContent: 'center',
    // marginBottom: 25,
  },
  sunLogoImg: {
    resizeMode: 'contain',
    width: width * 0.1,
    height: height * 0.1,
    marginTop: height * 0.05,
  },
});
