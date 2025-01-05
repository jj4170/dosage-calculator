import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  View,
  Image,
  SafeAreaView,
} from 'react-native';

import {themeColor, width, height, customFont} from '../common/common';

const {white, black, lightgray, mediumGray, mainColor} = themeColor;
const {PoppinsBlack, PoppinsSemiBold, PoppinsBold} = customFont;
import {useNavigation} from '@react-navigation/native';
import BackMainColor from '../assets/img/Back.png';
export default function Header({
  onPress,
  buttonStyle,
  text,
  loading,
  isHeadertrue,
}) {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      {isHeadertrue == true ? (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: height * 0.1,
            marginLeft: 12,
          }}>
          <TouchableOpacity onPress={onPress}>
            <Image source={BackMainColor} style={{width: 27, height: 27}} />
          </TouchableOpacity>
          <Text
            style={[styles.headertext, {width: width * 0.85, marginRight: 30}]}>
            {text}
          </Text>
        </View>
      ) : (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            height: height * 0.1,
            marginLeft: 20,
          }}>
          <Text style={[styles.headertext, {width: width * 0.93}]}>{text}</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headertext: {
    fontFamily: PoppinsBold,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 5,
    //  marginLeft: 7,
  },
});
