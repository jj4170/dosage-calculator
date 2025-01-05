import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  View,
} from 'react-native';

export const themeColor = {
  white: '#fff',
  black: '#000',
  lightgray: '#f6f6f6',
  mediumGray: '#a3a3a3',
  mediumDarkGray: '#e2e2e2',
  mainColor: '#ff7700',
  addBlueColor: '#465962',
  mainBackYellor: '#f7e9dd',
  darkGray: '#707070',
  error: '#ed1c24',
  backYellow: '#ffe3bc',
  backRed: '#f8c1bd',
  shimmer: '#E0E0E0',
};

export const customFont = {
  PoppinsBlack: 'Poppins-Black',
  PoppinsRegular: 'Poppins-Regular',
  PoppinsSemiBold: 'Poppins-SemiBold',
  PoppinsBold: 'Poppins-Bold',
  PoppinsMedium: 'Poppins-Medium',
};

export const images = {
  orangeBackground: require('../assets/LoginBackground.png'),
  SunPharmaLogo: require('../assets/SunPharmaLogo.png'),
  DeleteIcon: require('../assets/delete.png'),
  AddIcon: require('../assets/add.png'),
  NoDataImage: require('../assets/noData.png'),
};

export const width = Dimensions.get('window').width;
export const height = Dimensions.get('window').height;

export const capitalizeFirst = str => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const getFormatedStringFromDays = days => {
  days = +days;
  if (Number.isInteger(+days)) {
    var months = Math.floor(days / 30);
    var mon_text = months <= 1 ? ' month ' : ' months ';
    var days = days % 30;
    var day_text = days <= 1 ? ' day' : ' days';
    // console.log('days---->', months + mon_text + days + day_text);
    return months + mon_text + days + day_text;
  } else {
    return 'not a number';
  }
  // var years = Math.floor(numberOfDays / 365);
  // var years2 = Math.floor((numberOfDays % 365) / 12);
  // var months = Math.floor((numberOfDays % 365) / 30);
  // var days = Math.floor((numberOfDays % 365) % 30);

  // var yearsDisplay = years > 0 ? years + (years == 1 ? 'year' : 'years') : '';
  // var monthsDisplay =
  //   months > 0 ? months + (months == 1 ? 'month' : 'months') : '';
  // var daysDisplay = days > 0 ? days + (days == 1 ? 'day' : 'days') : '';

  // return yearsDisplay + monthsDisplay + daysDisplay;
};

export const imagePath =
  'https://sun-dosecalculator.bdccoder.in/storage/doctor/';

export const dataFrequency = [
  // {value: 0, label: '0'},
  {value: 1, label: '1'},
  {value: 2, label: '2'},
  {value: 3, label: '3'},
];

export const dataMedicie1 = [{value: '1', label: 'Acne'}];

export const dataMedcine2 = [
  {value: '1', label: 'Initial Dose'},
  {value: '2', label: 'Maintenance Dose'},
];
export const dataMedicie2INdication = [{value: '1', label: 'Psoriasis'}];

export const dataMedicie3 = [
  {value: '1', label: 'Psoriasis'},
  {value: '2', label: 'Atopic Dermatitis'},
];
