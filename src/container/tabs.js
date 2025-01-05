import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Platform,
} from 'react-native';
const Tab = createBottomTabNavigator();
//screens

import Home from '../screens/Route/Home';
import Profile from '../screens/Route/Profile';
import Calculator from '../screens/Route/Calculator';
import useKeyboard from '../component/UseKeyboard';
import {width, height, themeColor} from '../common/common';
//images
import HomeActive from '../assets/img/HomeActive.png';
import HomeImg from '../assets/img/Home.png';
import CalculatorImg from '../assets/SVG/Calculator.svg';
import UserActive from '../assets/SVG/User.svg';
import UserGray from '../assets/img/UserGray.png';
import CalculatorWhite from '../assets/img/CalculatorWhite.png';
import OvelShape from '../assets/img/OvelShape.png';

const CustomTabBarButton = ({children, onPress}) => {
  const isKeyboardOpen = useKeyboard();
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={onPress}
      style={{
        top: -20,
        justifyContent: 'center',
        alignItems: 'center',
        ...styles.shadowBUtton,
      }}>
      {isKeyboardOpen == true ? null : (
        <Image
          source={OvelShape}
          style={{
            width: 60,
            height: 54,
          }}
        />
      )}

      <View
        style={{
          width: 40,
          height: 40,
          borderRadius: 35,
          position: 'absolute',
        }}>
        {children}
      </View>
    </TouchableOpacity>
  );
};
const Tabs = () => {
  const isKeyboardOpen = useKeyboard();
  return (
    <Tab.Navigator
      initialRouteName="Calculator"
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{height: height * 0.05}}>
              <View style={{marginTop: 12}}>
                {focused ? (
                  <Image
                    source={HomeActive}
                    style={{
                      width: 28,
                      height: 22,
                    }}
                  />
                ) : (
                  <Image
                    source={HomeImg}
                    style={{
                      width: 28,
                      height: 22,
                    }}
                  />
                )}
                {focused ? (
                  <View
                    style={{
                      backgroundColor: '#ff7700',
                      height: 3,
                      width: 25,
                      marginTop: 10,
                    }}></View>
                ) : null}
              </View>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Calculator"
        component={Calculator}
        options={{
          tabBarIcon: ({focused}) =>
            isKeyboardOpen == true ? null : (
              <Image
                source={CalculatorWhite}
                style={{
                  width: 22,
                  height: 25,
                }}
              />
            ),
          tabBarButton: props => <CustomTabBarButton {...props} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{height: height * 0.05}}>
              <View style={{marginTop: 6}}>
                <Image
                  source={UserGray}
                  style={{
                    width: 20,
                    height: 24,
                    marginTop: 4,
                    marginLeft: focused ? 2 : 0,
                  }}
                />
                {focused ? (
                  <View
                    style={{
                      backgroundColor: '#ff7700',
                      height: 3,
                      width: 25,
                      marginTop: 10,
                      marginLeft: focused ? 2 : 0,
                    }}></View>
                ) : null}
              </View>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  shadowBUtton: {
    borderRadius: 40,
    shadowColor: '#ff7700',
    shadowOffset:
      Platform.OS == 'ios' ? {width: 0, height: 5} : {width: 0, height: 10},
    shadowOpacity: Platform.OS == 'ios' ? 0.4 : 0.9,
    shadowRadius: 5,
    elevation: 10,
  },
});
export default Tabs;
