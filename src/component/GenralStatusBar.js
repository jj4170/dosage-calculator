import React, {useEffect, useRef, useState} from 'react';
import {View, StatusBar} from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
export default function CustomStatusBar({
  backgroundColor,
  barStyle = 'dark-content',
}) {
  const insets = useSafeAreaInsets();
  return (
    <View style={{height: insets.top, backgroundColor}}>
      <StatusBar
        animated={true}
        backgroundColor={backgroundColor}
        barStyle={barStyle}
      />
    </View>
  );
}
