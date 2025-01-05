import React, {useEffect, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  BackHandler,
  Animated,
  Button,
  StatusBar,
  ImageBackground,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {
  height,
  width,
  themeColor,
  customFont,
  images,
} from '../../common/common';
import Header from '../../component/Header';
const {orangeBackground} = images;
import MedicineIcon from '../../assets/img/MedicineIcon.png';
import Medicine from '../../assets/SVG/MedicineIcon.svg';

import {LoaderAnimated} from '../../component/Loader';
import GeneralStatusBarColor from '../../component/GenralStatusBar';

const {
  white,
  black,
  lightgray,
  mediumGray,
  mainColor,
  addBlueColor,
  mainBackYellor,
  darkGray,
} = themeColor;
const {
  PoppinsBlack,
  PoppinsSemiBold,
  PoppinsRegular,
  PoppinsBold,
  PoppinsMedium,
} = customFont;
export default function ResultStatement({route}) {
  const navigation = useNavigation();
  const mgList = route.params;
  const [isLoading, setLoading] = useState(false);
  const [isStatementOne, setStatementOne] = useState(false);
  const [isStatmentTwo, setStatementTwo] = useState(false);
  const [isMg, setMg] = useState('');
  const [isNote, setNote] = useState('');
  const [isWeek, setWeek] = useState('');

  useEffect(() => {
    if (mgList !== undefined) {
      if (mgList.isMedicineID == 'two') {
        if (mgList.doseType == 'Initial Dose') {
          let data = mgList.data.initial_dose;
          setMg(data.mg);
          setNote(data.note);
          setWeek(data.week);
          setNote(data.note);
        }
        if (mgList.doseType == 'Maintenance Dose') {
          let data = mgList.data.maintenance_dose;
          setMg(data.mg);
          setNote(data.note);
          setWeek(data.week);
          setNote(data.note);
        }
      }
      if (mgList.isMedicineID == 'three') {
        console.log('stateemnt  three-->', mgList.doseType);

        if (mgList.doseType == 'Atopic Dermatitis') {
          let data = mgList.note.atopic_dermatitis;
          setNote(data.note);
        }

        if (mgList.doseType == 'Psoriasis') {
          let data = mgList.note.inducing_remission;
          setNote(data.note);
        }
      }
    }
  }, []);
  const nextScreen = () => {
    navigation.navigate('Home');
  };

  return (
    <>
      <GeneralStatusBarColor
        backgroundColor={'#ffa448'}
        barStyle="dark-content"
      />
      <SafeAreaView style={{flex: 1, backgroundColor: white}}>
        <ImageBackground
          source={orangeBackground}
          resizeMode="cover"
          style={{height: height, width: width}}>
          <Header
            text={'Calculator'}
            isHeadertrue={true}
            onPress={() => navigation.navigate('Home')}
          />
          <View style={styles.containerMain}>
            <Text style={styles.resultext}>Result</Text>

            <ScrollView>
              <View style={{width: width, alignItems: 'center'}}>
                {mgList.isMedicineID == 'three' ? (
                  <View style={{width: width, alignItems: 'center'}}>
                    <Image
                      source={require('../../assets/emailSentRight.png')}
                      style={styles.imageStyle}
                    />

                    <View style={[styles.sView, {marginBottom: 18}]}>
                      <Text
                        style={[
                          styles.resultext,
                          {fontSize: 12, marginBottom: 12},
                        ]}>
                        Dosage has been added successfully..!
                      </Text>
                    </View>
                    <View
                      style={{width: width * 0.8, alignItems: 'flex-start'}}>
                      <Text
                        style={[
                          styles.mgText,
                          {
                            color: black,
                            fontSize: 17,
                            fontFamily: PoppinsBold,
                          },
                        ]}>
                        {mgList.doseType}
                      </Text>
                    </View>

                    <View style={[styles.sView, {marginBottom: 12}]}>
                      <View style={{flexDirection: 'row'}}>
                        <Text style={[styles.resultext, {fontSize: 17}]}>
                          Dosage {''} {''}: {''} {''}
                        </Text>

                        <Text
                          style={[
                            styles.resultext,
                            {color: black, fontSize: 16},
                          ]}>
                          {mgList.data}mg
                        </Text>
                      </View>
                      <Text
                        style={[
                          {
                            fontFamily: PoppinsRegular,
                            fontSize: 14,
                            color: mediumGray,
                            marginBottom: 12,
                          },
                        ]}>
                        Twice Daily
                      </Text>
                    </View>

                    <View
                      style={{
                        width: width * 0.8,
                        alignItems: 'flex-start',
                        marginTop: 10,
                      }}>
                      <Text
                        style={[
                          styles.mgText,
                          {
                            color: black,
                            fontSize: 17,
                            fontFamily: PoppinsBold,
                          },
                        ]}>
                        Note
                      </Text>
                      <Text
                        style={[
                          styles.weekText,
                          {width: width * 0.81, fontFamily: PoppinsRegular},
                        ]}>
                        {isNote}
                      </Text>
                    </View>
                  </View>
                ) : (
                  <View style={{width: width, alignItems: 'center'}}>
                    <Image
                      source={MedicineIcon}
                      style={{marginTop: height * 0.03, height: 102, width: 100}}
                    />
                    <View style={styles.nameView}>
                      <View
                        style={{
                          flexDirection: 'row',
                          marginTop: 20,
                          marginBottom: 20,
                        }}>
                        <Text style={styles.doseTypeText}>
                          {mgList.doseType}
                        </Text>
                        <View>
                          <Text style={styles.mgText}>{isMg}</Text>
                          <Text style={styles.weekText}>{isWeek}</Text>
                        </View>
                      </View>
                    </View>
                    <View
                      style={{
                        width: width * 0.88,
                        alignItems: 'flex-start',
                        marginTop: 15,
                      }}>
                      <Text
                        style={[
                          styles.mgText,
                          {
                            color: black,
                            fontSize: 20,
                            fontFamily: PoppinsMedium,
                          },
                        ]}>
                        Note
                      </Text>
                      <Text
                        style={[
                          styles.weekText,
                          {width: width * 0.9, fontFamily: PoppinsRegular},
                        ]}>
                        {isNote}
                      </Text>
                    </View>
                  </View>
                )}

                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.lastView}
                  onPress={() => {
                    nextScreen();
                  }}>
                  <Text style={{fontFamily: PoppinsBold, color: white}}>
                    OK
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </ImageBackground>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: white,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  resultext: {
    color: darkGray,
    fontFamily: PoppinsSemiBold,
    fontSize: 19,
    textAlign: 'center',
    marginTop: 12,
  },
  nameView: {
    backgroundColor: lightgray,
    marginVertical: '2%',
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: Platform.OS == 'ios' ? 0.4 : 0.8,
    shadowRadius: 2,
    elevation: 5,
    fontSize: 16,
    width: width * 0.9,
    borderRadius: 13,
    marginTop: height * 0.05,
  },
  statementOneText: {
    fontFamily: PoppinsRegular,
    width: width * 0.73,

    marginTop: 20,
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 14,
  },
  statementOneTextBold: {
    fontFamily: PoppinsSemiBold,
    marginLeft: 15,
    marginTop: 20,
    fontSize: 16,
  },
  sView: {
    backgroundColor: white,
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: Platform.OS == 'ios' ? 0.4 : 0.8,
    shadowRadius: 2,
    elevation: 5,
    borderRadius: 10,
    width: width * 0.83,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  lastView: {
    backgroundColor: mainColor,
    width: width * 0.45,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: height * 0.05,
    borderRadius: 11,
    shadowColor: mainColor,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    height: width * 0.1,
    marginBottom: 35,
  },
  imageStyle: {
    width: width * 0.3,
    resizeMode: 'contain',
    height: width * 0.35,
    marginTop: 5,
  },
  doseTypeText: {
    fontSize: 14,
    fontFamily: PoppinsMedium,
    width: width * 0.35,
    // backgroundColor: 'blue',
    marginLeft: 15,
    color: mediumGray,
  },
  mgText: {
    fontSize: 15,
    fontFamily: PoppinsBold,
    color: mainColor,
  },
  weekText: {
    fontSize: 14,
    fontFamily: PoppinsMedium,
    color: mediumGray,
  },
});
