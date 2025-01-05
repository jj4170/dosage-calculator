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
import React, {useState} from 'react';
import {width, height, themeColor, customFont} from '../common/common';
const {mediumGray, white, lightgray, mainColor, black, darkGray, error} =
  themeColor;
//   import UpdownImage from '../../assets/SVG/UpdownImage.svg';
import UpdownImage from '../assets/SVG/UpdownImage.svg';

const {
  PoppinsBlack,
  PoppinsSemiBold,
  PoppinsRegular,
  PoppinsBold,
  PoppinsMedium,
} = customFont;
export default function RecentDropDown({
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
  onPressRecent,
  onPressAll,
  isRecentView,
}) {
  const [showOption, setShowOption] = useState(false);
  const onSelectedItem = val => {
    console.log('val', val);
    setShowOption(false);
    onSelect(val);
  };
  const [isError1, setError] = useState(isError);
  return (
    <View style={{flexGrow: 1}}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.updownView}
        onPress={() => setShowOption(!showOption)}>
        <UpdownImage />
      </TouchableOpacity>
      {showOption && (
        <View>
          <View
            style={{
              position: 'absolute',
              zIndex: 9999,
              top: 80,
              backgroundColor: white,
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 1},
              shadowOpacity: Platform.OS == 'ios' ? 0.3 : 0.8,
              shadowRadius: 2,
              borderRadius: 12,
              height: 65,
              width: 120,
              right: 20,
              elevation: Platform.OS == 'ios' ? 10 : 20,
            }}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                styles.allView,
                {
                  backgroundColor: isRecentView == false ? '#f7ddc5' : white,
                },
              ]}
              onPress={onPressAll}>
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
                  marginTop: 0.01,
                },
              ]}
              onPress={onPressRecent}>
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
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  updownView: {
    backgroundColor: white,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: Platform.OS == 'ios' ? 0.4 : 0.8,
    shadowRadius: 2,
    elevation: 5,
    borderRadius: 12,
    width: width * 0.13,
    height: height * 0.055,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: height * 0.03,
    marginLeft: 15,
  },
});
