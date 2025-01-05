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
import {fetchResource, CryptoJSAesEncrypt} from '../../api/utils';
import {LoaderAnimated} from '../../component/Loader';
import BackMainColor from '../../assets/SVG/Back.svg';
const {white, black, lightgray, mediumGray, mainColor, error} = themeColor;
const {
  PoppinsBlack,
  PoppinsSemiBold,
  PoppinsMedium,
  PoppinsRegular,
  PoppinsBold,
} = customFont;
export default function ForgotPassword() {
  const navigation = useNavigation();
  const [isEmail, setEmail] = useState('');
  const [isEmptyUser, setEmptyUser] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const _email = useRef();

  useEffect(() => {
    _email.current.focus();
  }, []);
  const nextScreen = async () => {
    if (isEmail == '') {
      setEmptyUser(true);
    } else {
      try {
        setLoading(true);
       
        let data_to_encrypt = JSON.stringify({
          email: isEmail,
        });

        const encrypted_data = CryptoJSAesEncrypt(data_to_encrypt);
        let body = JSON.stringify(encrypted_data);
        const {status, token, message, data} = await fetchResource(
          {
            url: 'forgot-password',
            body,
          },
          false,
        );
        if (status == 1) {
          console.log('forgot email --->', message);
          setEmail('');
          navigation.navigate('SuccessFull', {email: isEmail});
          setLoading(false);
        } else {
          setLoading(false);
        }
      } catch (e) {
        setLoading(false);
      }
    }
  };
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
          <LoaderAnimated visible={isLoading} />
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
              <BackMainColor width={27} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: width,
              alignItems: 'center',
            }}>
            <View style={styles.mainView}>
              <Text style={styles.forgtoText}>Forgot Password</Text>
              <View
                style={{
                  alignItems: 'flex-start',
                  width: width * 0.8,
                  marginTop: height * 0.065,
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
                      // setEmptyUser(false);
                      // setEmptyPassword(false);
                    }}
                    onSubmitEditing={() => nextScreen()}
                    autoFocus
                    autoCapitalize="none"
                  />
                </View>
              </View>
              <View
                style={{
                  width: width * 0.8,
                  alignItems: 'center',
                  marginBottom: height * 0.1,
                  marginTop: height * 0.05,
                }}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.loginSubmitView}
                  onPress={() => nextScreen()}>
                  <Text style={styles.loginSubmitText}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View
            style={{
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
    //  height: height * 0.7,
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
    shadowColor: mainColor,
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: Platform.OS == 'ios' ? 0.4 : 0.8,
    shadowRadius: 2,
    elevation: 5,
    borderRadius: 14,
    width: width * 0.35,
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
    marginTop: height * 0.07,
  },
  forgtoText: {
    fontFamily: PoppinsSemiBold,
    color: black,
    fontSize: 20,
    marginTop: height * 0.08,
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
    width: width * 0.76,
    borderRadius: 13,
    height: width * 0.12,
    marginLeft: 10,
  },
  placeholderStyle: {
    marginLeft: 15,
    color: black,
    fontSize: 12,
    width: width * 0.65,
    fontFamily: PoppinsRegular,
    marginTop: Platform.OS == 'ios' ? 1 : 3,
  },
});
