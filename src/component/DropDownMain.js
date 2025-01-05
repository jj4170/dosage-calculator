import React, {useState} from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  View,
  Image,
  Platform,
  TouchableWithoutFeedback,
  Picker,
} from 'react-native';

import {themeColor, height, width} from '../common/common';

const {white, black, darkGray, mediumGray, lightgray} = themeColor;
import {Dropdown} from 'react-native-element-dropdown';

const device = Platform.OS;
export default function DropDownMain({
  style,
  text,
  disable,
  onChange,
  value,
  data,
  search,
}) {
  return (
    <View
      style={{
        borderRadius: 13,
        marginTop: 5,
        shadowColor: black,
        shadowOffset: Platform.OS == 'ios' ? {width: 1, height: 1} : {width: 5, height: 5},
        shadowOpacity: Platform.OS == 'ios' ? 0.4 : 0.8,
        shadowRadius: 1,
        elevation: 2,
        height: width * 0.12,
        backgroundColor: lightgray,
        justifyContent: 'center',
        alignItems: 'center',
        ...style,
      }}>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={[
          styles.placeholderStyle,
          {
            color: mediumGray,
          },
        ]}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        containerStyle={{
          color: white,
          bottom: 1,
          borderBottomLeftRadius: 15,
          borderBottomRightRadius: 15,
        }}
        data={data}
        search={search}
        maxHeight={200}
        labelField="label"
        valueField="value"
        placeholder={text}
        searchPlaceholder="Search..."
        value={value}
        onChange={onChange}
        disable={disable}
        itemStyle={{padding: 50}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: height * 0.05,
    borderRadius: 8,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.9,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: width * 0.034,
    color: mediumGray,
  },
  selectedTextStyle: {
    fontSize: width * 0.032,
    color: darkGray,
    marginLeft: 3,
    marginTop: 3,
  },

  inputSearchStyle: {
    height: width * 0.1,
    fontSize: width * 0.03,
    borderRadius: 5,
    color: mediumGray,
  },
});
