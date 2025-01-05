import React, {useEffect, useRef, useState, useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  NativeModules,
} from 'react-native';
import {
  height,
  width,
  themeColor,
  customFont,
  images,
} from '../../common/common';
import {AppContext} from '../../container/ContextProvider';

import {fetchResource, CryptoJSAesEncrypt} from '../../api/utils';
import EmailImg from '../../assets/img/EmailImg.png';
import PasswordImg from '../../assets/img/PasswordImg.png';
const {white, black, lightgray, mediumGray, mainColor, error} = themeColor;
const {
  PoppinsBlack,
  PoppinsSemiBold,
  PoppinsBold,
  PoppinsRegular,
  PoppinsMedium,
} = customFont;
const {orangeBackground, SunPharmaLogo} = images;
import LoginBackground from '../../assets/LoginBackground.png';
import EyeSlash from '../../assets/img/EyeSlash.png';
import EyeIcon from '../../assets/img/EyeIcon.png';
import GeneralStatusBarColor from '../../component/GenralStatusBar';
import {LoaderAnimated} from '../../component/Loader';
import toast from '../../common/Toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
// new
import CryptoJS from 'crypto-js';
import CryptoES from 'crypto-es';
import base64 from 'react-native-base64';
// import RNEncryptionModule from '@dhairyasharma/react-native-encryption';
import Aes from 'react-native-aes-crypto';
import NetInfo from '@react-native-community/netinfo';

