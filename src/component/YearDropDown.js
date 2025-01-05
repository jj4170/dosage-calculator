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
import downArrowGray from '../assets/mainDown.png';
export default function YearDropDown({
  data = [],
  // data,
  value = {},
  onSelect = () => {},
  style,
  text,
  style1,
  textStyle,
  isError,
  smallTextSize,
  isNameText,
  isShow,
}) {
  const [showOption, setShowOption] = useState(false);
  const onSelectedItem = val => {
    console.log('val', val);
    setShowOption(false);
    onSelect(val);
  };
  console.log('isShow -->', isShow);
  useEffect(() => {
    setShowOption(isShow);
  }, []);
  const [isError1, setError] = useState(isError);
  return (
    <View style={{height: height * 0.15}}>
      <View
        style={{
          marginLeft: width * 0.5,
        }}>
        <TouchableOpacity
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
            // setShowOption(isShow);
            Keyboard.dismiss();
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
              style={[
                styles.placeholderStyle,
                {color: '#cfcfcf', ...textStyle},
              ]}>
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
        </TouchableOpacity>
        {showOption == true ? (
          <View style={{flexGrow: 1}}>
            <View
              style={{
                position: 'absolute',
                zIndex: 9999,
                height: width * 0.3,
                //   width: width,
                elevation: 10,
                backgroundColor: white,
                shadowColor: black,
                shadowOffset:
                  Platform.OS == 'ios'
                    ? {width: 1, height: 1}
                    : {width: 5, height: 5},
                shadowOpacity: Platform.OS == 'ios' ? 0.3 : 0.9,
                shadowRadius: 1,
                borderRadius: 15,
                ...style,
              }}>
              <ScrollView
                nestedScrollEnabled={true}
                keyboardShouldPersistTaps={'always'}
                style={{width: width, height: height * 0.13}}>
                <View style={{marginTop: 10, width: width, marginBottom: 25}}>
                  {data.map((val, i) => {
                    return (
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => onSelectedItem(val)}
                        style={{
                          marginLeft: 10,
                          height: 30,
                          justifyContent: 'center',
                          // backgroundColor: lightgray,
                          marginTop: 2,
                          borderRadius: 5,
                          width: width * 0.25,
                          ...smallTextSize,
                        }}>
                        <Text
                          key={String(i)}
                          style={{
                            fontSize: 15,
                            marginLeft: 8,
                            color: mainColor,
                          }}>
                          {val.year}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </ScrollView>
            </View>
          </View>
        ) : null}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  dropDownStyle: {
    backgroundColor: white,
    width: width * 0.9,
    height: width * 0.1,
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
