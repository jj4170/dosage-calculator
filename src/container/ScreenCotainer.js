import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useState, useContext} from 'react';
import {useNavigation} from '@react-navigation/native';

import {
  height,
  width,
  themeColor,
  customFont,
  images,
  imagePath,
} from '../common/common';
const {white, black, lightgray, mediumGray, mainColor, addBlueColor} =
  themeColor;
import UserMain from '../assets/img/User.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppContext} from '../container/ContextProvider';
const {
  PoppinsBlack,
  PoppinsSemiBold,
  PoppinsRegular,
  PoppinsBold,
  PoppinsMedium,
} = customFont;
export default function ScreenCotainer({isDoctorName, image}) {
  const [isProfileImage, setProfileImage] = useState('');
  const {isImageProfile, setImageProfile} = useContext(AppContext);
  const navigation = useNavigation();
  React.useEffect(() => {
    const getDoctorImage = async () => {
      const doctor_Image = await AsyncStorage.getItem('@doctor_Image');
      setImageProfile(isImageProfile);
      setProfileImage(doctor_Image);
    };
    getDoctorImage();
  }, [isImageProfile]);
  const capitalizeFirst = str => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  return (
    <View style={{width: width * 0.97}}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Profile');
        }}
        activeOpacity={0.8}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: height * 0.04,
        }}>
        <View style={styles.profileImageView}>
          {isProfileImage == null ? (
            <Image source={UserMain} width={23} height={23} />
          ) : isImageProfile == '' ? (
            <Image
              source={{
                uri: isProfileImage,
              }}
              style={{
                width: width * 0.145,
                height: height * 0.07,
                // borderRadius: height / 2,
                borderRadius: 15,
              }}
            />
          ) : (
            <Image
              source={{
                uri: isImageProfile,
              }}
              style={{
                width: width * 0.145,
                height: height * 0.07,
                // borderRadius: height / 2,
                borderRadius: 15,
              }}
            />
          )}
        </View>
        <View style={{}}>
          <Text
            style={{
              fontFamily: PoppinsBold,
              marginLeft: 20,
              fontSize: 14,
            }}>
            {capitalizeFirst(isDoctorName)}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  profileImageView: {
    width: width * 0.145,
    height: height * 0.07,
    backgroundColor: white,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: Platform.OS == 'ios' ? 0.4 : 0.8,
    shadowRadius: 2,
    elevation: 5,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
  },
});
