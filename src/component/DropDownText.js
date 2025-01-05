import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Keyboard,
  Platform,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {width, height, themeColor} from '../common/common';
const {mediumGray, white, lightgray, mainColor, black, darkGray, error} =
  themeColor;
import downArrowGray from '../assets/filledDownArrow.png';
export default function DropDownText({
  value,
  onPress,
  isError,
  text,
  isDownOpacity,
  styleView,
  styleText,
}) {
  const [showOption, setShowOption] = useState(false);
  const onSelectedItem = val => {
    setShowOption(false);
    onSelect(val);
  };
  // useEffect(() => {}, []);
  return (
    <View style={{}}>
      <TouchableOpacity
        style={
          isDownOpacity == true
            ? [
                styles.dropDownStyleDown,
                {
                  ...styleView,
                },
              ]
            : [
                styles.dropDownStyle,
                {
                  borderColor: isError == true ? error : null,
                  borderWidth: isError == true ? 1 : 0,
                  ...styleView,
                },
              ]
        }
        onPress={onPress}
        activeOpacity={0.8}>
        <View>
          {value == '' ? (
            <Text
              style={[
                styles.placeholderStyle,
                {
                  width: isDownOpacity == true ? width * 0.65 : width * 0.74,
                  color: '#cfcfcf',
                  ...styleText,
                },
              ]}>
              {text}
            </Text>
          ) : (
            <Text
              style={[
                styles.placeholderStyle,
                {
                  width: isDownOpacity == true ? width * 0.65 : width * 0.74,
                  color: black,
                  ...styleText,
                },
              ]}>
              {value}
            </Text>
          )}
        </View>
        <Image
          source={downArrowGray}
          style={[
            styles.arrowStyle,
            {transform: [{rotate: showOption ? '180deg' : '0deg'}]},
          ]}
        />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  dropDownStyle: {
    backgroundColor: lightgray,
    width: width * 0.9,
    height: width * 0.12,
    alignItems: 'center',
    borderRadius: 12,
    marginTop: Platform.OS == 'ios' ? height * 0.01 : 3,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: Platform.OS == 'ios' ? 0.4 : 0.8,
    shadowRadius: 2,
    elevation: Platform.OS == 'ios' ? 0 : 5,
    zIndex: 99999,
  },
  dropDownStyleDown: {
    backgroundColor: white,
    width: width * 0.8,
    height: width * 0.12,
    alignItems: 'center',
    borderRadius: 12,
    marginTop: Platform.OS == 'ios' ? height * 0.015 : 3,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: Platform.OS == 'ios' ? 0.4 : 0.8,
    shadowRadius: 2,
    // elevation: Platform.OS == 'ios' ? 0 : 5,
    zIndex: 99999,
    marginLeft: 25,
  },
  placeholderStyle: {
    fontSize: 12,
    color: '#cfcfcf',
    marginLeft: 10,
    width: width * 0.745,
  },
  arrowStyle: {
    resizeMode: 'contain',
    width: 15,
  },
});
