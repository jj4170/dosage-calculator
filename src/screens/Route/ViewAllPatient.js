import React, {useEffect, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
  Platform,
  FlatList,
  RefreshControl,
  ActivityIndicator,
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
const {orangeBackground, NoDataImage} = images;
import Shimmer from 'react-native-shimmer';
const {white, black, lightgray, mediumGray, mainColor, addBlueColor, shimmer} =
  themeColor;
const {PoppinsRegular, PoppinsBold} = customFont;
import {AppContext} from '../../container/ContextProvider';
import ScreenCotainer from '../../container/ScreenCotainer';
import UpdownImage from '../../assets/img/UpdownImage.png';
import Header from '../../component/Header';
import AddUser from '../../assets/img/AddUser.png';
import {fetchResource, CryptoJSAesEncrypt} from '../../api/utils';
import toast from '../../common/Toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

export default function ViewAllPatient() {
  const navigation = useNavigation();
  const {isPatientUpdate, setPatientUpdate} = React.useContext(AppContext);
  const [isLoading, setLoading] = useState(true);
  const [showOption, setShowOption] = useState(false);
  const [isDoctorName, setDoctorName] = useState('');
  const [isPatientData, setPatientData] = useState({
    offset: 0,
    limit: 10,
    result: [],
    isEnd: false,
  });
  const [isPatientDataRecent, setPatientDataRecent] = useState({
    offset1: 0,
    limit1: 10,
    result1: [],
    isEnd1: false,
  });
  const {offset, isEnd, limit, result} = isPatientData;
  const {offset1, isEnd1, limit1, result1} = isPatientDataRecent;
  const [isPatientDataEmpty, setPatientDataEmpty] = useState([]);
  const [isStartDatePicker, setOpenStartDatePicker] = useState(false);

  const [isSearchText, setSearchText] = useState('');
  const [isRecentView, setRecentView] = useState(false);
  const [isCurrentPage, setCurrentPage] = useState('');

  const [sort, setSort] = useState('0');

  const calculateTimimg = d => {
    let months = 0,
      years = 0,
      days = 0;
    while (d) {
      if (d >= 365) {
        years++;
        d -= 365;
      } else if (d >= 30) {
        months++;
        d -= 30;
      } else {
        days++;
        d--;
      }
    }
    console.log('days--->', years, months, days);
    return {
      years,
      months,
      days,
    };
  };

  useEffect(() => {
    getData(true, '');
    // calculateTimimg('492');
  }, []);
  const [refreshing, setRefreshing] = React.useState(false);
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setRecentView(false);
    setShowOption(false);
    wait(2000).then(() => getData());
  }, []);

  const getData = async (clear, name) => {
    if (clear ? true : !isEnd && offset % limit === 0) {
      try {
        setRefreshing(false);
        const doctor_id = await AsyncStorage.getItem('@doctor_id');
        const doctor_name = await AsyncStorage.getItem('@doctor_name');
        setDoctorName(doctor_name);
        setLoading(true);

        // const body = new FormData();
        // body.append('doctor_id', doctor_id);
        // body.append('offset', clear ? 0 : offset);
        // body.append('type', 'all');
        // body.append('name', '');

        let data_to_encrypt = JSON.stringify({
          doctor_id: doctor_id,
          offset: clear ? 0 : offset,
          type: 'all',
          name: '',
        });

        const encrypted_data = CryptoJSAesEncrypt(data_to_encrypt);
        let body = JSON.stringify(encrypted_data);

        const {status, message, data} = await fetchResource(
          {
            url: 'patient-list',
            body,
          },
          true,
        );

        if (status == 1) {
          var _patientData = [];
          let data1 = data.patient_data;

          if (clear) {
            _patientData = [...data1];
          } else {
            _patientData = [...result, ...data1];
          }
          setPatientData({
            result: _patientData,
            limit: data.offsets.limit,
            offset: data.offsets.offset,
            isEnd:
              data.patient_data.length === 0
                ? true
                : !(data.patient_data.length % data.offsets.limit === 0),
          });
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
    }
  };
  const SearchFilterData = async (clear, name) => {
    if (clear ? true : !isEnd && offset % limit === 0) {
      try {
        setRefreshing(false);
        const doctor_id = await AsyncStorage.getItem('@doctor_id');
        const doctor_name = await AsyncStorage.getItem('@doctor_name');
        setDoctorName(doctor_name);
        setLoading(true);

        // const body = new FormData();
        // body.append('doctor_id', doctor_id);
        // body.append('offset', clear ? 0 : offset);
        // body.append('type', name);
        // body.append('name', '');
        let data_to_encrypt = JSON.stringify({
          doctor_id: doctor_id,
          offset: clear ? 0 : offset,
          type: name,
          name: '',
        });

        const encrypted_data = CryptoJSAesEncrypt(data_to_encrypt);
        let body = JSON.stringify(encrypted_data);
        const {status, message, data} = await fetchResource(
          {
            url: 'patient-list',
            body,
          },
          true,
        );
        console.log('_patientData --?', body);

        if (status == 1) {
          var _patientData = [];
          let data1 = data.patient_data;
          _patientData = [...data1];
          // if (clear) {
          //   _patientData = [...data1];
          // } else {
          //   _patientData = [...result, ...data1];
          // }
          setPatientData({
            result: _patientData,
            limit: data.offsets.limit,
            offset: data.offsets.offset,
            isEnd:
              data.patient_data.length === 0
                ? true
                : !(data.patient_data.length % data.offsets.limit === 0),
          });
          // console.log('_patientData ---->', isPatientData);
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
    }
  };
  const typeSearchText = async (clear, name) => {
    console.log('name---<', name);
    // if (clear ? true : !isEnd && offset % limit === 0) {
    try {
      setRefreshing(false);
      const doctor_id = await AsyncStorage.getItem('@doctor_id');
      const doctor_name = await AsyncStorage.getItem('@doctor_name');
      setDoctorName(doctor_name);
      // setLoading(true);

      // const body = new FormData();
      // body.append('doctor_id', doctor_id);
      // body.append('offset', 0);
      // body.append('type', 'all');
      // body.append('name', name);

      let data_to_encrypt = JSON.stringify({
        doctor_id: doctor_id,
        offset: 0,
        type: 'all',
        name: name,
      });

      const encrypted_data = CryptoJSAesEncrypt(data_to_encrypt);
      let body = JSON.stringify(encrypted_data);

      const {status, message, data} = await fetchResource(
        {
          url: 'patient-list',
          body,
        },
        true,
      );

      if (status == 1) {
        var _patientData = [];
        let data1 = data.patient_data;
        _patientData = [...data1];
        // if (clear) {
        //   _patientData = [...data1];
        // } else {
        //   _patientData = [...result, ...data1];
        // }
        setPatientData({
          result: _patientData,
          limit: data.offsets.limit,
          offset: data.offsets.offset,
          isEnd:
            data.patient_data.length === 0
              ? true
              : !(data.patient_data.length % data.offsets.limit === 0),
        });
        setLoading(false);
      } else {
        toast.danger({message: 'Something went wrong'});
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
      toast.danger({message: 'Something went wrong'});
      // console.log('error login->', e);
    }
    // }
  };
  const RenderMiddle = ({data, index}) => {
    var date = moment(data.created_at).format('DD-MM-YYYY');
    const plusIndex = index + 1;
    let patient_details = data;
    // console.log('iem -->', data);
    return (
      <View style={[styles.backView]} index={index}>
        <TouchableOpacity
          style={[styles.mainView2, {}]}
          onPress={() => navigation.replace('PatientDetail', {data: data})}>
          <View>
            <Text style={{fontFamily: PoppinsRegular}}>{plusIndex}</Text>
          </View>
          <View style={{width: width * 0.37, fontFamily: PoppinsRegular}}>
            <Text style={{fontFamily: PoppinsRegular, marginLeft: 5}}>
              {patient_details.name == 'null' || patient_details.name == ''
                ? 'NA'
                : patient_details.name}
            </Text>
          </View>
          <View
            style={{
              width: width * 0.25,
              alignItems: 'center',
            }}>
            <Text>{date}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <>
      <GeneralStatusBarColor
        backgroundColor={'#ffa448'}
        barStyle="dark-content"
      />

      <SafeAreaView style={{backgroundColor: white}}>
        <ImageBackground
          source={orangeBackground}
          resizeMode="cover"
          style={{height: height, width: width}}>
          <Header
            text={'Home'}
            isHeadertrue={true}
            onPress={() => {
              navigation.navigate('Home');
            }}
          />

          <TouchableWithoutFeedback>
            <View style={styles.containerMain}>
              <ScreenCotainer isDoctorName={isDoctorName} />

              <View
                style={{
                  flexDirection: 'row',
                  width: width,
                  marginLeft: 5,
                  alignItems: 'center',
                }}>
                <View style={styles.searchView}>
                  <TextInput
                    placeholder="Search"
                    placeholderTextColor={'#cfcfcf'}
                    style={{marginLeft: 10, color: black}}
                    value={isSearchText}
                    onChangeText={name => {
                      typeSearchText('', name);
                      setSearchText(name);
                    }}
                  />
                </View>

                {/* <View style={{zIndex: 9999}}> */}
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.updownView}
                  onPress={() => setShowOption(!showOption)}>
                  <Image source={UpdownImage} style={{width: 12, height: 17}} />
                </TouchableOpacity>
              </View>
              {showOption && (
                <View
                  style={{
                    position: 'absolute',
                    zIndex: 9999,
                    top: Platform.OS == 'ios' ? 180 : 150,
                    backgroundColor: white,
                    shadowColor: '#000',
                    shadowOffset: {width: 0, height: 1},
                    shadowOpacity: Platform.OS == 'ios' ? 0.3 : 0.8,
                    shadowRadius: 2,
                    borderRadius: 12,
                    height: Platform.OS == 'ios' ? 80 : 65,
                    width: 120,
                    right: 20,
                    elevation: Platform.OS == 'ios' ? 0 : 20,
                  }}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={[
                      styles.allView,
                      {
                        backgroundColor:
                          isRecentView == false ? '#f7ddc5' : white,
                        height:
                          Platform.OS == 'ios'
                            ? height * 0.047
                            : height * 0.047,
                      },
                    ]}
                    onPress={() => {
                      setRecentView(false);
                      setShowOption(false);
                      getData(true, 'all');
                    }}>
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
                        backgroundColor:
                          isRecentView == true ? '#f7ddc5' : white,
                        marginTop: Platform.OS == 'ios' ? 0.02 : 0.01,
                        height:
                          Platform.OS == 'ios'
                            ? height * 0.047
                            : height * 0.047,
                      },
                    ]}
                    onPress={() => {
                      var _patientData2 = [];
                      setPatientData({
                        offset: 0,
                        limit: 10,
                        result: _patientData2,
                        isEnd: false,
                      });
                      setRecentView(true);
                      setShowOption(false);
                      SearchFilterData(true, 'recent');
                    }}>
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
              )}
              {/* </View> */}

              <View style={{width: width}}>
                <View
                  style={{
                    justifyContent: 'center',
                    borderRadius: 10,
                    width: width,
                    alignItems: 'center',
                  }}>
                  <View style={[styles.mainView, {marginTop: height * 0.03}]}>
                    <View style={{width: width * 0.1}}>
                      <Text style={styles.headerTableText}>Sr</Text>
                    </View>
                    <View style={{width: width * 0.45, marginLeft: 12}}>
                      <Text style={styles.headerTableText}>Patient Name</Text>
                    </View>
                    <View
                      style={{
                        width: width * 0.3,
                        marginLeft: 25,
                      }}>
                      <Text style={styles.headerTableText}>Date</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={{
                  width: width,
                  alignItems: 'center',
                  marginBottom: 250,
                }}>
                {result.length !== 0 ? (
                  <View
                    style={{
                      marginTop: 10,
                    }}>
                    <FlatList
                      keyExtractor={(item, index) => index.toString()}
                      data={result.length === 0 ? [1, 2, 3, 4, 5, 6] : result}
                      renderItem={({item, index}) =>
                        result.length === 0 ? (
                          <DummyPatientDetail />
                        ) : (
                          <RenderMiddle data={{...item}} index={index} />
                        )
                      }
                      refreshControl={
                        <RefreshControl
                          refreshing={refreshing}
                          onRefresh={onRefresh}
                        />
                      }
                      onEndReached={() => {
                        if (isRecentView == true) {
                          SearchFilterData('', 'recent');
                        } else {
                          getData();
                        }
                      }}
                      onEndReachedThreshold={0.5}
                      initialNumToRender={5}
                      ListFooterComponent={() =>
                        isLoading && offset > 0 ? (
                          <View
                            style={{
                              borderRadius: 2,
                              padding: 10,
                              margin: 10,
                              alignSelf: 'center',
                            }}>
                            <ActivityIndicator color={mainColor} size="large" />
                          </View>
                        ) : null
                      }
                    />
                  </View>
                ) : isLoading == false ? (
                  <View style={{width: width, alignItems: 'center'}}>
                    <Image
                      source={NoDataImage}
                      style={{
                        width: width * 0.2,
                        resizeMode: 'contain',
                        height: width * 0.5,
                      }}
                    />
                    <Text style={{fontFamily: PoppinsBold}}>
                      Oops! No Data To Show
                    </Text>
                  </View>
                ) : (
                  <View>
                    <FlatList
                      refreshing={true}
                      keyExtractor={(item, index) => index.toString()}
                      data={[1, 2, 3, 4, 5, 6]}
                      renderItem={({item, index}) => <DummyPatientDetail />}
                    />
                  </View>
                )}
              </View>
              <View style={styles.bottomView}>
                <TouchableOpacity
                  style={styles.nextView}
                  onPress={() => {
                    navigation.navigate('AddPatientDetails');
                  }}>
                  <Image source={AddUser} style={{height: 20, width: 24}} />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ImageBackground>
      </SafeAreaView>
    </>
  );
}

export const DummyPatientDetail = () => {
  return (
    <View
      style={{
        borderRadius: 15,
        height: height * 0.06,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        width: width * 0.9,
        marginTop: 15,
      }}>
      <Shimmer>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              backgroundColor: shimmer,
              height: height * 0.05,
              borderRadius: 10,
              width: width * 0.1,
            }}
          />
        </View>
      </Shimmer>
      <Shimmer>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              backgroundColor: shimmer,
              height: height * 0.05,
              borderRadius: 10,
              width: width * 0.3,
              marginLeft: 25,
            }}
          />
        </View>
      </Shimmer>
      <Shimmer>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              backgroundColor: shimmer,
              height: height * 0.05,
              borderRadius: 10,
              width: width * 0.3,
              marginLeft: 25,
            }}
          />
        </View>
      </Shimmer>
    </View>
  );
};
const styles = StyleSheet.create({
  profileImageView: {
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
    width: width * 0.135,
    height: height * 0.075,
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
    width: '92%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'flex-end',
    position: 'absolute', //Here is the trick
    bottom: Platform.OS == 'ios' ? height * 0.15 : height * 0.17, //Here is the trick
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
  searchView: {
    backgroundColor: white,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: Platform.OS == 'ios' ? 0.4 : 0.8,
    shadowRadius: 2,
    elevation: 5,
    borderRadius: 12,
    width: width * 0.73,
    height: height * 0.055,
    marginLeft: 15,
    marginTop: height * 0.03,
    justifyContent: 'center',
  },
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
  allView: {
    backgroundColor: '#f7ddc5',
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    height: height * 0.04,
    justifyContent: 'center',
  },
  recentView: {
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 12,
    height: height * 0.047,
    justifyContent: 'center',
  },
});
