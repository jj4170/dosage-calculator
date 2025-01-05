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
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native';
import {height, width, themeColor, customFont} from '../../common/common';
import SunPharmaLogo from '../../assets/SunPharmaLogo.png';
import EmailImg from '../../assets/SVG/Email.svg';
import PasswordImg from '../../assets/SVG/Password.svg';
import {fetchResource, CryptoJSAesEncrypt} from '../../api/utils';
import {LoaderAnimated} from '../../component/Loader';
import toast from '../../common/Toast';
const {white, black, lightgray, mediumGray, mainColor, error} = themeColor;
const {PoppinsBlack, PoppinsSemiBold, PoppinsRegular} = customFont;
import LoginBackground from '../../assets/LoginBackground.png';
import CustomDropDown from '../../component/CustomDropDown';
import GeneralStatusBarColor from '../../component/GenralStatusBar';
import CountryPicker from 'react-native-country-codes-picker';

import downArrowGray from '../../assets/filledDownArrow.png';
import BackMainColor from '../../assets/img/Back.png';

export default function Signup() {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isEmptyUser, setEmptyUser] = useState(false);
  const [isEmptyDrName, setEmptyDrName] = useState(false);
  const [isEmptySpeciality, setEmptySpecialityr] = useState(false);
  const [isEmptyCountryName, setEmptyCountryName] = useState(false);
  const [selectedCallingCode, setSelectedCallingCode] = useState('');
  const [isPassword, setpassword] = useState('');
  const [isSelectCountry, setSelectCountry] = useState('');
  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState('');
  const [countryName, setCountryName] = useState('');

  const [isEmail, setEmail] = useState('');
  const [isDoctorName, setDoctorName] = useState('');
  const [isSpeciality, setSpeciality] = useState('');
  const _email = useRef();
  const _doctorName = useRef();
  const _specility = useRef();

  const data = [
    {label: 'Item 1', value: '1'},
    {label: 'Item 2', value: '2'},
    {label: 'Item 3', value: '3'},
    {label: 'Item 4', value: '4'},
    {label: 'Item 5', value: '5'},
    {label: 'Item 6', value: '6'},
    {label: 'Item 7', value: '7'},
    {label: 'Item 8', value: '8'},
  ];
  useEffect(() => {
    _email.current.focus();
  }, []);
  const validateEmail = email => {
    let re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
  };
  const nextscreen = async () => {
    if (
      isEmail == '' ||
      isDoctorName == '' ||
      isSpeciality == '' ||
      countryCode == '' ||
      countryName == ''
    ) {
      if (isEmail === '') {
        setEmptyUser(true);
      }
      if (isDoctorName === '') {
        setEmptyDrName(true);
      }
      if (isSpeciality === '') {
        setEmptySpecialityr(true);
      }
      if (countryName == '') {
        setEmptyCountryName(true);
      }
    } else {
      if (!validateEmail(isEmail)) {
        setEmptyUser(true);
        toast.danger({message: 'Please Enter valid E-mail'});
      } else {
        setLoading(true);
        try {
          // const body = new FormData();
          // body.append('name', isDoctorName);
          // body.append('email', isEmail);
          // body.append('speciality', isSpeciality);
          // body.append('country_code', countryCode);
          // body.append('country_name', countryName);

          let data_to_encrypt = JSON.stringify({
            name: isDoctorName,
            email: isEmail,
            speciality: isSpeciality,
            country_code: countryCode,
            country_name: countryName,
          });
          const encrypted_data = CryptoJSAesEncrypt(data_to_encrypt);
          let body = JSON.stringify(encrypted_data);

          const {status, token, message, data} = await fetchResource(
            {
              url: 'register',
              body,
            },
            false,
          );
          console.log('data sign up --->', status, message);

          if (status == 1) {
            setEmail('');
            setDoctorName('');
            setSpeciality('');
            setCountryName('');
            setCountryCode('');
            setLoading(false);
            navigation.replace('SuccessFull', {email: isEmail});
          } else {
            toast.danger({message: message});
            setLoading(false);
          }
        } catch (e) {
          console.log('error login->', e);
          toast.danger({message: 'Something went wrong'});
          setLoading(false);
        }
      }
    }
  };
  const DismissKeyboard = ({children}) => (
    <TouchableWithoutFeedback onPress={() => console.log('hi')}>
      {children}
    </TouchableWithoutFeedback>
  );
  onChangeText = ({dialCode, unmaskedPhoneNumber, phoneNumber, isVerified}) => {
    console.log(dialCode, unmaskedPhoneNumber, phoneNumber, isVerified);
  };
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        setShow(false);
      }}>
      <View>
        <GeneralStatusBarColor backgroundColor={'#ffa448'} />
        <SafeAreaView>
          <ScrollView
            horizontal={Platform.OS == 'ios' ? true : false}
            keyboardShouldPersistTaps={'always'}
            nestedScrollEnabled={true}>
            <LoaderAnimated visible={isLoading} />

            <ImageBackground
              source={LoginBackground}
              resizeMode="cover"
              style={{height: height, width: width}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  height: height * 0.1,
                  marginLeft: 12,
                }}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    navigation.navigate('Login');
                  }}>
                  <Image source={BackMainColor} style={{width: 27, height: 27}} />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: width,
                  alignItems: 'center',
                }}>
                <View style={styles.mainView}>
                  <Text style={styles.loginText}>Sign Up</Text>
                  <View
                    style={{
                      alignItems: 'flex-start',
                      width: width * 0.8,
                      marginTop: 15,
                    }}>
                    <View style={styles.fieldView}>
                      <Text style={styles.fieldText}>Email ID</Text>
                    </View>
                    <View
                      style={[
                        styles.emailView,
                        {
                          flexDirection: 'row',
                          borderColor: isEmptyUser == true ? error : null,
                          borderWidth: isEmptyUser == true ? 1 : 0,
                        },
                      ]}>
                      <TextInput
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
                        }}
                        onSubmitEditing={() => _doctorName.current.focus()}
                        autoFocus
                        autoCapitalize="none"
                      />
                    </View>

                    <View style={[styles.fieldView, {marginTop: 10}]}>
                      <Text style={styles.fieldText}>Doctor Name</Text>
                    </View>
                    <View
                      style={[
                        styles.emailView,
                        {
                          borderColor: isEmptyDrName == true ? error : null,
                          borderWidth: isEmptyDrName == true ? 1 : 0,
                        },
                      ]}>
                      <TextInput
                        style={styles.placeholderStyle}
                        value={isDoctorName}
                        keyboardType="email-address"
                        placeholder="Enter Doctor Name"
                        placeholderTextColor={'#cfcfcf'}
                        //  secureTextEntry={!showPassword}
                        ref={_doctorName}
                        maxLength={50}
                        onChangeText={isDrName => {
                          setDoctorName(isDrName);
                          setEmptyDrName(false);
                          // setEmptyPassword(false);
                        }}
                        onSubmitEditing={() => _specility.current.focus()}
                        autoFocus
                        autoCapitalize="none"
                      />
                    </View>

                    <View style={[styles.fieldView, {marginTop: 10}]}>
                      <Text style={styles.fieldText}>Speciality</Text>
                    </View>
                    <View
                      style={[
                        styles.emailView,
                        {
                          borderColor: isEmptySpeciality == true ? error : null,
                          borderWidth: isEmptySpeciality == true ? 1 : 0,
                        },
                      ]}>
                      <TextInput
                        style={styles.placeholderStyle}
                        value={isSpeciality}
                        maxLength={50}
                        keyboardType="email-address"
                        placeholder="Enter Speciality"
                        placeholderTextColor={'#cfcfcf'}
                        secureTextEntry={!showPassword}
                        ref={_specility}
                        onChangeText={isSpecility => {
                          setSpeciality(isSpecility);
                          setEmptySpecialityr(false);
                          // setEmptyPassword(false);
                        }}
                        onSubmitEditing={() => setShow(true)}
                        autoFocus
                        autoCapitalize="none"
                      />
                    </View>

                    <View style={[styles.fieldView, {marginTop: 10}]}>
                      <Text style={styles.fieldText}>Country</Text>
                    </View>
                    <View
                      style={{
                        width: width * 0.8,
                        alignItems: 'center',
                      }}>
                      <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity
                          onPress={() => setShow(true)}
                          style={[
                            styles.emailView,
                            {
                              alignItems: 'center',
                              flexDirection: 'row',
                              borderColor:
                                isEmptyCountryName == true ? error : null,
                              borderWidth: isEmptyCountryName == true ? 1 : 0,
                            },
                          ]}>
                          {countryCode == '' ? (
                            <Text
                              style={[
                                styles.placeholderStyle,
                                {
                                  marginLeft: 1,
                                  color: '#cfcfcf',
                                  width: width * 0.6,
                                  marginLeft: 15,
                                  marginTop: height * 0.035,
                                },
                              ]}>
                              Select Country
                            </Text>
                          ) : (
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: height * 0.04,
                              }}>
                              <Text
                                style={[
                                  styles.placeholderStyle,
                                  {
                                    marginLeft: 1,
                                    color: black,
                                    marginLeft: 15,
                                    width: width * 0.6,
                                    marginTop: height * 0.035,
                                  },
                                ]}>
                                {countryCode} {countryName}
                              </Text>
                            </View>
                          )}
                          <View>
                            <Image
                              source={downArrowGray}
                              style={[
                                styles.arrowStyle,
                                {
                                  transform: [
                                    {rotate: show ? '180deg' : '0deg'},
                                  ],
                                },
                              ]}
                            />
                          </View>
                        </TouchableOpacity>

                        <CountryPicker
                          show={show}
                          pickerButtonOnPress={item => {
                            setCountryCode(item.dial_code);
                            setCountryName(item.name.en);
                            setShow(false);
                            setEmptyCountryName(false);
                          }}
                        />
                      </View>
                    </View>

                    <View style={{width: width * 0.8, alignItems: 'center'}}>
                      <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.loginSubmitView}
                        onPress={nextscreen}>
                        <Text style={styles.loginSubmitText}>Submit</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

                <Image
                  source={require('../../assets/SunPharmaLogo.png')}
                  style={styles.sunLogoImg}
                />
              </View>
            </ImageBackground>
          </ScrollView>
        </SafeAreaView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  appName: {
    fontFamily: PoppinsBlack,
    textAlign: 'center',
    fontSize: 25,
    marginTop: height * 0.1,
  },
  arrowStyle: {
    resizeMode: 'contain',
    width: 15,
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
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: Platform.OS == 'ios' ? 0.4 : 0.8,
    shadowRadius: 2,
    elevation: 5,
    width: width * 0.9,
    borderRadius: 30,
    marginTop: height * 0.05,
    alignItems: 'center',
    justifyContent: 'center',
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
    width: width * 0.76,
    borderRadius: 13,
    height: width * 0.12,
    marginLeft: 10,
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
    marginTop: Platform.OS == 'ios' ? 1 : 3,
    height: width * 0.12,
  },
  loginSubmitText: {
    fontSize: 15,
    fontFamily: PoppinsSemiBold,
    color: white,
    marginTop: 3,
  },
  loginSubmitView: {
    backgroundColor: mainColor,
    shadowColor: mainColor,
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: Platform.OS == 'ios' ? 0.4 : 0.8,
    shadowRadius: 2,
    elevation: 5,
    borderRadius: 13,
    width: width * 0.35,
    height: width * 0.12,
    marginTop: height * 0.04,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25,
  },
  dontHaveAccountView: {
    width: width * 0.8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  errorText: {
    color: error,
    fontSize: 10,
    fontFamily: PoppinsRegular,
    marginLeft: 12,
  },
  dropDownMain: {
    backgroundColor: lightgray,
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: Platform.OS == 'ios' ? 0.4 : 0.8,
    shadowRadius: 2,
    fontSize: 16,
    width: width * 0.76,
    height: width * 0.12,
    marginTop: 10,
  },
});
