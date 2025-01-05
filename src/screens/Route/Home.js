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
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  FlatList,
  RefreshControl,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  height,
  width,
  themeColor,
  customFont,
  images,
} from '../../common/common';
import GeneralStatusBarColor from '../../component/GenralStatusBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
const {orangeBackground} = images;
const {
  white,
  black,
  lightgray,
  mediumGray,
  mainColor,
  addBlueColor,
  error,
  darkGray,
} = themeColor;
import Modal from 'react-native-modal';
import {AppContext} from '../../container/ContextProvider';
import DropDownMain from '../../component/YearDropDown';
const {
  PoppinsBlack,
  PoppinsSemiBold,
  PoppinsRegular,
  PoppinsBold,
  PoppinsMedium,
} = customFont;
import UserMain from '../../assets/SVG/User.svg';
import Header from '../../component/Header';
import EyeIcon from '../../assets/SVG/EyeIcon.svg';
import AddUser from '../../assets/img/AddUser.png';
import {fetchResource, CryptoJSAesEncrypt} from '../../api/utils';
import {LoaderAnimated} from '../../component/Loader';
import toast from '../../common/Toast';
import NoInernetScreen from './NoInternetScreen';
import NetInfo from '@react-native-community/netinfo';
//graph
import ScreenCotainer from '../../container/ScreenCotainer';
import {BarChart} from 'react-native-gifted-charts';
export default function Home({route}) {
  const navigation = useNavigation();

  const {isPatientUpdate, setPatientUpdate} = React.useContext(AppContext);
  const [isMedicineLable, setMedicineLable] = useState('');

  const [showOption, setShowOption] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isDoctorName, setDoctorName] = useState('');
  const [isBarData, setBarData] = useState('');
  const [isPatientData, setPatientDate] = useState('');
  const [isCurrentYear, setCurrentYear] = useState('');
  const [isDisclaimerModal, setDisclaimerModal] = useState(false);
  const [isYear, setYear] = useState('');
  const modaldata = route.params;
  const [refreshing, setRefreshing] = React.useState(false);
  const [isNetOffView, setNetOffView] = useState(false);
  const [isError, setError] = useState(false);
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    setLoading(true);
    var current_year = new Date().getFullYear();
    setCurrentYear(current_year);
    wait(2000).then(() => getData(current_year));
  }, []);
  useEffect(() => {
    checkInternet();
  }, []);
  const checkInternet = () => {
    NetInfo.fetch().then(state => {
      if (state.isConnected == false) {
        setNetOffView(true);
      } else {
        setNetOffView(false);
        var current_year = new Date().getFullYear();
        setCurrentYear(current_year);
        getData(current_year);
      }
    });
  };
  const getData = async current_year => {
    console.log('current_year-->', current_year);

    const doctor_id = await AsyncStorage.getItem('@doctor_id');
    const doctor_name = await AsyncStorage.getItem('@doctor_name');
    setDoctorName(doctor_name);
    setCurrentYear(current_year);
    setLoading(true);
    try {
      // const body = new FormData();
      // body.append('doctor_id', doctor_id);
      // body.append('year', current_year);

      let data_to_encrypt = JSON.stringify({
        doctor_id: doctor_id,
        year: current_year,
      });

      const encrypted_data = CryptoJSAesEncrypt(data_to_encrypt);
      let body = JSON.stringify(encrypted_data);

      const {status, token, message, data} = await fetchResource(
        {
          url: 'patient-count',
          body,
        },
        true,
      );
      // console.log('year -->', data);
      if (status == 1) {
        let year_data = data.year;

        setYear(year_data);
        let patient_data = data.patient_data;
        let data1 = [];

        patient_data.map(i => {
          data1.push({
            label: i.month_name,
            value: i.patient_count,
            frontColor: mainColor,
            labelTextStyle: {
              color: mainColor,
              fontSize: 10,
              transform: [{rotate: '90deg'}],
            },
          });
        });
        setPatientDate(data1);
        setLoading(false);
      } else {
        toast.danger({message: 'Something went wrong'});
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
      toast.danger({message: 'Something went wrong'});
      console.log('error login->', e);
    }
  };
  const data = [{value: 50}, {value: 80}, {value: 90}, {value: 70}];
  const closeDropDown = () => {
    setShowOption(false);
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
          <Header text={'Home'} />
          <LoaderAnimated visible={isLoading} />
          {isNetOffView == true ? (
            <View style={styles.containerMain}>
              <NoInernetScreen onPress={checkInternet} />
            </View>
          ) : (
            <View
              style={styles.containerMain}
              onStartShouldSetResponder={() => {
                closeDropDown();
              }}>
              <ScreenCotainer isDoctorName={isDoctorName} />

              <ScrollView
                nestedScrollEnabled={true}
                keyboardShouldPersistTaps={'always'}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }>
                <TouchableWithoutFeedback
                  onPress={() => {
                    closeDropDown();
                  }}>
                  <View
                    onStartShouldSetResponder={() => {
                      closeDropDown();
                    }}
                    style={{
                      width: width,
                      alignItems: 'center',
                      height: height,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        width: width,
                        marginTop: 10,
                      }}>
                      <View style={{width: width * 0.74, alignItems: 'center'}}>
                        <Text style={styles.monthText}>Patient Per Month</Text>
                      </View>
                    </View>

                    <View
                      style={{
                        width: width * 0.8,
                        // flexDirection: 'row',
                        alignItems: 'flex-end',
                        zIndex: 9999,
                      }}>
                      {Platform.OS == 'ios' ? (
                        <View
                          style={{
                            height: height * 0.1,
                            width: width * 0.85,
                            alignItems: 'flex-end',
                            zIndex: 9999,
                          }}>
                          <DropDownMain
                            text={isCurrentYear}
                            style={{
                              width: width * 0.3,
                              top: Platform.OS == 'ios' ? 2 : 2,
                            }}
                            textStyle={{
                              width: width * 0.2,
                              color: mainColor,
                            }}
                            style1={styles.dropDownMain}
                            data={isYear}
                            value={isMedicineLable}
                            onSelect={item => {
                              getData(item.year);
                              setShowOption(false);
                            }}
                            isShow={showOption}
                          />
                        </View>
                      ) : (
                        <DropDownMain
                          text={isCurrentYear}
                          style={{
                            width: width * 0.3,
                            top: Platform.OS == 'ios' ? 2 : 2,
                          }}
                          textStyle={{width: width * 0.2, color: mainColor}}
                          style1={styles.dropDownMain}
                          data={isYear}
                          value={isMedicineLable}
                          onSelect={item => {
                            getData(item.year);
                            setShowOption(false);
                          }}
                          isShow={showOption}
                        />
                      )}
                    </View>

                    {/* <View style={{zIndex: 9999}}> */}
                    <BarChart
                      frontColor={'#177AD5'}
                      data={isPatientData}
                      width={width * 0.8}
                      height={width * 0.6}
                      barWidth={12}
                      labelTextStyle={{
                        color: mainColor,
                        fontSize: 10,
                        transform: [{rotate: '90deg'}],
                        marginTop: 20,
                      }}
                      labelWidth={20}
                      barStyle={{color: '#ff7700'}}
                      yAxisTextStyle={{color: mainColor, fontSize: 8}}
                      yAxisColor={mainColor}
                      xAxisColor={mainColor}
                      spacing={15}
                    />
                    {/* </View> */}
                    <View>
                      <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.viewallPatientStyle}
                        onPress={() => navigation.navigate('ViewAllPatient')}>
                        <Text style={styles.viewallPatientText}>
                          View All Patient
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </ScrollView>
              <View style={styles.bottomUp}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.bottomView}
                  onPress={() => navigation.navigate('AddPatientDetails')}>
                  <Image source={AddUser} style={{width: 28, height: 22}} />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </ImageBackground>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  dropDownMain: {
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: Platform.OS == 'ios' ? 0.4 : 0.8,
    shadowRadius: 2,
    elevation: 5,
    width: width * 0.3,
  },
  profileImageView: {
    width: width * 0.145,
    height: height * 0.07,
    backgroundColor: white,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: Platform.OS == 'ios' ? 0.4 : 0.8,
    shadowRadius: 2,
    elevation: 5,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
  },
  yearText: {
    fontSize: 12,

    color: mainColor,
  },
  tableHeaderText: {},
  tableInnerText: {},
  outerView: {
    justifyContent: 'center',
    alignContent: 'center',
    height: height * 0.05,
    backgroundColor: lightgray,
  },
  mainView: {
    flexDirection: 'row',
    width: width * 0.85,
    justifyContent: 'space-between',
  },
  mainView2: {
    flexDirection: 'row',
    width: width * 0.85,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backView: {
    justifyContent: 'center',
    borderRadius: 10,
    width: width * 0.9,
    alignItems: 'center',
    marginTop: 10,
    height: height * 0.06,
  },
  containerMain: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: white,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  bottomView: {
    backgroundColor: 'blue',
    backgroundColor: addBlueColor,
    width: width * 0.15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: height / 2,
    height: width * 0.15,
    marginRight: 25,
  },
  bottomUp: {
    position: 'absolute',
    bottom: Platform.OS == 'ios' ? height * 0.15 : height * 0.17,
    width: width,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    zIndex: 1,
  },
  textStyle: {
    color: '#fff',
    fontSize: 18,
  },
  nextView: {
    backgroundColor: addBlueColor,
    width: width * 0.14,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: height / 2,
    height: width * 0.14,
    marginTop: 25,
  },
  eyeview: {
    backgroundColor: '#e5e5e5',
    height: height * 0.04,
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.08,
    borderRadius: 5,
  },
  headerTableText: {
    fontFamily: PoppinsBold,
    color: mediumGray,
  },
  viewallPatientStyle: {
    backgroundColor: mainColor,
    width: width * 0.43,
    shadowColor: mainColor,
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: Platform.OS == 'ios' ? 0.4 : 0.8,
    shadowRadius: 2,
    elevation: 5,
    borderRadius: 14,
    height: width * 0.11,
    marginTop: height * 0.04,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewallPatientText: {
    fontSize: 13,
    fontFamily: PoppinsSemiBold,
    color: white,
    marginTop: 3,
  },
  monthText: {
    marginLeft: width * 0.2,
    fontFamily: PoppinsMedium,
  },
  view2022: {
    backgroundColor: white,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: Platform.OS == 'ios' ? 0.4 : 0.8,
    shadowRadius: 2,
    elevation: 5,
    borderRadius: 12,
    width: width * 0.23,
    height: height * 0.04,
    alignItems: 'center',
    justifyContent: 'center',
  },
  //modal syle
  DisclaimerModalStyle: {
    backgroundColor: white,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: Platform.OS == 'ios' ? 0.4 : 0.8,
    shadowRadius: 2,
    elevation: 5,
    borderRadius: 22,
    width: width * 0.9,
    alignItems: 'center',
  },
  okView: {
    backgroundColor: mainColor,
    borderRadius: 10,
    width: width * 0.27,
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 0.07,
    marginBottom: width * 0.1,
    marginTop: width * 0.05,
  },
  disclamerText: {
    marginTop: width * 0.05,
    fontFamily: PoppinsBold,
    color: mainColor,
    fontSize: 19,
  },
  modalText: {
    fontSize: 13,
    width: width * 0.82,
    fontFamily: PoppinsRegular,
  },
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
