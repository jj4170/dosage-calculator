import React, {useState, useEffect} from 'react';
import {Button, View, StyleSheet, Text, TouchableOpacity} from 'react-native';
const {white, black, lightgray, mediumGray, mainColor, addBlueColor, shimmer} =
  themeColor;
import {height, width, themeColor, customFont, images} from '../common/common';
const {
  PoppinsBlack,
  PoppinsSemiBold,
  PoppinsRegular,
  PoppinsBold,
  PoppinsMedium,
} = customFont;
export default function PopRecentView({isVisible, isRecentView = true}) {
  return (
    <View>
      <View
        style={{
          position: 'absolute',
          zIndex: 9999,
          top: 70,
          right: 130,
          backgroundColor: white,
          elevation: 10,
          height: 65,
          width: 120,
          shadowColor: Platform.OS == 'ios' ? black : black,
          shadowOffset:
            Platform.OS == 'ios'
              ? {width: 1, height: 1}
              : {width: 5, height: 5},
          shadowOpacity: Platform.OS == 'ios' ? 0.3 : 0.9,
          shadowRadius: Platform.OS == 'ios' ? 0 : 1,
          borderRadius: 15,
        }}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={[
            styles.allView,
            {
              backgroundColor: isRecentView == false ? '#f7ddc5' : white,
            },
          ]}
          onPress={() => {
            console.log('-->', 'all');
            //   setRecentView(false);
            //   setShowOption(false);
            //   getData(true, 'all');
          }}>
          <Text
            style={{
              marginLeft: 10,
              color: isRecentView == false ? mainColor : black,
              fontFamily: PoppinsRegular,
            }}>
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={[
            styles.recentView,
            {
              backgroundColor: isRecentView == true ? '#f7ddc5' : white,
              marginTop: 3,
            },
          ]}
          onPress={() => {
            console.log('-->', 'recent');
            //   setRecentView(true);
            //   setShowOption(false);
            //   SearchFilterData('', 'recent');
          }}>
          <Text
            style={{
              marginLeft: 10,
              color: isRecentView == true ? mainColor : black,
              fontFamily: PoppinsRegular,
            }}>
            Recent
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderBottomColor: '#5b4c82',
    borderBottomWidth: 1,
    marginVertical: 10,
    marginHorizontal: 10,
    justifyContent: 'center',
    borderRadius: 2,
    height: 50,
  },
  allView: {
    backgroundColor: '#f7ddc5',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    height: height * 0.045,
    justifyContent: 'center',
  },
  recentView: {
    backgroundColor: white,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    height: height * 0.045,
    justifyContent: 'center',
  },
});

{
  /* <View
style={{
  position: 'absolute',
  zIndex: 9999,
  top: 80,
  right: 20,
  backgroundColor: white,
  elevation: 10,
  height: 65,
  width: 120,
  shadowColor: Platform.OS == 'ios' ? white : black,
  shadowOffset:
    Platform.OS == 'ios'
      ? {width: 1, height: 1}
      : {width: 5, height: 5},
  shadowOpacity: Platform.OS == 'ios' ? 0.3 : 0.9,
  shadowRadius: Platform.OS == 'ios' ? 0 : 1,
  borderRadius: 15,
}}>
<TouchableOpacity
  activeOpacity={0.8}
  style={[
    styles.allView,
    {
      backgroundColor:
        isRecentView == false ? '#f7ddc5' : white,
    },
  ]}
  onPress={() => {
    setRecentView(false);
    setShowOption(false);
    getData(true, 'all');
  }}>
  <Text
    style={{
      marginLeft: 10,
      color: isRecentView == false ? mainColor : black,
      fontFamily: PoppinsRegular,
    }}>
    All
  </Text>
</TouchableOpacity>
<TouchableOpacity
  activeOpacity={0.8}
  style={[
    styles.recentView,
    {
      backgroundColor: isRecentView == true ? '#f7ddc5' : white,
      marginTop: 3,
    },
  ]}
  onPress={() => {
    setRecentView(true);
    setShowOption(false);
    SearchFilterData('', 'recent');
  }}>
  <Text
    style={{
      marginLeft: 10,
      color: isRecentView == true ? mainColor : black,
      fontFamily: PoppinsRegular,
    }}>
    Recent
  </Text>
</TouchableOpacity>
</View>
)} */
}
