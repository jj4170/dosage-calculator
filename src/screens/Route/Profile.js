import React, {useEffect, useRef, useState, useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePicker from 'react-native-image-crop-picker';
import ActionSheet from 'react-native-actionsheet';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  Platform,
} from 'react-native';
import {
  height,
  width,
  themeColor,
  customFont,
  images,
} from '../../common/common';
import GeneralStatusBarColor from '../../component/GenralStatusBar';
import {fetchResource, CryptoJSAesEncrypt} from '../../api/utils';
const {orangeBackground} = images;
const {white, black, lightgray, mainColor} = themeColor;
const {PoppinsSemiBold, PoppinsBold, PoppinsMedium} = customFont;
import toast from '../../common/Toast';
import Header from '../../component/Header';
import Edit from '../../assets/img/Edit.png';
import User from '../../assets/img/User.png';

export default function Profile({route}) {
  const navigation = useNavigation();
  // const {isImageProfile, setImageProfile} = useContext(AppContext);
  const [isLoading, setLoading] = useState(false);
  const [isdoctor_name, setdoctor_name] = useState('');
  const [isdoctor_email, setdoctor_email] = useState('');
  const [isdoctor_specility, setdoctor_specility] = useState('');
  const [isdoctor_country_name, setdoctor_country_name] = useState('');
  // const [isDoctor_image, setDoctor_image] = useState('');
  // const [isImage, setImage] = useState('');
  const [isProfileImage, setProfileImage] = useState(null);
  const actionSheet = useRef();

  useEffect(() => {
    getdata();
    setLoading(false);
    // console.log('route --->', route);
  }, []);
  const getdata = async () => {
    const doctor_name = await AsyncStorage.getItem('@doctor_name');
    setdoctor_name(doctor_name);
    const doctor_email = await AsyncStorage.getItem('@doctor_email');
    setdoctor_email(doctor_email);
    const doctor_specility = await AsyncStorage.getItem('@doctor_specility');
    setdoctor_specility(doctor_specility);
    const doctor_country_name = await AsyncStorage.getItem(
      '@doctor_country_name',
    );
    // console.log('doctor_Image -..>', doctor_country_name);
    setdoctor_country_name(doctor_country_name);
    const doctor_Image = await AsyncStorage.getItem('@doctor_Image');
    if (doctor_Image !== null) {
      console.log('doctor_Image_HVP1');
      console.log(doctor_Image);
      // var image = `${imagePath}${doctor_Image}`;
      setProfileImage(doctor_Image);
      // console.log('doctor_Image -..>', image);
    }
  };
  const capitalizeFirst = str => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  const deleteAccountPressed = async () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to Delete Account?',
      [
        {
          text: 'NO',
          onPress: () => {
            console.log('cancle Delete Account');
          },
        },
        {
          text: 'YES',
          onPress: async () => {
            setLoading(true);
            const doctor_id = await AsyncStorage.getItem('@doctor_id');
            // const body = new FormData();
            // body.append('doctor_id', doctor_id);

            let data_to_encrypt = JSON.stringify({
              doctor_id: doctor_id,
            });

            const encrypted_data = CryptoJSAesEncrypt(data_to_encrypt);
            let body = JSON.stringify(encrypted_data);

            // console.log('body delete -->', body);
            try {
              const {status, token, message, data} = await fetchResource(
                {
                  url: 'delete-account',
                  body,
                },
                true,
              );
              console.log('delete account -->', message, status);
              if (status == 1) {
                await AsyncStorage.removeItem('@token');
                await AsyncStorage.removeItem('@doctor_id');
                await AsyncStorage.removeItem('@doctor_name');
                await AsyncStorage.removeItem('@doctor_email');
                await AsyncStorage.removeItem('@doctor_specility');
                await AsyncStorage.removeItem('@doctor_country_name');
                await AsyncStorage.removeItem('@doctor_Image');

                navigation.replace('Login');
                toast.success({message: message});
                setLoading(false);
              } else {
                setLoading(false);
                toast.danger({message: 'Something went wrong'});
              }
            } catch (e) {
              setLoading(false);
              toast.danger({message: 'Something went wrong'});
              console.log('error login->', e);
            }
          },
        },
      ],
      {cancelable: false},
    );
  };
  const logoutPressed = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'NO',
          onPress: () => {
            console.log('cancle logout');
          },
        },
        {
          text: 'YES',
          onPress: async () => {
            setLoading(true);
            try {
              const {status, success} = await fetchResource(
                {
                  url: 'logout',
                },
                true,
              );
              console.log('logout account -->', success);
              if (status == 1) {
                await AsyncStorage.removeItem('@token');
                await AsyncStorage.removeItem('@doctor_id');
                await AsyncStorage.removeItem('@doctor_name');
                // await AsyncStorage.removeItem('@doctor_email');
                // await AsyncStorage.removeItem('@doctor_specility');
                // await AsyncStorage.removeItem('@doctor_country_name');
                await AsyncStorage.removeItem('@doctor_Image');
                setLoading(false);
                navigation.replace('Login');
                toast.success({message: success});
              } else {
                setLoading(false);
                toast.danger({message: 'Something went wrong'});
              }
            } catch (e) {
              setLoading(false);
              toast.danger({message: 'Something went wrong'});
              console.log('error login->', e);
            }
          },
        },
      ],
      {cancelable: false},
    );
  };
  const fromGallery = async () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    })
      .then(image => {
        // setDoctor_image(image.path);
        setProfileImage(image.path);
        // setImage({
        //   uri: image.path,
        //   width: image.width,
        //   height: image.height,
        //   mime: image.mime,
        // });
        _uploadImageBase64(image);
      })
      .catch(error => {
        console.log('Error picking image:', error); // Log any errors
      });
  };
  const _uploadImageBase64 = async image => {
    setLoading(true);
    const upload_body = {
      uri: image['path'],
      type: image['mime'],
      name:
        Platform.OS === 'ios'
          ? image['filename']
          : `my_profile_${Date.now()}.${
              image['mime'] === 'image/jpeg' ? 'jpg' : 'png'
            }`,
    };
    try {
      console.log('upload profile   -->');

      const doctor_id = await AsyncStorage.getItem('@doctor_id');

      const body = new FormData();
      body.append('doctor_id', doctor_id);
      body.append('image', upload_body);
      console.log('body --.profile', upload_body);
      // let body = JSON.stringify({
      //   doctor_id: doctor_id,
      //   image: upload_body,
      // });

      // const encrypted_data = CryptoJSAesEncrypt(data_to_encrypt);
      // let body = JSON.stringify(encrypted_data);

      // console.log('encrypted_data', encrypted_data);
      const {status, token, message, data} = await fetchResource(
        {
          url: 'profile-update',
          body,
        },
        true,
      );
      console.log('upload profile   -->', message);

      if (status == true) {
        var dataImage = data.image;
        setProfileImage(dataImage);
        console.log('data.image   -->', data.image);
        toast.success({message: message});
        await AsyncStorage.setItem('@doctor_Image', dataImage);
        setLoading(false);
      } else {
        toast.danger({message: 'Oops ! Something went wrong'});
        setLoading(false);
      }
    } catch (e) {
      console.log('e profile upload ->', e);
      toast.danger({message: 'Oops ! Something went wrong'});
      setLoading(false);
    }
  };
  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      // setDoctor_image(image.path);
      setProfileImage(image.path);
      // setImage({
      //   uri: image.path,
      //   width: image.width,
      //   height: image.height,
      //   mime: image.mime,
      // });
      _uploadImageBase64(image);
    });
  };

  const uploadProfile = () => {
    actionSheet.current.show();
  };

  const RenderMiddle = ({isGray, leftText, rightText}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: isGray == true ? lightgray : white,
          width: width * 0.89,
          borderRadius: 10,
          height: height * 0.06,
          alignItems: 'center',
        }}>
        <View
          style={{
            width: width * 0.3,
            marginLeft: 13,
          }}>
          <Text style={{fontFamily: PoppinsBold}}>{leftText}</Text>
        </View>
        <View style={{}}>
          <Text
            style={{
              fontFamily: PoppinsSemiBold,
              color: '#878787',
              fontSize: 12,
              width: width * 0.5,
            }}>
            {rightText}
          </Text>
        </View>
      </View>
    );
  };

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
          {/* <LoaderAnimated visible={isLoading} /> */}
          <Header text={'Profile'} />

          <View style={styles.containerMain}>
            <ScrollView>
              <View style={{width: width, alignItems: 'center'}}>
                <TouchableOpacity
                  style={styles.ProfileView}
                  activeOpacity={0.8}
                  onPress={uploadProfile}>
                  {isProfileImage == '' || isProfileImage === null ? (
                    <Image source={User} style={{height: 50, width: 50}} />
                  ) : (
                    <Image
                      source={{
                        uri: isProfileImage,
                      }}
                      style={{
                        width: width * 0.35,
                        height: width * 0.35,
                        borderRadius: height / 2,
                      }}
                    />
                  )}
                  <TouchableOpacity
                    style={styles.editView}
                    activeOpacity={0.8}
                    onPress={uploadProfile}>
                    <Image source={Edit} style={{height: 15, width: 15}} />
                  </TouchableOpacity>
                </TouchableOpacity>
                <View style={{marginTop: 25}}>
                  <RenderMiddle
                    isGray={true}
                    leftText={'Name  :'}
                    rightText={capitalizeFirst(isdoctor_name)}
                  />
                  <RenderMiddle
                    isGray={false}
                    leftText={'Email  :'}
                    rightText={isdoctor_email}
                  />
                  <RenderMiddle
                    isGray={true}
                    leftText={'Speciality  :'}
                    rightText={isdoctor_specility}
                  />
                  <RenderMiddle
                    isGray={false}
                    leftText={'Country  :'}
                    rightText={isdoctor_country_name}
                  />
                </View>
                {Platform.OS == 'ios' ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      width: width * 0.9,
                      justifyContent: 'space-between',
                      marginTop: height * 0.08,
                    }}>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={deleteAccountPressed}
                      style={[styles.deleteAccountStyle, {}]}>
                      <Text style={[styles.textBottom, {}]}>
                        Delete Account
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={logoutPressed}
                      style={[styles.deleteAccountStyle, {}]}>
                      <Text style={styles.textBottom}>Logout</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View
                    style={{
                      flexDirection: 'row',
                      width: width * 0.9,
                      marginTop: height * 0.08,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={logoutPressed}
                      style={[styles.deleteAccountStyle, {}]}>
                      <Text style={styles.textBottom}>Logout</Text>
                    </TouchableOpacity>
                  </View>
                )}
                <View
                  style={{
                    // position: 'absolute',
                    // bottom: Platform.OS == 'ios' ? height * 0.15 : height * 0.0,
                    width: width,
                    marginTop: height * 0.1,
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                      navigation.navigate('PrivacyPolicy', {isNavigate: true});
                    }}>
                    <Text style={styles.privacyText}>
                      Terms & Condition and Privacy Policy
                    </Text>
                  </TouchableOpacity>
                </View>
                {isLoading == true ? (
                  <View
                    style={{
                      borderRadius: 2,
                      padding: 10,
                      margin: 10,
                      alignSelf: 'center',
                    }}>
                    <ActivityIndicator color={mainColor} size="large" />
                  </View>
                ) : null}
              </View>
            </ScrollView>
          </View>
        </ImageBackground>
      </SafeAreaView>
      <ActionSheet
        ref={actionSheet}
        options={
          Platform.OS === 'ios'
            ? ['Cancel', 'Choose Photo From Gallery', 'Take Photo']
            : ['Take Photo', 'Choose Photo From Gallery', 'Cancel']
        }
        cancelButtonIndex={Platform.OS === 'ios' ? 0 : 2}
        onPress={index => {
          if (Platform.OS === 'ios') {
            switch (index) {
              case 1:
                fromGallery();
                break;
              case 2:
                takePhotoFromCamera();
                break;
            }
          } else {
            switch (index) {
              case 0:
                takePhotoFromCamera();
                break;
              case 1:
                fromGallery();
                break;
            }
          }
        }}
      />
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
  editView: {
    position: 'absolute',
    bottom: 2,
    right: 1,
    shadowColor: black,
    shadowOffset:
      Platform.OS == 'ios' ? {width: 1, height: 1} : {width: 5, height: 5},
    shadowOpacity: Platform.OS == 'ios' ? 0.4 : 0.8,
    shadowRadius: 1,
    elevation: 7,
    backgroundColor: white,
    borderRadius: height / 2,
    padding: 9,
  },
  ProfileView: {
    backgroundColor: white,
    width: width * 0.35,
    height: width * 0.35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: height / 2,
    marginTop: height * 0.05,
    shadowColor: black,
    shadowOffset:
      Platform.OS == 'ios' ? {width: 1, height: 1} : {width: 5, height: 5},
    shadowOpacity: Platform.OS == 'ios' ? 0.4 : 0.8,
    shadowRadius: 1,
    elevation: 7,
  },
  lastView: {
    backgroundColor: mainColor,
    width: width * 0.34,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    borderRadius: 13,
    shadowColor: mainColor,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: Platform.OS == 'ios' ? 0.4 : 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  lastText: {
    fontSize: 13,
    fontFamily: PoppinsBold,
    color: white,
    padding: 12,
  },
  deleteAccountStyle: {
    backgroundColor: white,
    width: width * 0.42,
    borderWidth: 1,
    borderColor: '#f29f23',
    height: height * 0.052,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  textBottom: {
    color: '#f29f23',
    fontFamily: PoppinsBold,
    fontSize: 14,
    marginTop: 3,
  },
  privacyText: {
    color: 'black',
    fontFamily: PoppinsMedium,
    fontSize: 12,
    marginTop: height * 0.05,
  },
});