// new
export default function Login({route}) {
  const navigation = useNavigation();
  const {isImageProfile, setImageProfile} = useContext(AppContext);
  const [showPassword, setShowPassword] = useState(false);
  const [isEmptyUser, setEmptyUser] = useState(false);
  const [isEmptyPassword, setEmptyPassword] = useState(false);
  const [isEmail, setEmail] = useState('');
  const [isPassword, setpassword] = useState('');
  const [isLoading, setLoading] = useState(false);

  const _email = useRef();
  const _password = useRef();
  // const passEmail = route.params;
  useEffect(() => {
    checkInternet();
    setLoading(false);
    // _email?.current?.focus();
  }, []);

  const checkInternet = () => {
    NetInfo.fetch().then(state => {
      if (state.isConnected == false) {
        toast.danger({message: 'Please Check your network connection'});
      } else {
      }
    });
  };
  const nextscreen = async () => {
    if (__DEV__) {
      clickSubmit();
    } else {
      NetInfo.fetch().then(async state => {
        console.log(state);
        if (state.isConnected == false) {
          toast.danger({message: 'Check your Internet connection'});
        } else {
          clickSubmit();
        }
      });
    }
  };
  const clickSubmit = async bodyEncrypted => {
    if (isEmail == '' || isPassword == '') {
      if (isEmail === '') {
        setEmptyUser(true);
      }
      if (isPassword === '') {
        setEmptyPassword(true);
      }
      if (isEmptyUser == true) {
        _email.current.focus();
      }
      if (isEmptyPassword == true) {
        _password.current.focus();
      }
      if (isEmptyUser == true && isEmptyPassword == true) {
        _email.current.focus();
      }
    } else {
      setLoading(true);
      try {
        // const body = new FormData();
        // body.append('email', "isEmail");
        // body.append('password', "isPassword");
        let data_to_encrypt = JSON.stringify({
          email: isEmail,
          password: isPassword,
        });
        const encrypted_data = CryptoJSAesEncrypt(data_to_encrypt);
        let body = JSON.stringify(encrypted_data);

        const {status, token, message, data} = await fetchResource(
          {
            url: 'login',
            body,
          },
          false,
        );
        setLoading(false);
        if (status == 1) {
          let dr_data = data.doctor_data;
          let token = data.token;
          if (dr_data.image !== null) {
            var userimg = dr_data.image;
            setImageProfile(userimg);
            await AsyncStorage.setItem('@doctor_Image', userimg);
          } else {
            setImageProfile('');
          }
          await AsyncStorage.setItem('@token', JSON.stringify(token));
          await AsyncStorage.setItem('@doctor_id', JSON.stringify(dr_data.id));
          await AsyncStorage.setItem('@doctor_name', dr_data.name);
          await AsyncStorage.setItem('@doctor_email', dr_data.email);
          await AsyncStorage.setItem('@doctor_specility', dr_data.speciality);
          await AsyncStorage.setItem(
            '@doctor_country_name',
            dr_data.country_name,
          );

          navigation.replace('Disclaimer', {modaldata: 'yes'});
          setLoading(false);
          setEmail('');
          setpassword('');
        } else {
          toast.danger({message: message});
          console.log('error login->', message);
          setLoading(false);
          setEmail('');
          setpassword('');
        }
      } catch (e) {
        toast.danger({message: 'Something went wrong'});
        console.log('error login->', e);
        setLoading(false);
      }
    }
  };
  return (
    <View>
      <ScrollView keyboardShouldPersistTaps={'always'}>
        <ImageBackground
          source={LoginBackground}
          resizeMode="cover"
          style={{height: height, width: width}}>
          <GeneralStatusBarColor
            backgroundColor={'#ffa448'}
            barStyle="dark-content"
          />
          <LoaderAnimated visible={isLoading} />
          <View style={{width: width, alignItems: 'center'}}>
            <Text
              style={[styles.appName, {color: black, marginTop: height * 0.1}]}>
              DRUG DOSAGE CALCULATOR
            </Text>
            <Text
              style={[styles.appName, {color: white, fontFamily: PoppinsBold}]}>
              DERMATOLOGY
            </Text>
            <View style={styles.mainView}>
              <Text style={styles.loginText}>Login</Text>
              <View
                style={{
                  alignItems: 'flex-start',
                  width: width * 0.8,
                  marginTop: 25,
                }}>
                <View style={styles.fieldView}>
                  <Image source={EmailImg} style={{width: 21, height: 16}} />
                  <Text style={styles.fieldText}>Email</Text>
                </View>
                <View style={[styles.emailView, {flexDirection: 'row'}]}>
                  <TextInput
                    label="Enter Username"
                    style={styles.placeholderStyle}
                    value={isEmail}
                    keyboardType="email-address"
                    placeholder="Enter Email"
                    placeholderTextColor={'#cfcfcf'}
                    ref={_email}
                    maxLength={50}
                    onChangeText={isEmail => {
                      setEmail(isEmail);
                      setEmptyUser(false);
                      setEmptyPassword(false);
                    }}
                    onSubmitEditing={() => _password.current.focus()}
                    autoFocus
                    autoCapitalize="none"
                  />
                </View>
                <View>
                  {isEmptyUser == true ? (
                    <Text style={styles.errorText}>Please enter a email</Text>
                  ) : null}
                </View>
                <View style={[styles.fieldView, {marginTop: 10}]}>
                  <Image source={PasswordImg} style={{width: 16, height: 16}} />
                  <Text style={styles.fieldText}>Password</Text>
                </View>
                <View
                  style={[
                    styles.emailView,
                    {flexDirection: 'row', justifyContent: 'center'},
                  ]}>
                  <TextInput
                    style={styles.placeholderStyle}
                    value={isPassword}
                    // keyboardType="email-address"
                    placeholder="Enter Password"
                    placeholderTextColor={'#cfcfcf'}
                    secureTextEntry={!showPassword}
                    ref={_password}
                    onChangeText={isPassword => {
                      setpassword(isPassword);
                      setEmptyUser(false);
                      setEmptyPassword(false);
                    }}
                    maxLength={50}
                    onSubmitEditing={() => nextscreen()}
                  />

                  <TouchableOpacity
                    style={{
                      width: width * 0.1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    activeOpacity={0.5}
                    onPress={() => {
                      setShowPassword(!showPassword);
                    }}>
                    {showPassword == true ? (
                      <Image source={EyeIcon} style={{width: 19, height: 13}} />
                    ) : (
                      <Image
                        source={EyeSlash}
                        style={{width: 19, height: 15}}
                      />
                    )}
                  </TouchableOpacity>
                </View>
                {isEmptyPassword == true ? (
                  <Text style={styles.errorText}>Please enter a password</Text>
                ) : null}
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={{
                    width: width * 0.8,
                    alignItems: 'flex-end',
                    marginTop: 8,
                  }}
                  onPress={() => navigation.navigate('ForgotPassword')}>
                  <Text style={styles.forgotText}>Forgot password?</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.loginSubmitView}
                  onPress={nextscreen}>
                  <Text style={styles.loginSubmitText}>Login</Text>
                </TouchableOpacity>

                <View style={styles.dontHaveAccountView}>
                  <Text style={[styles.forgotText, {textAlign: 'center'}]}>
                    Don't have account?
                  </Text>
                  <TouchableOpacity
                    style={{}}
                    onPress={() => navigation.navigate('Signup')}>
                    <Text
                      style={{
                        color: mainColor,
                        fontFamily: PoppinsSemiBold,
                        marginLeft: 5,
                      }}>
                      Sign up
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View
              style={{
                // position: 'absolute',
                // bottom: Platform.OS == 'ios' ? height * 0.15 : height * 0.03,
                width: width,
                alignItems: 'center',
              }}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  navigation.navigate('PrivacyPolicy', {isNavigate: false});
                }}>
                <Text style={styles.privacyText}>
                  Terms & Condition and Privacy Policy
                </Text>
              </TouchableOpacity>
            </View>
            <Image source={SunPharmaLogo} style={styles.sunLogoImg} />
          </View>
        </ImageBackground>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  appName: {
    // fontFamily: PoppinsBlack,
    fontFamily: PoppinsBlack,
    textAlign: 'center',
    fontSize: 20,
  },
  loginText: {
    fontFamily: PoppinsSemiBold,
    color: black,
    fontSize: 20,
    marginTop: height * 0.03,
  },
  mainView: {
    backgroundColor: white,
    width: width * 0.85,
    //   height: height * 0.55,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: Platform.OS == 'ios' ? 0.4 : 0.8,
    shadowRadius: 2,
    elevation: 5,
    width: width * 0.9,
    borderRadius: 18,
    marginTop: height * 0.05,
    alignItems: 'center',
  },
  sunLogoImg: {
    resizeMode: 'contain',
    width: width * 0.1,
    height: height * 0.1,
    // marginTop: height * 0.05,
  },
  fieldText: {
    marginLeft: 10,
    fontFamily: PoppinsRegular,
    marginTop: 3,
  },
  fieldView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emailView: {
    backgroundColor: lightgray,
    marginVertical: '3%',
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: Platform.OS == 'ios' ? 0.3 : 0.8,
    shadowRadius: 2,
    elevation: 5,
    fontSize: 16,
    width: width * 0.8,
    borderRadius: 13,
    height: width * 0.12,
  },
  forgotText: {
    color: mediumGray,
    fontFamily: PoppinsRegular,
    fontSize: 10,
  },

  placeholderStyle: {
    marginLeft: 15,
    color: black,
    fontSize: 12,
    width: width * 0.65,
    fontFamily: PoppinsRegular,
    marginTop: 3,
  },
  loginSubmitText: {
    fontSize: 15,
    fontFamily: PoppinsSemiBold,
    color: white,
    marginTop: 3,
  },
  loginSubmitView: {
    backgroundColor: mainColor,
    width: width * 0.8,
    shadowColor: mainColor,
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: Platform.OS == 'ios' ? 0.3 : 0.8,
    shadowRadius: 2,
    elevation: 5,
    borderRadius: 13,
    height: width * 0.12,
    marginTop: height * 0.04,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dontHaveAccountView: {
    width: width * 0.8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 15,
  },
  errorText: {
    color: error,
    fontSize: 10,
    fontFamily: PoppinsRegular,
    marginLeft: 12,
  },
  privacyText: {
    color: 'black',
    fontFamily: PoppinsMedium,
    fontSize: 12,
    marginTop: height * 0.02,
  },
});
