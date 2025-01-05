import React, {useState} from 'react';

import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {themeColor, height, width} from '../common/common';

const CustomSwitch = ({
  navigation,
  selectionMode,
  roundCorner,
  option1,
  option2,
  onSelectSwitch,
  selectionColor,
  onPress,
  style,
  textStyle,
  stylePound,
}) => {
  const [getSelectionMode, setSelectionMode] = useState(selectionMode);
  const [getRoundCorner, setRoundCorner] = useState(roundCorner);
  console.log('selectionMode --->', onPress);
  const updatedSwitchData = val => {
    setSelectionMode(val);
    onSelectSwitch(val);
  };

  return (
    <View>
      <View
        style={{
          height: height * 0.044,
          width: width * 0.36,
          backgroundColor: 'white',
          borderRadius: 10,
          flexDirection: 'row',
          justifyContent: 'center',
          padding: 2,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 1},
          shadowOpacity: Platform.OS == 'ios' ? 0.4 : 0.8,
          shadowRadius: 2,
          elevation: 5,
          marginLeft: 20,
        }}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={onPress}
          style={{
            flex: 1,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Text
            style={{
              color: selectionMode == 'kg' ? 'white' : selectionColor,
            }}>
            '{option1}'
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          TouchableOpacity
          activeOpacity={1}
          onPress={onPress}
          style={{
            flex: 1,
            // backgroundColor:
            //   selectionMode == 'pound' ? selectionColor : 'white',
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Text
            style={{
              color: selectionMode == 'pound' ? 'white' : selectionColor,
            }}>
            '{option2}'
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default CustomSwitch;
