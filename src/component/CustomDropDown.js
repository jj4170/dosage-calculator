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
export default function CustomDropDown({
  data = [],
  value = {},
  onSelect = () => {},
  onClick = () => {},
  style,
  text,
  style1,
  textStyle,
  isError,
  smallTextSize,
  isNameText,
  isDropDownOne,
  showOption,
}) {
  // const [showOption, setShowOption] = useState(false);
  const onSelectedItem = val => {
    // setShowOption(false);
    onSelect(val);
  };
  // useEffect(() => {}, []);
  const [isError1, setError] = useState(isError);
  return (
    <View style={{flexGrow: 1}}>
      {/* <TouchableOpacity
        style={[
          styles.dropDownStyle,
          {
            ...style1,
            borderColor: isError == true ? error : null,
            borderWidth: isError == true ? 1 : 0,
          },
        ]}
        activeOpacity={0.8}
        onPress={() => {
          Keyboard.dismiss();
          onClick('val');
          setShowOption(!showOption);
          setError(false);
        }}>
        {!!value ? (
          <Text
            style={[
              styles.placeholderStyle,
              {width: width * 0.74, color: darkGray, ...textStyle},
            ]}>
            {value}
          </Text>
        ) : (
          <Text
            style={[styles.placeholderStyle, {color: '#cfcfcf', ...textStyle}]}>
            {text}
          </Text>
        )}
        <Image
          source={downArrowGray}
          style={[
            styles.arrowStyle,
            {transform: [{rotate: showOption ? '180deg' : '0deg'}]},
          ]}
        />
      </TouchableOpacity> */}
      {showOption && (
        <View
          style={{
            width: width,
            alignItems: 'center',
          }}>
          <View
            style={{
              position: Platform.OS == 'ios' ? 'relative' : 'absolute',
              zIndex: 9999,
              elevation: 10,
              width: width,
              backgroundColor: lightgray,
              shadowColor: black,
              shadowOffset:
                Platform.OS == 'ios'
                  ? {width: 1, height: 1}
                  : {width: 5, height: 5},
              shadowOpacity: Platform.OS == 'ios' ? 0.3 : 0.9,
              shadowRadius: 1,
              borderRadius: 15,
              marginTop: 1,
              height: height * 0.15,
              ...style,
            }}>
            <ScrollView
              nestedScrollEnabled={true}
              keyboardShouldPersistTaps={'always'}
              style={{
                width: width,
                height: height * 0.15,
                // backgroundColor: mainColor,
              }}>
              <View
                style={{
                  marginTop: 10,
                  // height: height * 0.2,
                  width: width,
                  marginBottom: 35,
                }}>
                {data?.map((val, i) => {
                  return (
                    <TouchableOpacity
                      key={i}
                      activeOpacity={0.8}
                      onPress={() => onSelectedItem(val)}
                      style={{
                        marginLeft: 10,
                        height: 27,
                        justifyContent: 'center',
                        marginTop: 3,
                        borderRadius: 5,
                        width: width * 0.8,
                        // backgroundColor: 'blue',
                        ...smallTextSize,
                      }}>
                      {isNameText == true ? (
                        <Text
                          key={String(i)}
                          style={{fontSize: 16, marginLeft: 8}}>
                          {val.name}
                        </Text>
                      ) : (
                        <Text
                          key={String(i)}
                          style={{fontSize: 16, marginLeft: 8}}>
                          {val.label}
                        </Text>
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ScrollView>
          </View>
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  dropDownStyle: {
    backgroundColor: lightgray,
    width: width * 0.9,
    height: width * 0.15,
    alignItems: 'center',
    borderRadius: 12,
    marginTop: 8,
    flexDirection: 'row',
    // zIndex: 999999,
  },
  placeholderStyle: {
    fontSize: width * 0.034,
    color: mediumGray,
    marginLeft: 10,
    width: width * 0.745,
  },
  arrowStyle: {
    resizeMode: 'contain',
    width: 15,
  },
});
