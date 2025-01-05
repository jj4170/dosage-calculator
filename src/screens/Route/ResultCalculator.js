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
  Platform,
} from 'react-native';
import {
  height,
  width,
  themeColor,
  customFont,
  images,
  getFormatedStringFromDays,
} from '../../common/common';
import Header from '../../component/Header';
const {orangeBackground} = images;
import GeneralStatusBarColor from '../../component/GenralStatusBar';
import useKeyboard from '../../component/UseKeyboard';
import {LoaderAnimated} from '../../component/Loader';
import UserActive from '../../assets/img/UserLightMain.png';
import Medicine from '../../assets/img/Medicine.png';
import Weight from '../../assets/img/Weight.png';
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
export default function ResultCalculator({route}) {
  const navigation = useNavigation();
  const isKeyboardOpen = useKeyboard();
  const [isDoseListArray, setDoseListArray] = useState('');
  const [isMgListArray, setMgListArray] = useState('');
  const [isFirstTotalDose, setFirstTotalDose] = useState('');
  const [isSecondTotalDose, setSecondTotalDose] = useState('');
  const [isThirdTotalDose, setThirdTotalDose] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [isMedicineId, setMedicineId] = useState('');
  const [isFirstTotalDoseView, setFirstTotalDoseView] = useState(false);
  const [isSecondTotalDoseView, setSecondTotalDoseView] = useState(false);
  const [isThirdTotalDoseView, setThirdTotalDoseView] = useState(false);
  const [isFourthTotalDoseView, setFourthTotalDoseView] = useState(false);
  const [isFrequencyTwo, setFrequencyTwo] = useState(false);
  const [isFrequencyThree, setFrequencyThree] = useState(false);
  const [isRemainingDose, setRemainingDose] = useState('');
  const [isDoseDays, setDoseDays] = useState(true);
  const mgList = route.params;
  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    if (Platform.OS == 'ios') {
      setLoading(false);
    } else {
      setLoading(true);
    }

    if (mgList.patient_dose.length !== 0) {
      if (mgList.patient_dose[0].daily_dose == '') {
        setDoseDays(false);
      }
    } else {
      setDoseDays(false);
    }
    var doseList = mgList.mgList;
    setDoseListArray(doseList);
    calculateTotalDose(mgList);
    let mID = mgList.MedicineId;
    setMedicineId(mID);
    if (mgList !== undefined) {
      var doseList = mgList.mgList;
      setDoseListArray(doseList);
      calculateTotalDose(mgList);
      let mID = mgList.MedicineId;
      setMedicineId(mID);
    }
    setLoading(false);
  };
  const nextScreen = () => {
    if (mgList.isCalculator == true) {
      navigation.replace('Home');
    } else {
      navigation.replace('ViewAllPatient');
    }
  };
  const calculateTotalDose = mgList => {
    var dostFirst = mgList.mgList[0].mg;
    let weight = mgList.PatientWeigth;
    var total_Dose = dostFirst * weight;

    setFirstTotalDose(total_Dose);
    setFirstTotalDoseView(true);
    let r1_dose = mgList.total_dosageAllArray;
    var r_dose = total_Dose - r1_dose;
    setRemainingDose(Math.abs(r_dose));

    // console.log('mg-->', r1_dose);

    getMgList(r_dose);
  };
  const countTotalDose = async (data, index) => {
    if (index == 0) {
      setFirstTotalDoseView(true);
      setSecondTotalDoseView(false);
      setThirdTotalDoseView(false);
      setFourthTotalDoseView(false);
    }
    if (index == 1) {
      setFirstTotalDoseView(false);
      setSecondTotalDoseView(true);
      setThirdTotalDoseView(false);
      setFourthTotalDoseView(false);
    }
    if (index == 2) {
      setFirstTotalDoseView(false);
      setSecondTotalDoseView(false);
      setThirdTotalDoseView(true);
      setFourthTotalDoseView(false);
    }
    if (index == 3) {
      setFirstTotalDoseView(false);
      setSecondTotalDoseView(false);
      setThirdTotalDoseView(false);
      setFourthTotalDoseView(true);
    }
    // set total dose
    let weight = mgList.PatientWeigth;
    var total_Dose = data.mg * weight;
    setFirstTotalDose(total_Dose);
    //set remining dose
    let r1_dose = mgList.total_dosageAllArray;
    var r_dose = total_Dose - r1_dose;
    // console.log('r_dose -->', Math.abs(r_dose));

    setRemainingDose(Math.abs(r_dose));
    getMgList(r_dose);
  };

  const getMgList = r_dose => {
    // const formatedFromDays = getFormatedStringFromDays('492');
    var MgList = mgList.doseList;
    let mgArr = [];

    MgList.map(mg => {
      var newValue = r_dose / mg.dose;
      var nValue = parseInt(newValue / 2);

      const formatedFromDays = getFormatedStringFromDays(
        Math.abs(parseInt(newValue)),
      );
      const formatedFromDays1 = getFormatedStringFromDays(
        Math.abs(parseInt(nValue)),
      );
      mgArr.push({
        mg: mg.dose,
        day: formatedFromDays,
        day2: formatedFromDays1,
      });
    });
    setFrequencyTwo(true);

    setMgListArray(mgArr);
  };
  const RenderMGList = ({data, index}) => {
    return (
      <View style={{flexDirection: 'row'}}>
        <View
          style={[
            styles.mgViewGray,
            {
              width: width * 0.2,
            },
          ]}>
          <Text style={styles.tabelText}>{data.mg}</Text>
        </View>
        <View style={styles.grayLineVertical}></View>
        <View
          style={[
            styles.mgViewGray,
            {
              width: width * 0.3,
            },
          ]}>
          <Text style={styles.tabelText}>{data.day}</Text>
        </View>
        <View
          style={[
            styles.mgViewGray,
            {
              width: width * 0.3,

              marginLeft: width * 0.05,
            },
          ]}>
          <Text style={[styles.tabelText, {}]}>
            {data.day2 !== undefined ? data.day2 : '-'}
          </Text>
        </View>
        {/* <View
          style={[
            styles.mgViewGray,
            {
              width:
                isFrequencyTwo == true
                  ? isFrequencyThree == true
                    ? width * 0.22
                    : width * 0.3
                  : width * 0.46,
            },
          ]}>
          <Text style={styles.tabelText}>
            {data.day3 !== undefined ? data.day3 : '-'}
          </Text>
        </View> */}
      </View>
    );
  };

  const RenderDoseList = ({data, index}) => {
    return (
      <View
        style={{
          marginLeft: width * 0.04,
          // backgroundColor: 'blue',
          width: width * 0.18,
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => {
            countTotalDose(data, index);
          }}
          activeOpacity={0.5}
          style={[
            styles.yellowBackView,
            {
              width: width * 0.16,
              backgroundColor:
                index == 0
                  ? isFirstTotalDoseView == true
                    ? mainColor
                    : mainBackYellor
                  : index == 1
                  ? isSecondTotalDoseView == true
                    ? mainColor
                    : mainBackYellor
                  : index == 2
                  ? isThirdTotalDoseView == true
                    ? mainColor
                    : mainBackYellor
                  : index == 3
                  ? isFourthTotalDoseView == true
                    ? mainColor
                    : mainBackYellor
                  : null,
            },
          ]}>
          <Text
            style={[
              styles.yellowText,
              {
                color:
                  index == 0
                    ? isFirstTotalDoseView == true
                      ? white
                      : mainColor
                    : index == 1
                    ? isSecondTotalDoseView == true
                      ? white
                      : mainColor
                    : index == 2
                    ? isThirdTotalDoseView == true
                      ? white
                      : mainColor
                    : index == 3
                    ? isFourthTotalDoseView == true
                      ? white
                      : mainColor
                    : null,
              },
            ]}>
            {data.mg}
          </Text>
        </TouchableOpacity>
        <Text
          style={[
            styles.mgkgText,
            {textAlign: 'center', marginLeft: 1, marginTop: 3, fontSize: 11},
          ]}>
          mg/kg
        </Text>
      </View>
    );
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
          <LoaderAnimated visible={isLoading} />
          <View style={styles.containerMain}>
            <Text style={styles.resultext}>Result</Text>
            <ScrollView
              nestedScrollEnabled={true}
              keyboardShouldPersistTaps={'always'}
              style={{
                width: width,
                height: height,
              }}>
              <View
                style={{
                  width: width,
                  alignItems: 'center',
                  marginBottom:
                    isKeyboardOpen == true ? height * 0.4 : height * 0.12,
                }}>
                {/* {mgList.isCalculator == false || mgList.isAddPatient ? ( */}
                <View style={styles.nameView}>
                  <View style={{marginLeft: 25}}>
                    <View style={[styles.duobleview, {marginTop: 15}]}>
                      <Image
                        source={UserActive}
                        style={{width: 18, height: 18}}
                      />
                      <Text style={styles.nameMainText}>
                        {mgList.PatientName == '' ? '-' : mgList.PatientName}
                      </Text>
                    </View>
                    <View style={[styles.duobleview, {}]}>
                      <Image source={Weight} style={{height: 18, width: 18}} />
                      <Text
                        style={[
                          styles.nameMainText,
                          {fontSize: 13, fontFamily: PoppinsMedium},
                        ]}>
                        {mgList.PatientWeigth == ''
                          ? '-'
                          : mgList.PatientWeigth}
                        {''}{' '}
                        {mgList.paramter == 'pound' ? 'lbs' : mgList.paramter}
                      </Text>
                    </View>
                    <View style={[styles.duobleview, {marginBottom: 15}]}>
                      <Image
                        source={Medicine}
                        style={{height: 18, width: 18}}
                      />
                      <Text
                        style={[
                          styles.nameMainText,
                          {fontSize: 13, fontFamily: PoppinsMedium},
                        ]}>
                        {mgList.MedicineLable == ''
                          ? '-'
                          : mgList.MedicineLable}
                      </Text>
                    </View>
                  </View>
                </View>
                {/* // ) : null} */}
                <View
                  style={{
                    alignItems: 'flex-start',
                    width: width * 0.95,
                    marginTop: height * 0.02,
                  }}>
                  <View style={styles.fieldView}>
                    <Text style={styles.fieldText}>
                      To achieve cumulative dose
                    </Text>
                  </View>
                </View>
                <View style={{marginTop: 10}}>
                  <View style={styles.fieldMainViewBig}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: width * 0.9,
                      }}>
                      <FlatList
                        refreshing={true}
                        keyExtractor={(item, index) => index.toString()}
                        data={isDoseListArray}
                        renderItem={({item, index}) => (
                          <RenderDoseList data={{...item}} index={index} />
                        )}
                        horizontal
                      />
                    </View>
                  </View>
                  <View style={styles.grayLine}></View>
                </View>
                <View
                  style={{
                    alignItems: 'flex-start',
                    width: width * 0.9,
                    marginTop: height * 0.02,
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <View style={{width: width * 0.45}}>
                      <Text style={styles.fieldText}>Total Dosage</Text>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View style={[styles.yellowBackView, {marginTop: 2}]}>
                          <Text style={[styles.yellowText, {marginLeft: 15}]}>
                            {isFirstTotalDose == '' ? '-' : isFirstTotalDose}
                          </Text>
                        </View>
                        <Text style={styles.mgkgText}>mg</Text>
                      </View>
                    </View>
                    <View
                      style={{
                        width: width * 0.45,
                        marginLeft: 10,
                      }}>
                      <Text style={styles.fieldText}>Remaining Dosage</Text>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View style={[styles.yellowBackView, {marginTop: 2}]}>
                          <Text style={[styles.yellowText, {marginLeft: 15}]}>
                            {isRemainingDose == '' ? '-' : isRemainingDose}
                          </Text>
                        </View>
                        <Text style={styles.mgkgText}>mg</Text>
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      width: width * 0.9,
                      alignItems: 'center',
                    }}>
                    <Text
                      style={[
                        {
                          marginTop: height * 0.05,
                          fontFamily: PoppinsMedium,
                          color: black,
                          // textDecorationLine: 'underline',
                        },
                      ]}>
                      Regimen to achieve remaining dosage
                    </Text>
                  </View>
                </View>

                <View style={styles.mainTableView}>
                  <ScrollView
                    horizontal={true}
                    nestedScrollEnabled={true}
                    style={{}}>
                    {/* {isDoseDays == true ? ( */}
                    <View style={styles.mainTableView}>
                      <View style={styles.tableView}>
                        <View style={styles.tableMainView}>
                          <View
                            style={[
                              styles.mgView,
                              {
                                width: width * 0.2,
                              },
                            ]}>
                            <Text style={styles.mgText}>mg</Text>
                          </View>
                          <View
                            style={[
                              styles.mgView,
                              {
                                width: width * 0.3,
                              },
                            ]}>
                            <Text
                              style={[styles.mgText, {textAlign: 'center'}]}>
                              Days if given once daily
                            </Text>
                          </View>
                          {/* {isFrequencyTwo == true ? ( */}
                          <View
                            style={[
                              styles.mgView,
                              {
                                marginLeft: 15,
                                width: width * 0.3,
                              },
                            ]}>
                            <Text
                              style={[styles.mgText, {textAlign: 'center'}]}>
                              Days if given twice daily
                            </Text>
                          </View>
                          {/* ) : null} */}
                          {/* {isFrequencyThree == true ? (
                              <View
                                style={[
                                  styles.mgView,
                                  {
                                    marginLeft: 15,
                                    width:
                                      isFrequencyTwo == true
                                        ? width * 0.25
                                        : width * 0.46,
                                  },
                                ]}>
                                <Text style={styles.mgText}>
                                  Days if given 3 time
                                </Text>
                              </View>
                            ) : null} */}
                        </View>

                        {/* <ScrollView
                          keyboardShouldPersistTaps={'always'}
                          nestedScrollEnabled={true}> */}
                        <View style={{marginTop: 1}}>
                          <FlatList
                            refreshing={true}
                            keyExtractor={(item, index) => index.toString()}
                            data={isMgListArray}
                            renderItem={({item, index}) => (
                              <View key={index}>
                                <RenderMGList data={{...item}} index={index} />
                              </View>
                            )}
                          />
                          <View style={styles.grayLine}></View>
                        </View>
                        {/* </ScrollView> */}
                      </View>
                    </View>
                    {/* ) : null} */}
                  </ScrollView>
                </View>
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
    marginTop: 25,
  },
  fieldView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fieldText: {
    marginLeft: 10,
    fontFamily: PoppinsMedium,
    marginTop: 3,
    color: black,
  },
  fieldMainViewBig: {
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
    height: width * 0.25,
    alignItems: 'center',
  },
  yellowBackView: {
    // backgroundColor: mainBackYellor,
    borderRadius: 10,
    height: height * 0.06,
    marginTop: 11,
    // width: width * 0.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  yellowText: {
    color: mainColor,
    fontFamily: PoppinsSemiBold,
  },
  mgkgText: {
    fontFamily: PoppinsRegular,
    marginLeft: 10,
    fontSize: 12,
    // marginTop: 8,
  },
  mainTableView: {width: width, alignItems: 'center'},
  tableView: {
    borderWidth: 1,
    borderColor: mainColor,
    // height: height * 0.3,
    width: width * 0.9,
    borderRadius: 8,
    marginTop: 10,
  },
  tableMainView: {
    backgroundColor: mainColor,
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    height: height * 0.065,
    flexDirection: 'row',
    // justifyContent: 'space-between',
  },
  mgView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  mgViewGray: {
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mgText: {
    fontFamily: PoppinsRegular,
    color: white,
    fontSize: 11,
  },
  grayLine: {
    backgroundColor: lightgray,
    height: width * 0.004,
  },
  grayLineVertical: {
    backgroundColor: lightgray,
    width: width * 0.004,
    height: height * 0.05,
  },
  tabelText: {
    marginBottom: 3,
    textAlign: 'center',
    fontSize: 12,
  },
  lastView: {
    backgroundColor: mainColor,
    width: width * 0.45,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    borderRadius: 11,
    shadowColor: mainColor,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    height: width * 0.1,
    marginBottom: 15,
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
  },
  nameMainText: {
    fontFamily: PoppinsBold,
    color: darkGray,
    marginTop: 3,
    fontSize: 13,
    marginLeft: 10,
  },
  duobleview: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
