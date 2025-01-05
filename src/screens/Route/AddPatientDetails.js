import React, {
  useState,
  Fragment,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useKeyboard from '../../component/UseKeyboard';
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
  TouchableWithoutFeedback,
} from 'react-native';
import {
  height,
  width,
  themeColor,
  customFont,
  images,
  dataFrequency,
  dataMedicie1,
  dataMedcine2,
  dataMedicie2INdication,
  dataMedicie3,
} from '../../common/common';
import {sumProperty} from '../../api/commonFunction';
import Modal from 'react-native-modal';
import CustomSwitch from '../../component/CustomeSwitch';
import Header from '../../component/Header';
import CalenderMainColor from '../../assets/img/CalendarMainColor.png';
import DropDownMain from '../../component/CustomDropDown';
import DropDownText from '../../component/DropDownText';
import GeneralStatusBarColor from '../../component/GenralStatusBar';
import {fetchResource, CryptoJSAesEncrypt} from '../../api/utils';
import {LoaderAnimated} from '../../component/Loader';
import toast from '../../common/Toast';
import DateTimePicker from '../../component/DateTimePicker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Calendar, CalendarUtils, CalendarList} from 'react-native-calendars';
import DatePickerDual from '../../component/DatePickerDual';
import moment from 'moment';
const {orangeBackground, DeleteIcon, AddIcon} = images;
const {
  white,
  black,
  lightgray,
  mediumGray,
  mainColor,
  addBlueColor,
  mainBackYellor,
  error,
} = themeColor;
const {
  PoppinsBlack,
  PoppinsSemiBold,
  PoppinsRegular,
  PoppinsBold,
  PoppinsMedium,
} = customFont;
export default function AddPatientDetails({route}) {
  const navigation = useNavigation();
  const isKeyboardOpen = useKeyboard();
  const patientDetail = route.params;
  const [isMedicineLable, setMedicineLable] = useState('');
  const [isMedicineId, setMedicineId] = useState('');

  const [isKgPound, setKgPound] = useState(true);
  const [isPatientDetail, setPatientDetail] = useState('');
  const [isPatientName, setPatientName] = useState('');
  const [isSelectionMode, setSelectionMode] = useState('kg');
  const [isLoading, setLoading] = useState(false);
  const [isMedicineArray, setMedicineArray] = useState('');
  const [isTotalDose, setTotalDose] = useState('');
  const [isDailyDose, setDailyDose] = useState('');
  const [isStartDate, setStartDate] = useState('');
  const [isEndDate, setEndDate] = useState('');
  const [isPatientWeigth, setPatienteight] = useState('');
  const [isStartDatePicker, setOpenStartDatePicker] = useState(false);
  const [isMgData, setMgData] = useState('');

  const [ispatientDoseArray, setpatientDoseArray] = useState('');
  const [formInputs, setFormInputs] = React.useState([]);
  const [startDate1, setStartDate1] = useState(false);
  const [ismgkg, setmgkg] = useState('');
  const [isHideView, setHideView] = useState(false);
  const [isHideSecondMedicine, setHideSecondMedicine] = useState(false);
  const [isHideViewFrequency, setHideViewFrequency] = useState(true);
  const [isShowOption, setShowOption] = useState(false);
  const [isHideMedicinefour, setHideMedicineFour] = useState(false);
  const [isHideMedicineThree, setHideMedicineThree] = useState(false);
  const [isFrequency, setFrequency] = useState('');

  const [isSelectDoseLabel, setSelectDoseLabel] = useState(false);
  const [isSelectDoseId, setSelectDoseId] = useState(false);
  const [isSelectIndicationId, setSelectIndicationId] = useState('');
  const [isSelectIndicationLabel, setSelectIndicationLabel] = useState('');

  const [endDate1, setEndDate1] = useState('');

  //dropdown show
  const [isMedicineDropDown, setMedicineDropDown] = useState(false);
  const [isDoseDropDown, setDoseDropDown] = useState(false);
  const [isIndicationDropDown, setIndicationDropDown] = useState(false);
  const [isIndicationHideView, setIndicationHideView] = useState(false);
  const [isFrequencyDropDown, setFrequencyDropDown] = useState(false);

  //empty
  const [isNameEmpty, setNameEmpty] = useState(false);
  const [isWeightEmpty, setWeightEmpty] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isErrorindication, setIsErrorindication] = useState(false);
  const [ismgkgEmpty, setmgkgEmpty] = useState(false);
  const [isMgEmpty, setMgEmpty] = useState(false);
  const [isTotalDoseEmpty, setTotalDoseEmpty] = useState(false);
  const [isCalenderIndex, setCalenderIndex] = useState(false);
  const [isSelectDoseEmpty, setSelectDoseEmpty] = useState(false);
  const [isDoseEmptyLable, setDoseEmptyLable] = useState(false);
  const [isSelectIndicationEmpty, setSelectIndicationEmpty] = useState(false);
  //ref
  const _name = useRef();
  const _weight = useRef();
  const _mg = useRef();

  //renderview modal
  const [isDateInput, setDateINput] = useState([
    {label: 'New label', show: false},
  ]);
  const [isDateData, setDateData] = useState([]);
  useEffect(() => {
    _name.current.focus();
    getMedicineList();
  }, []);
  //Set userId Input Values
  const inputHandleUserId1 = (text, key) => {
    setDailyDose(text);
    let textinput = text;
    const _formNumberInputs = [...formInputs];
    _formNumberInputs[key].key = key;
    _formNumberInputs[key].daily_dose = textinput;
    setFormInputs(_formNumberInputs);
  };
  const inputHandleFrequency = (text, key) => {
    let textinput = text.label;
    const _formNumberInputs = [...formInputs];
    _formNumberInputs[key].key = key;
    _formNumberInputs[key].frequency = textinput;
    setFormInputs(_formNumberInputs);
    // console.log('frequency --->', _formNumberInputs);
  };
  const showFrequencyChange = (isShow, index) => {
    const _formNumberInputs = [...formInputs];
    _formNumberInputs[index].key = index;
    _formNumberInputs[index].isFrequencyShow = isShow;
    setFormInputs(_formNumberInputs);
    console.log('frequency --->', _formNumberInputs);
  };
  //add index in array
  const handleAddMoreLine1 = () => {
    setTotalDoseEmpty(false);
    const _inputs = [...formInputs];
    if (_inputs.length === 0) {
      _inputs.push({
        key: '',
        day: '',
        start_date: '',
        end_date: '',
        daily_dose: '',
        total_dosage: '',
        frequency: '',
        isFrequencyShow: false,
      });
      setFormInputs(_inputs);
    } else {
      var l_dose = _inputs[_inputs.length - 1];
      var l_daily_dose = l_dose.daily_dose;
      if (l_daily_dose == '') {
        toast.info({message: 'Please fill above Field'});
      } else {
        _inputs.push({
          key: '',
          day: '',
          start_date: '',
          end_date: '',
          daily_dose: '',
          total_dosage: '',
          frequency: '',
          isFrequencyShow: false,
        });
        setFormInputs(_inputs);
      }
    }
  };
  const onDeletePush = (index, isFormInput) => {
    const _formNumberInputs = [...formInputs];
    _formNumberInputs.splice(index, 1);
    setFormInputs(_formNumberInputs);
    return _formNumberInputs;
  };
  const getMedicineList = async data1 => {
    setLoading(true);
    try {
      const {status, token, message, data} = await fetchResource(
        {
          url: 'detail-list',
        },
        true,
      );
      let medicinData = data.medicine_list;
      let medicinearray = [];
      medicinData.map(i => {
        medicinearray.push({
          value: i.id,
          label: i.medicine_name,
        });

        setMedicineArray(medicinearray);
        if (data1 !== undefined) {
          let medicineId = data1.medicine_id;
          if (i.id == medicineId) {
            setMedicineLable(i.medicine_name);
            setMedicineId(i.id);
          }
        }
      });
      setLoading(false);
    } catch (e) {
      setLoading(false);
      toast.danger({message: 'Something went wrong'});
      console.log('error login->', e);
    }
  };
  const getMgDataList = async finalArr => {
    let total_dosageAllArray = sumProperty(finalArr, 'total_dosage');
    // const body = new FormData();
    // body.append('medicine_id', isMedicineId);
    let data_to_encrypt = JSON.stringify({
      medicine_id: isMedicineId,
    });
    const encrypted_data = CryptoJSAesEncrypt(data_to_encrypt);
    let body = JSON.stringify(encrypted_data);

    try {
      const {status, token, message, data} = await fetchResource(
        {
          url: 'detail-list',
          body,
        },
        true,
      );
      // console.log('details list --->', data);
      if (status == 1) {
        if (data.length == '0') {
          if (isMedicineId == 3) {
            console.log('esle 1 -->');
            var final = isPatientWeigth * ismgkg;
            var final2 = final / 2;
            navigation.replace('ResultStatement', {
              data: final2,
              isMedicineID: 'three',
              doseType: isSelectIndicationLabel,
              note: data,
            });
          }
          setPatientName('');
          setPatienteight('');
          setSelectionMode('');
          setMedicineId('');
          setMedicineLable('');
          setFrequency('');
          setFormInputs([]);
          setLoading(false);
          setmgkg('');
          setSelectIndicationLabel('');
        } else {
          if (isMedicineId == 2) {
            navigation.replace('ResultStatement', {
              data: data,
              isMedicineID: 'two',
              doseType: isSelectDoseLabel,
            });
          }
          if (isMedicineId == 1) {
            let mg_list = data.MgList_list;
            let dose_list = data.dosage_list;

            navigation.replace('ResultCalculator', {
              isAddPatient: true,
              mgList: mg_list,
              doseList: dose_list,
              total_dosageAllArray: total_dosageAllArray,
              MedicineLable: isMedicineLable,
              MedicineId: isMedicineId,
              PatientName: isPatientName,
              PatientWeigth: isPatientWeigth,
              paramter: isSelectionMode,
              frequency: isFrequency,
              patient_dose: finalArr,
            });
          }

          if (isMedicineId == 3) {
            // if (ismgkg < 2.5 || ismgkg > 5) {
            //   console.log('if 2 -->');
            //   if (ismgkg < 2.5 || ismgkg > 5) {
            //     console.log('if if 1-->');
            //     setDoseEmptyLable(true);
            //   } else {
            //     console.log('if else 1-->');
            //     setDoseEmptyLable(false);
            //   }
            //   setmgkgEmpty(false);
            // } else {
            // console.log('esle 2-->');
            var final = isPatientWeigth * ismgkg;
            var final2 = final / 2;
            navigation.replace('ResultStatement', {
              data: final2,
              isMedicineID: 'three',
              doseType: isSelectIndicationLabel,
              note: data,
            });
          }
          setPatientName('');
          setPatienteight('');
          setSelectionMode('');
          setMedicineId('');
          setMedicineLable('');
          setFrequency('');
          setFormInputs([]);
          setLoading(false);
        }
      } else {
        setPatientName('');
        setPatienteight('');
        setSelectionMode('');
        setMedicineId('');
        setMedicineLable('');
        setFrequency('');
        setFormInputs([]);
        setLoading(false);
        setLoading(false);
        toast.danger({message: 'Something went wrong'});
      }
    } catch (e) {
      setLoading(false);
      toast.danger({message: 'Something went wrong'});
      console.log('getMgDataList eroor->', e);
    }
  };
  const naviagateToNextScreen = async () => {
    var arr = [{data: []}];
    let emptyArray = [];
    // for remove key parameter from array
    formInputs.map(item => {
      if (item.start_date !== '') {
        if (
          item.start_date !== 'Invalid date' &&
          item.end_date !== 'Invalid date' &&
          item.daily_dose !== '' &&
          item.frequency !== ''
        ) {
          emptyArray.push({
            day: item.day,
            start_date: item.start_date,
            end_date: item.end_date,
            daily_dose: item.daily_dose,
            total_dosage: item.day * item.daily_dose * item.frequency,
            frequency: item.frequency,
          });
        }
      }
    });

    arr[0].data = emptyArray;
    let finalArr = JSON.stringify(arr[0]);
    const doctor_id = await AsyncStorage.getItem('@doctor_id');

    if (isMedicineId == 1) {
      if (isPatientWeigth == '') {
        if (isPatientWeigth == '') {
          setWeightEmpty(true);
        }
        if (isMedicineLable == '') {
          setIsError(true);
        }
        setLoading(false);
      } else {
        let data_to_encrypt = JSON.stringify({
          doctor_id: doctor_id,
          name: isPatientName,
          weight: isPatientWeigth,
          parameter: isSelectionMode,
          medicine_id: isMedicineId,
          indication: isSelectIndicationLabel,
          patient_dose: finalArr,
        });
        goNextScreen(data_to_encrypt, emptyArray);
      }
    }
    if (isMedicineId == '2') {
      if (isSelectDoseLabel == '') {
        setLoading(false);
        if (isSelectDoseLabel == '') {
          setSelectDoseEmpty(true);
        }
        if (isMedicineLable == '') {
          setIsErrorindication(true);
        }
      } else {
        let data_to_encrypt = JSON.stringify({
          doctor_id: doctor_id,
          name: isPatientName,
          medicine_id: isMedicineId,
          dose_type: isSelectDoseLabel,
          indication: isSelectIndicationLabel,
        });
        goNextScreen(data_to_encrypt, emptyArray);
      }
    }
    if (isMedicineId == 3) {
      if (
        isSelectIndicationLabel == '' ||
        ismgkg == '' ||
        isPatientWeigth == ''
      ) {
        if (ismgkg == '') {
          setmgkgEmpty(true);
          setDoseEmptyLable(true);
        }
        if (isSelectIndicationLabel == '') {
          setIsErrorindication(true);
        }

        if (isPatientWeigth == '') {
          setWeightEmpty(true);
        }
        setLoading(false);
      } else {
        if (ismgkg !== '') {
          if (ismgkg < 2.5 || ismgkg > 5) {
            console.log('if--->', ismgkg);
            setDoseEmptyLable(true);
          } else {
            let data_to_encrypt = JSON.stringify({
              doctor_id: doctor_id,
              name: isPatientName,
              medicine_id: isMedicineId,
              weight: isPatientWeigth,
              parameter: isSelectionMode,
              indication: isSelectIndicationLabel,
              mg: ismgkg,
            });
            goNextScreen(data_to_encrypt, emptyArray);
            setDoseEmptyLable(false);
          }
        }
        // else {
        //   goNextScreen();
        // }
      }
    }
  };
  const nextScreen = async isMedicine => {
    setLoading(true);
    if (isMedicineId !== '') {
      if (formInputs.length !== 0) {
        if (isMedicineId == 1) {
          const _inputs = [...formInputs];
          var l_dose = _inputs[_inputs.length - 1];
          var l_daily_dose = l_dose.frequency;

          if (l_daily_dose == '') {
            toast.info({message: 'Please fill Frequency Field'});
            console.log('if 2 --->', l_daily_dose);
            setLoading(false);
          } else {
            setLoading(true);
            console.log('else --->', l_daily_dose);
            naviagateToNextScreen();
          }
        } else {
          setLoading(false);
          naviagateToNextScreen();
        }
      } else {
        setLoading(true);
        naviagateToNextScreen();
      }
    } else {
      if (isMedicineLable == '') {
        setLoading(false);
        setIsError(true);
        setmgkgEmpty(false);
      }
    }
    // }
  };
  const mgkgValidation = item => {
    setmgkg(item);
    if (item !== '') {
      if (item < 2.5 || item > 5) {
        setDoseEmptyLable(true);
      } else {
        setDoseEmptyLable(false);
      }
    }
    setmgkgEmpty(false);
  };
  const goNextScreen = async (data_to_encrypt, emptyArray) => {
    setLoading(true);

    const encrypted_data = CryptoJSAesEncrypt(data_to_encrypt);
    let body = JSON.stringify(encrypted_data);
    // const doctor_id = await AsyncStorage.getItem('@doctor_id');
    // const body = new FormData();
    // body.append('doctor_id', doctor_id);
    // body.append('name', isPatientName);

    // if (isMedicineId == 1) {
    //   body.append('weight', isPatientWeigth);
    //   body.append('parameter', isSelectionMode);
    //   body.append('medicine_id', isMedicineId);
    //   body.append('indication', isSelectIndicationLabel);
    //   body.append('patient_dose', finalArr);
    // }
    // if (isMedicineId == 2) {
    //   body.append('medicine_id', isMedicineId);
    //   body.append('dose_type', isSelectDoseLabel);
    //   body.append('indication', isSelectIndicationLabel);
    // }
    // if (isMedicineId == 3) {
    //   body.append('medicine_id', isMedicineId);
    //   body.append('weight', isPatientWeigth);
    //   body.append('parameter', isSelectionMode);
    //   body.append('indication', isSelectIndicationLabel);
    //   body.append('mg', ismgkg);
    // }

    try {
      const {status, message, data} = await fetchResource(
        {
          url: 'patient-add',
          body,
        },
        true,
      );

      if (status == 1) {
        if (isMedicineId == 3) {
          setLoading(false);
          if (ismgkg < 2.5 || ismgkg > 5) {
            if (ismgkg < 2.5) {
              setDoseEmptyLable(true);
            } else {
              setDoseEmptyLable(false);
            }
            setmgkgEmpty(false);
          } else {
            getMgDataList(emptyArray);
          }
        } else {
          getMgDataList(emptyArray);
        }
      } else {
        setLoading(false);
        toast.danger({message: message});
        console.log('error login->', status, message);
      }
    } catch (e) {
      setLoading(false);
      console.log('add pateint error -->', e);
      toast.danger({message: 'Something went wrong'});
    }
  };
  const calenderOK = async () => {
    setOpenStartDatePicker(false);
    const totalDays = await AsyncStorage.getItem('@totalDays');
    const startDate = await AsyncStorage.getItem('@startDate');
    const ednDate = await AsyncStorage.getItem('@endDate');
    const s_date = moment(JSON.parse(startDate)).format('DD-MM-YYYY');
    const e_date = moment(JSON.parse(ednDate)).format('DD-MM-YYYY');
    console.log('startDate---<', startDate, 'ednDate->', ednDate);
    if (ednDate !== null) {
      setTotalDose('1');
    }
    setTotalDose(totalDays);
    setStartDate(s_date);
    setEndDate(e_date);
    const _formNumberInputs = [...formInputs];
    _formNumberInputs[isCalenderIndex].key = isCalenderIndex;
    _formNumberInputs[isCalenderIndex].start_date = s_date;
    if (ednDate !== null) {
      _formNumberInputs[isCalenderIndex].day = totalDays;
    } else {
      if (startDate !== null) {
        _formNumberInputs[isCalenderIndex].day = '1';
      }
    }

    setFormInputs(_formNumberInputs);
    const _formNumberInputs1 = [...formInputs];
    _formNumberInputs1[isCalenderIndex].key = isCalenderIndex;
    _formNumberInputs1[isCalenderIndex].end_date = e_date;
    setFormInputs(_formNumberInputs1);
    await AsyncStorage.removeItem('@totalDays');
    await AsyncStorage.removeItem('@startDate');
    await AsyncStorage.removeItem('@endDate');
    setOpenStartDatePicker(false);
  };
  const datePlusClick = showPop => {
    setDateINput.push({label: 'New label', show: false});
  };
  const medicineSelect = item => {
    setMedicineDropDown(false);
    setSelectIndicationLabel('');
    setSelectIndicationId('');
    setIndicationHideView(false);
    if (item.value == '1') {
      setHideView(true);
      setHideSecondMedicine(false);
      setHideViewFrequency(false);
      setHideMedicineThree(false);
      setHideMedicineFour(false);
      setSelectIndicationLabel('Acne');
    }
    if (item.value == '2') {
      setHideSecondMedicine(true);
      setHideView(false);
      setHideViewFrequency(false);
      setHideMedicineThree(false);
      setHideMedicineFour(false);
      setSelectIndicationLabel('Psoriasis');
    }
    if (item.value == '3') {
      setHideMedicineThree(true);
      setHideSecondMedicine(false);
      setHideMedicineFour(false);
      setHideView(false);
      setFrequency('');
    }
    if (item.value == '4') {
      alert('Coming Soon !');
      setHideMedicineFour(true);
      setHideViewFrequency(false);
      setHideMedicineThree(false);
      setHideSecondMedicine(false);
      setFrequency('');
      setHideView(false);
    }
  };
  const doseSelect = item => {
    setSelectDoseLabel(item.label);
    setSelectDoseId(item.value);
    setSelectDoseEmpty(false);
    setSelectDoseEmpty(false);
  };
  const indicationSelect = item => {
    setSelectIndicationLabel(item.label);
    setSelectIndicationId(item.value);
    setSelectDoseEmpty(false);
  };
  const closeDropDown = () => {
    setMedicineDropDown(false);
    setDoseDropDown(false);
    setIndicationDropDown(false);
    setIndicationHideView(false);
    setFrequencyDropDown(false);
  };
  return (
    <>
      <GeneralStatusBarColor backgroundColor={'#ffa448'} />
      <SafeAreaView style={{flex: 1, backgroundColor: white}}>
        <View style={{height: height}}>
          <ImageBackground
            source={orangeBackground}
            resizeMode="cover"
            style={{height: height, width: width}}>
            <Header
              text={'Patient Detail'}
              isHeadertrue={true}
              onPress={() => {
                navigation.navigate('Home');
              }}
            />
            <LoaderAnimated visible={isLoading} />

            <View
              style={styles.containerMain}
              onStartShouldSetResponder={() => closeDropDown()}>
              <ScrollView
                onScroll={() => closeDropDown()}
                nestedScrollEnabled={true}
                keyboardShouldPersistTaps={'always'}
                style={{
                  width: width,
                  height: height,
                }}>
                <TouchableWithoutFeedback
                  onPress={() => {
                    closeDropDown();
                  }}>
                  <View
                    onStartShouldSetResponder={() => true}
                    style={{
                      width: width,
                      alignItems: 'center',
                      marginBottom:
                        isKeyboardOpen == true ? height * 0.4 : height * 0.12,
                    }}>
                    <View
                      style={{
                        alignItems: 'flex-start',
                        width: width * 0.95,
                        marginTop: height * 0.05,
                      }}>
                      <View style={styles.fieldView}>
                        <Text style={styles.fieldText}>Patient Name</Text>
                      </View>
                    </View>
                    <View
                      style={[
                        styles.fieldMainView,
                        {
                          borderColor: isNameEmpty == true ? error : null,
                          borderWidth: isNameEmpty == true ? 1 : 0,
                          marginTop: 10,
                        },
                      ]}>
                      <TextInput
                        style={styles.placeholderStyle}
                        value={isPatientName}
                        placeholder="Enter Patient Name"
                        placeholderTextColor={'#cfcfcf'}
                        ref={_name}
                        // onSubmitEditing={() => _weight.current.focus()}
                        onChangeText={name => {
                          closeDropDown();
                          setPatientName(name);
                          setNameEmpty(false);
                        }}
                        autoFocus
                        // onFocus={() => }
                        keyboardType="email-address"
                        // autoCapitalize="none"
                      />
                    </View>
                    <View
                      style={{
                        alignItems: 'flex-start',
                        width: width * 0.95,
                        marginTop:
                          Platform.OS == 'ios' ? height * 0.01 : height * 0.01,
                      }}>
                      <View style={styles.fieldView}>
                        <Text style={styles.fieldText}>Select Medicine</Text>
                      </View>
                    </View>
                    {Platform.OS == 'ios' ? (
                      <View style={{height: width * 0.12, zIndex: 9999}}>
                        <View
                          style={{
                            width: width,
                            alignItems: 'center',
                          }}>
                          <DropDownText
                            isError={isError}
                            text={
                              isMedicineLable == ''
                                ? 'Select Medicine'
                                : isMedicineLable
                            }
                            value={isMedicineLable}
                            onPress={() => {
                              if (isIndicationHideView == true) {
                                setIndicationHideView(false);
                              } else {
                                setIndicationHideView(true);
                              }
                              if (isDoseDropDown == true) {
                                setMedicineDropDown(!isMedicineDropDown);
                                setDoseDropDown(false);
                              } else {
                                setMedicineDropDown(!isMedicineDropDown);
                                setIndicationDropDown(false);
                              }
                              if (isIndicationDropDown == true) {
                                setMedicineDropDown(!isMedicineDropDown);
                                setIndicationDropDown(false);
                              } else {
                                setMedicineDropDown(!isMedicineDropDown);
                              }
                            }}
                          />
                          <DropDownMain
                            text={
                              isMedicineLable == ''
                                ? 'Select Medicine'
                                : isMedicineLable
                            }
                            style={{
                              width: width * 0.9,
                              top: Platform.OS == 'ios' ? 2 : 2,
                              zIndex: 9999,
                            }}
                            textStyle={{width: width * 0.74}}
                            style1={styles.dropDownMain}
                            data={isMedicineArray}
                            value={isMedicineLable}
                            onSelect={item => {
                              setIsError(false);
                              setHideView(true);
                              setMedicineLable(item.label);
                              setMedicineId(item.value);
                              medicineSelect(item);
                              setShowOption(true);
                              setIndicationHideView(false);
                            }}
                            isError={isError}
                            isDropDownOne={isShowOption}
                            showOption={isMedicineDropDown}
                          />
                        </View>
                      </View>
                    ) : (
                      <View
                        style={{
                          width: width,
                          alignItems: 'center',
                        }}>
                        <DropDownText
                          isError={isError}
                          text={
                            isMedicineLable == ''
                              ? 'Select Medicine'
                              : isMedicineLable
                          }
                          value={isMedicineLable}
                          onPress={() => {
                            if (isIndicationHideView == true) {
                              setIndicationHideView(false);
                            } else {
                              setIndicationHideView(true);
                            }
                            if (isDoseDropDown == true) {
                              setMedicineDropDown(!isMedicineDropDown);
                              setDoseDropDown(false);
                            } else {
                              setMedicineDropDown(!isMedicineDropDown);
                              setIndicationDropDown(false);
                            }
                            if (isIndicationDropDown == true) {
                              setMedicineDropDown(!isMedicineDropDown);
                              setIndicationDropDown(false);
                            } else {
                              setMedicineDropDown(!isMedicineDropDown);
                            }
                          }}
                        />
                        <DropDownMain
                          text={
                            isMedicineLable == ''
                              ? 'Select Medicine'
                              : isMedicineLable
                          }
                          style={{
                            width: width * 0.9,
                            top: Platform.OS == 'ios' ? 2 : 2,
                            zIndex: 9999,
                          }}
                          textStyle={{width: width * 0.74}}
                          style1={styles.dropDownMain}
                          data={isMedicineArray}
                          value={isMedicineLable}
                          onSelect={item => {
                            setIsError(false);
                            setHideView(true);
                            setMedicineLable(item.label);
                            setMedicineId(item.value);
                            medicineSelect(item);
                            setShowOption(true);
                          }}
                          isError={isError}
                          showOption={isMedicineDropDown}
                        />
                      </View>
                    )}

                    {isHideView === true ? (
                      <View style={{width: width, alignItems: 'center'}}>
                        <View
                          style={{
                            alignItems: 'flex-start',
                            width: width * 0.95,
                            marginTop: height * 0.02,
                          }}>
                          <View style={styles.fieldView}>
                            <Text style={styles.fieldText}>
                              Select Indication
                            </Text>
                          </View>
                        </View>
                        {isIndicationHideView == false ? (
                          Platform.OS == 'ios' ? (
                            <DropDownText
                              text={
                                isSelectIndicationLabel == ''
                                  ? 'Select Indication'
                                  : isSelectIndicationLabel
                              }
                              value={isSelectIndicationLabel}
                              onPress={() => {
                                if (isIndicationHideView == false) {
                                  if (isMedicineDropDown == true) {
                                    setIndicationDropDown(
                                      !isIndicationDropDown,
                                    );
                                    setMedicineDropDown(false);
                                  } else {
                                    setIndicationDropDown(
                                      !isIndicationDropDown,
                                    );
                                  }
                                } else {
                                }
                                setIndicationHideView(false);
                                if (isMedicineDropDown == true) {
                                  setDoseDropDown(!isDoseDropDown);
                                  setMedicineDropDown(false);
                                } else {
                                  setDoseDropDown(!isDoseDropDown);
                                }
                              }}
                            />
                          ) : (
                            <DropDownText
                              value={
                                isSelectIndicationLabel == ''
                                  ? 'Select Dose'
                                  : isSelectIndicationLabel
                              }
                              onPress={() => {
                                if (isIndicationHideView == false) {
                                  if (isMedicineDropDown == true) {
                                    setIndicationDropDown(
                                      !isIndicationDropDown,
                                    );
                                    setMedicineDropDown(false);
                                  } else {
                                    setIndicationDropDown(
                                      !isIndicationDropDown,
                                    );
                                  }
                                } else {
                                }
                                setIndicationHideView(false);
                                if (isMedicineDropDown == true) {
                                  setDoseDropDown(!isDoseDropDown);
                                  setMedicineDropDown(false);
                                } else {
                                  setDoseDropDown(!isDoseDropDown);
                                }
                              }}
                            />
                          )
                        ) : (
                          <View style={{height: width * 0.13}}>
                            <Text>null</Text>
                          </View>
                        )}
                        {Platform.OS == 'ios' ? (
                          <View
                            style={{
                              alignItems: 'center',
                              height: width * 0.03,
                              zIndex: 9999,
                            }}>
                            <DropDownMain
                              text={
                                isSelectIndicationLabel == ''
                                  ? 'Select Indication'
                                  : isSelectIndicationLabel
                              }
                              value={isSelectIndicationLabel}
                              style={{
                                width: width * 0.9,
                                top: Platform.OS == 'ios' ? 2 : 2,
                                zIndex: 9999,
                                height: width * 0.15,
                              }}
                              textStyle={{width: width * 0.74}}
                              style1={styles.dropDownMain}
                              data={dataMedicie1}
                              onSelect={item => {
                                setDoseDropDown(false);
                                indicationSelect(item);
                                setIsErrorindication(false);
                              }}
                              isError={isError}
                              showOption={isDoseDropDown}
                            />
                          </View>
                        ) : (
                          <DropDownMain
                            text={
                              isSelectIndicationId == ''
                                ? 'Select Indication'
                                : isSelectIndicationId
                            }
                            style={{
                              width: width * 0.9,
                              top: Platform.OS == 'ios' ? 2 : 2,
                              zIndex: 9999,
                              height: width * 0.15,
                            }}
                            textStyle={{width: width * 0.74}}
                            style1={styles.dropDownMain}
                            data={dataMedicie1}
                            value={isSelectIndicationLabel}
                            onSelect={item => {
                              setDoseDropDown(false);
                              indicationSelect(item);
                              setIsErrorindication(false);
                            }}
                            isError={isErrorindication}
                            showOption={isDoseDropDown}
                          />
                        )}
                        <View
                          style={{
                            alignItems: 'flex-start',
                            width: width * 0.95,
                            marginTop:
                              Platform.OS == 'android'
                                ? height * 0.02
                                : height * 0.0,
                          }}>
                          <View style={styles.fieldView}>
                            <Text style={styles.fieldText}>Patient Weight</Text>
                          </View>
                        </View>

                        <View
                          style={[
                            styles.fieldMainView,
                            {
                              flexDirection: 'row',
                              alignItems: 'center',
                              borderColor: isWeightEmpty == true ? error : null,
                              borderWidth: isWeightEmpty == true ? 1 : 0,
                            },
                          ]}>
                          <TextInput
                            style={[
                              styles.placeholderStyle,
                              {width: width * 0.4},
                            ]}
                            value={isPatientWeigth.toString()}
                            placeholder="Add Weight"
                            placeholderTextColor={'#cfcfcf'}
                            ref={_weight}
                            onChangeText={weight => {
                              closeDropDown();
                              setPatienteight(weight);
                              setWeightEmpty(false);
                            }}
                            autoFocus
                            keyboardType={'number-pad'}
                          />
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
                              onPress={() => setSelectionMode('kg')}
                              style={{
                                flex: 1,
                                borderRadius: 10,
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'row',
                                backgroundColor:
                                  isSelectionMode == 'kg' ? mainColor : white,
                              }}>
                              <Text
                                style={{
                                  color:
                                    isSelectionMode == 'kg'
                                      ? 'white'
                                      : mainColor,
                                }}>
                                Kg
                              </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              activeOpacity={1}
                              onPress={() => {
                                setSelectionMode('pound');
                              }}
                              style={{
                                flex: 1,
                                backgroundColor:
                                  isSelectionMode == 'pound'
                                    ? mainColor
                                    : 'white',
                                borderRadius: 10,
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'row',
                              }}>
                              <Text
                                style={{
                                  color:
                                    isSelectionMode == 'pound'
                                      ? 'white'
                                      : mainColor,
                                }}>
                                Pound
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </View>

                        <View
                          style={{
                            alignItems: 'flex-start',
                            width: width * 0.95,
                            marginTop:
                              Platform.OS == 'android'
                                ? height * 0.02
                                : height * 0.025,
                          }}>
                          <View style={styles.fieldView}>
                            <Text style={styles.fieldText}>
                              Previous Dosage
                            </Text>
                          </View>
                        </View>

                        <View
                          style={[
                            styles.fieldMainViewBig,
                            {
                              borderColor:
                                isTotalDoseEmpty == true ? error : null,
                              borderWidth: isTotalDoseEmpty == true ? 1 : 0,
                            },
                          ]}>
                          <View
                            style={{
                              width: width * 0.5,
                              marginLeft: 18,
                              flexDirection: 'row',
                              marginTop: 10,
                            }}>
                            <Text style={{width: width * 0.52}}>
                              Total Dosage days
                            </Text>
                            <Text>Dose(mg)</Text>
                          </View>
                          <View
                            style={{
                              width: width * 0.83,
                              alignItems: 'center',
                            }}>
                            {formInputs !== ''
                              ? formInputs.map((item, index) => (
                                  <View
                                    key={index}
                                    style={styles.submitFormRow}>
                                    <View style={[{alignitems: 'flex-start'}]}>
                                      <View style={{flexDirection: 'row'}}>
                                        <View
                                          style={[
                                            styles.daysMainView,
                                            {marginLeft: 15},
                                          ]}>
                                          <Text
                                            style={[
                                              styles.mainTextYellow,
                                              {
                                                fontSize: 13,
                                                marginLeft: 10,
                                                marginTop: 10,
                                              },
                                            ]}>
                                            {item.day == '' ? 'Days' : item.day}{' '}
                                            {item.day == ''
                                              ? null
                                              : item.day == '1'
                                              ? 'Day'
                                              : 'Days'}
                                          </Text>
                                          <TouchableOpacity
                                            onPress={() => {
                                              setOpenStartDatePicker(true);
                                              setCalenderIndex(index);
                                            }}
                                            activeOpacity={0.8}
                                            style={{
                                              flexDirection: 'row',
                                              alignItems: 'center',
                                            }}>
                                            <Image
                                              source={CalenderMainColor}
                                              style={{
                                                width: 20,
                                                height: 15,
                                                marginLeft: 5,
                                              }}
                                            />
                                            <View
                                              style={{flexDirection: 'row'}}>
                                              <Text
                                                style={[
                                                  styles.mainTextYellow,
                                                  {
                                                    fontSize: 10,
                                                    marginLeft: 5,
                                                    color: mediumGray,
                                                    marginTop: 5,
                                                    marginRight: 20,
                                                    backgroundColor: 'red',
                                                  },
                                                ]}>
                                                {item.start_date == ''
                                                  ? 'Start Date'
                                                  : item.start_date}
                                              </Text>
                                              <Text
                                                style={[
                                                  styles.mainTextYellow,
                                                  {
                                                    fontSize: 10,
                                                    marginLeft: 5,
                                                    color: mediumGray,
                                                    marginTop: 5,
                                                    width: 200,
                                                  },
                                                ]}>
                                                TO{'  '}
                                                {item.end_date == ''
                                                  ? 'End Date'
                                                  : item.end_date}
                                              </Text>
                                            </View>
                                          </TouchableOpacity>
                                        </View>
                                        <View
                                          style={{
                                            width: width * 0.25,
                                            marginLeft: 10,
                                            height: width * 0.26,
                                          }}>
                                          <View
                                            style={{
                                              flexDirection: 'row',
                                              alignItems: 'center',
                                            }}>
                                            <View
                                              style={[
                                                styles.daysMainView,
                                                {
                                                  width: width * 0.16,
                                                  justifyContent: 'center',
                                                  alignItems: 'center',
                                                },
                                              ]}>
                                              <TextInput
                                                style={[
                                                  styles.mainTextYellow,
                                                  {
                                                    fontSize: 15,
                                                    width: width * 0.1,
                                                    textAlign: 'center',
                                                    marginTop: 3,
                                                  },
                                                ]}
                                                value={item.daily_dose.toString()}
                                                placeholder="mg"
                                                placeholderTextColor={
                                                  mediumGray
                                                }
                                                onChangeText={dose => {
                                                  inputHandleUserId1(
                                                    dose,
                                                    index,
                                                  );
                                                }}
                                                // autoFocus
                                                keyboardType={'numeric'}
                                                // autoCapitalize="none"
                                              />
                                            </View>

                                            <TouchableOpacity
                                              style={{
                                                height: height * 0.09,
                                                justifyContent: 'center',
                                                marginTop: 5,
                                                marginLeft: 15,
                                              }}
                                              activeOpacity={0.8}
                                              onPress={() => {
                                                onDeletePush(index);
                                              }}>
                                              <Image
                                                source={DeleteIcon}
                                                style={styles.delteIconImg}
                                              />
                                            </TouchableOpacity>

                                            <Modal
                                              isVisible={isStartDatePicker}>
                                              <View
                                                style={{
                                                  backgroundColor: white,
                                                  width: width,
                                                  alignItems: 'center',
                                                  width: width * 0.9,
                                                }}>
                                                <DatePickerDual />
                                                <TouchableOpacity
                                                  activeOpacity={0.8}
                                                  style={styles.okView}
                                                  onPress={() => {
                                                    setOpenStartDatePicker(
                                                      false,
                                                    );
                                                    calenderOK(index);
                                                  }}>
                                                  <Text
                                                    style={{
                                                      color: white,
                                                      fontFamily: PoppinsMedium,
                                                    }}>
                                                    OK
                                                  </Text>
                                                </TouchableOpacity>
                                              </View>
                                            </Modal>
                                          </View>
                                        </View>
                                      </View>
                                      <View
                                        style={{
                                          width: width * 0.83,
                                          alignItems: 'center',
                                          // zIndex: 9999,
                                        }}>
                                        {Platform.OS == 'ios' ? (
                                          <DropDownText
                                            text={
                                              item.frequency == ''
                                                ? 'Select Frequency'
                                                : item.frequency
                                            }
                                            styleText={{width: width * 0.7}}
                                            styleView={{
                                              width: width * 0.8,
                                              marginLeft: 20,
                                            }}
                                            value={item.frequency}
                                            onPress={() => {
                                              setFrequencyDropDown(true);
                                              showFrequencyChange(
                                                !item.isFrequencyShow,
                                                index,
                                              );
                                            }}
                                          />
                                        ) : (
                                          <DropDownText
                                            text={
                                              item.frequency == ''
                                                ? 'Select Frequency'
                                                : item.frequency
                                            }
                                            value={item.frequency}
                                            onPress={() => {
                                              showFrequencyChange(
                                                !item.isFrequencyShow,
                                                index,
                                              );
                                            }}
                                            isDownOpacity={true}
                                          />
                                        )}
                                        {Platform.OS == 'ios' ? (
                                          <View
                                            style={{
                                              // height: width * 0.12,
                                              zIndex: 9999,
                                              width: width,
                                              alignItems: 'center',
                                            }}>
                                            <DropDownMain
                                              text={
                                                item.frequency == ''
                                                  ? 'Select Frequency'
                                                  : item.frequency
                                              }
                                              style={{
                                                width: width * 0.8,
                                                top: 2,
                                                marginLeft: 20,
                                                backgroundColor: 'white',
                                                elevation: 1,
                                                height: height * 0.08,
                                              }}
                                              textStyle={{
                                                width: width * 0.65,
                                                color: mediumGray,
                                              }}
                                              style1={styles.dropDownMain2}
                                              data={dataFrequency}
                                              value={item.frequency.toString()}
                                              onSelect={item => {
                                                setFrequencyDropDown(false);
                                                setFrequency(item.label);
                                                inputHandleFrequency(
                                                  item,
                                                  index,
                                                );
                                              }}
                                              isError={isError}
                                              showOption={item.isFrequencyShow}
                                            />
                                          </View>
                                        ) : (
                                          <View
                                            style={{
                                              width: width,
                                              marginLeft: 25,
                                            }}>
                                            <DropDownMain
                                              text={
                                                item.frequency == ''
                                                  ? 'Select Frequency'
                                                  : item.frequency
                                              }
                                              style={{
                                                width: width * 0.8,
                                                top: 2,
                                                marginLeft: 20,
                                                backgroundColor: 'white',
                                                elevation: 1,
                                              }}
                                              textStyle={{
                                                width: width * 0.65,
                                                color: mediumGray,
                                              }}
                                              style1={styles.dropDownMain2}
                                              data={dataFrequency}
                                              value={item.frequency.toString()}
                                              onSelect={item => {
                                                showFrequencyChange(
                                                  false,
                                                  index,
                                                );
                                                setFrequencyDropDown(false);
                                                setFrequency(item.label);
                                                inputHandleFrequency(
                                                  item,
                                                  index,
                                                );
                                              }}
                                              isError={isError}
                                              showOption={item.isFrequencyShow}
                                            />
                                          </View>
                                        )}
                                      </View>
                                    </View>
                                  </View>
                                ))
                              : null}
                            <TouchableOpacity
                              activeOpacity={0.8}
                              style={[
                                styles.lastView,
                                {
                                  flexDirection: 'row',
                                  height: width * 0.11,
                                  marginLeft: width * 0.06,
                                  zIndex: 9999,
                                },
                              ]}
                              onPress={() => {
                                handleAddMoreLine1();
                                closeDropDown();
                              }}>
                              <Image
                                source={AddIcon}
                                style={{
                                  width: 35,
                                  height: 18,
                                  resizeMode: 'contain',
                                }}
                              />
                              <Text style={styles.lastText}>Add Dosage</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    ) : null}
                    {/* //here */}
                    {isHideSecondMedicine == true ? (
                      <View style={{width: width, alignItems: 'center'}}>
                        <View
                          style={{
                            alignItems: 'flex-start',
                            width: width * 0.95,
                            marginTop:
                              Platform.OS == 'ios'
                                ? height * 0.03
                                : height * 0.02,
                          }}>
                          <View style={styles.fieldView}>
                            <Text style={styles.fieldText}>
                              Select Indication
                            </Text>
                          </View>
                        </View>
                        {isIndicationHideView == false ? (
                          Platform.OS == 'ios' ? (
                            <DropDownText
                              text={
                                isSelectIndicationLabel == ''
                                  ? 'Select Indication'
                                  : isSelectIndicationLabel
                              }
                              value={isSelectIndicationLabel}
                              onPress={() => {
                                if (isIndicationHideView == false) {
                                  if (isMedicineDropDown == true) {
                                    setIndicationDropDown(
                                      !isIndicationDropDown,
                                    );
                                    setMedicineDropDown(false);
                                  } else {
                                    setIndicationDropDown(
                                      !isIndicationDropDown,
                                    );
                                  }
                                } else {
                                }
                                if (isMedicineDropDown == true) {
                                  setIndicationDropDown(!isIndicationDropDown);
                                  setMedicineDropDown(false);
                                } else {
                                  setIndicationDropDown(!isIndicationDropDown);
                                }
                                if (isDoseDropDown == true) {
                                  setDoseDropDown(false);
                                  setIndicationDropDown(!isIndicationDropDown);
                                } else {
                                  setIndicationDropDown(!isIndicationDropDown);
                                }
                              }}
                            />
                          ) : (
                            <DropDownText
                              value={
                                isSelectIndicationLabel == ''
                                  ? 'Select Indication'
                                  : isSelectIndicationLabel
                              }
                              onPress={() => {
                                if (isIndicationHideView == false) {
                                  if (isMedicineDropDown == true) {
                                    setIndicationDropDown(
                                      !isIndicationDropDown,
                                    );
                                    setMedicineDropDown(false);
                                  } else {
                                    setIndicationDropDown(
                                      !isIndicationDropDown,
                                    );
                                  }
                                } else {
                                }
                                if (isMedicineDropDown == true) {
                                  setIndicationDropDown(!isIndicationDropDown);
                                  setMedicineDropDown(false);
                                } else {
                                  setIndicationDropDown(!isIndicationDropDown);
                                }
                                if (isDoseDropDown == true) {
                                  setDoseDropDown(false);
                                  setIndicationDropDown(!isIndicationDropDown);
                                } else {
                                  setIndicationDropDown(!isIndicationDropDown);
                                }
                              }}
                            />
                          )
                        ) : (
                          <View
                            style={{
                              height:
                                Platform.OS == 'ios'
                                  ? width * 0.14
                                  : width * 0.13,
                            }}>
                            <Text>null</Text>
                          </View>
                        )}
                        {Platform.OS == 'ios' ? (
                          <View
                            style={{
                              height: width * 0.03,
                              zIndex: 9999,
                              alignItems: 'center',
                            }}>
                            <DropDownMain
                              text={
                                isSelectIndicationLabel == ''
                                  ? 'Select Indication'
                                  : isSelectIndicationLabel
                              }
                              style={{
                                width: width * 0.9,
                                top: Platform.OS == 'ios' ? 2 : 2,
                                zIndex: 9999,
                                height: width * 0.15,
                              }}
                              textStyle={{width: width * 0.74}}
                              style1={styles.dropDownMain}
                              data={dataMedicie2INdication}
                              value={isSelectIndicationLabel}
                              onSelect={item => {
                                setIndicationDropDown(false);
                                indicationSelect(item);
                                setIsErrorindication(false);
                              }}
                              isError={isError}
                              showOption={isIndicationDropDown}
                            />
                          </View>
                        ) : (
                          <DropDownMain
                            text={
                              isSelectIndicationId == ''
                                ? 'Select Indication'
                                : isSelectIndicationId
                            }
                            style={{
                              width: width * 0.9,
                              top: Platform.OS == 'ios' ? 2 : 2,
                              zIndex: 9999,
                              height: width * 0.15,
                            }}
                            textStyle={{width: width * 0.74}}
                            style1={styles.dropDownMain}
                            data={dataMedicie2INdication}
                            value={isSelectIndicationLabel}
                            onSelect={item => {
                              setIndicationDropDown(false);
                              indicationSelect(item);
                              setIsErrorindication(false);
                            }}
                            isError={isErrorindication}
                            showOption={isIndicationDropDown}
                          />
                        )}
                        <View
                          style={{
                            height: width * 0.2,
                            width: width,
                            alignItems: 'center',
                          }}>
                          <View
                            style={{
                              alignItems: 'flex-start',
                              width: width * 0.95,
                              marginTop:
                                Platform.OS == 'android'
                                  ? height * 0.02
                                  : height * 0.01,
                            }}>
                            <View style={styles.fieldView}>
                              <Text style={styles.fieldText}>Select Dose</Text>
                            </View>
                          </View>
                          {Platform.OS == 'ios' ? (
                            <View
                              style={{
                                height: width * 0.12,
                                zIndex: 9999,
                                alignItems: 'center',
                              }}>
                              <DropDownText
                                isError={isSelectDoseEmpty}
                                text={
                                  isSelectDoseLabel == ''
                                    ? 'Select Dose'
                                    : isSelectDoseLabel
                                }
                                value={isSelectDoseLabel}
                                onPress={() => {
                                  setIndicationHideView(false);
                                  if (isMedicineDropDown == true) {
                                    setDoseDropDown(!isDoseDropDown);
                                    setMedicineDropDown(false);
                                  } else {
                                    setDoseDropDown(!isDoseDropDown);
                                  }
                                  if (isIndicationDropDown == true) {
                                    setDoseDropDown(!isDoseDropDown);
                                    setIndicationDropDown(false);
                                  } else {
                                    setDoseDropDown(!isDoseDropDown);
                                  }
                                }}
                              />
                              <DropDownMain
                                text={
                                  isSelectDoseId == ''
                                    ? 'Select Dose'
                                    : isSelectDoseId
                                }
                                style={{
                                  width: width * 0.9,
                                  top: Platform.OS == 'ios' ? 2 : 2,
                                  zIndex: 9999,
                                  height: width * 0.2,
                                }}
                                textStyle={{width: width * 0.74}}
                                style1={styles.dropDownMain}
                                data={dataMedcine2}
                                value={isSelectDoseLabel}
                                onSelect={item => {
                                  doseSelect(item);
                                  setDoseDropDown(false);
                                  setIndicationHideView(false);
                                }}
                                isError={isSelectDoseEmpty}
                                isDropDownOne={isSelectDoseEmpty}
                                showOption={isDoseDropDown}
                              />
                            </View>
                          ) : (
                            <View
                              style={{
                                height: width * 0.12,
                                width: width,
                                alignItems: 'center',
                              }}>
                              <DropDownText
                                isError={isSelectDoseEmpty}
                                text={
                                  isSelectDoseLabel == ''
                                    ? 'Select Dose'
                                    : isSelectDoseLabel
                                }
                                value={isSelectDoseLabel}
                                onPress={() => {
                                  setIndicationHideView(false);
                                  if (isMedicineDropDown == true) {
                                    setDoseDropDown(!isDoseDropDown);
                                    setMedicineDropDown(false);
                                  } else {
                                    setDoseDropDown(!isDoseDropDown);
                                  }
                                  if (isIndicationDropDown == true) {
                                    setDoseDropDown(!isDoseDropDown);
                                    setIndicationDropDown(false);
                                  } else {
                                    setDoseDropDown(!isDoseDropDown);
                                  }
                                }}
                              />
                              <DropDownMain
                                text={
                                  isSelectDoseId == ''
                                    ? 'Select Dose'
                                    : isSelectDoseId
                                }
                                style={{
                                  width: width * 0.9,
                                  top: Platform.OS == 'ios' ? 2 : 2,
                                  zIndex: 9999,
                                  height: width * 0.2,
                                }}
                                textStyle={{width: width * 0.74}}
                                style1={styles.dropDownMain}
                                data={dataMedcine2}
                                value={isSelectDoseLabel}
                                onSelect={item => {
                                  doseSelect(item);
                                  setDoseDropDown(false);
                                  setIndicationHideView(false);
                                }}
                                isError={isSelectDoseEmpty}
                                isDropDownOne={isSelectDoseEmpty}
                                showOption={isDoseDropDown}
                              />
                            </View>
                          )}
                        </View>
                      </View>
                    ) : null}
                    {isHideMedicineThree == true ? (
                      <View style={{width: width, alignItems: 'center'}}>
                        <View
                          style={{
                            alignItems: 'flex-start',
                            width: width * 0.95,
                            marginTop:
                              Platform.OS == 'ios'
                                ? height * 0.03
                                : height * 0.02,
                          }}>
                          <View style={styles.fieldView}>
                            <Text style={styles.fieldText}>
                              Select Indication
                            </Text>
                          </View>
                        </View>
                        {isIndicationHideView == false ? (
                          Platform.OS == 'ios' ? (
                            <DropDownText
                              isError={isErrorindication}
                              value={
                                isSelectIndicationLabel == ''
                                  ? 'Select Indication'
                                  : isSelectIndicationLabel
                              }
                              onPress={() => {
                                if (isIndicationHideView == false) {
                                  if (isMedicineDropDown == true) {
                                    setIndicationDropDown(
                                      !isIndicationDropDown,
                                    );
                                    setMedicineDropDown(false);
                                  } else {
                                    setIndicationDropDown(
                                      !isIndicationDropDown,
                                    );
                                  }
                                } else {
                                }
                                if (isMedicineDropDown == true) {
                                  setIndicationDropDown(!isIndicationDropDown);
                                  setMedicineDropDown(false);
                                } else {
                                  setIndicationDropDown(!isIndicationDropDown);
                                }
                                if (isDoseDropDown == true) {
                                  setDoseDropDown(false);
                                  setIndicationDropDown(!isIndicationDropDown);
                                } else {
                                  setIndicationDropDown(!isIndicationDropDown);
                                }
                              }}
                            />
                          ) : (
                            <DropDownText
                              isError={isErrorindication}
                              text={
                                isSelectIndicationLabel == ''
                                  ? 'Select Indication'
                                  : isSelectIndicationLabel
                              }
                              value={isSelectIndicationLabel}
                              onPress={() => {
                                if (isIndicationHideView == false) {
                                  if (isMedicineDropDown == true) {
                                    setIndicationDropDown(
                                      !isIndicationDropDown,
                                    );
                                    setMedicineDropDown(false);
                                  } else {
                                    setIndicationDropDown(
                                      !isIndicationDropDown,
                                    );
                                  }
                                } else {
                                }
                                if (isMedicineDropDown == true) {
                                  setIndicationDropDown(!isIndicationDropDown);
                                  setMedicineDropDown(false);
                                } else {
                                  setIndicationDropDown(!isIndicationDropDown);
                                }
                                if (isDoseDropDown == true) {
                                  setDoseDropDown(false);
                                  setIndicationDropDown(!isIndicationDropDown);
                                } else {
                                  setIndicationDropDown(!isIndicationDropDown);
                                }
                              }}
                            />
                          )
                        ) : (
                          <View
                            style={{
                              height:
                                Platform.OS == 'ios'
                                  ? width * 0.15
                                  : width * 0.13,
                            }}>
                            <Text>null</Text>
                          </View>
                        )}
                        {Platform.OS == 'ios' ? (
                          <View
                            style={{
                              height: width * 0.0,
                              zIndex: 9999,
                              alignItems: 'center',
                            }}>
                            <DropDownMain
                              text={
                                isSelectIndicationLabel == ''
                                  ? 'Select Indication'
                                  : isSelectIndicationLabel
                              }
                              style={{
                                width: width * 0.9,
                                top: Platform.OS == 'ios' ? 2 : 2,
                                zIndex: 9999,
                                height: width * 0.2,
                              }}
                              textStyle={{width: width * 0.74}}
                              style1={styles.dropDownMain}
                              data={dataMedicie3}
                              value={isSelectIndicationLabel}
                              onSelect={item => {
                                setIndicationDropDown(false);
                                indicationSelect(item);
                                setIsErrorindication(false);
                              }}
                              isError={isErrorindication}
                              showOption={isIndicationDropDown}
                            />
                          </View>
                        ) : (
                          <DropDownMain
                            text={
                              isSelectIndicationId == ''
                                ? 'Select Indication'
                                : isSelectIndicationId
                            }
                            style={{
                              width: width * 0.9,
                              top: Platform.OS == 'ios' ? 2 : 2,
                              zIndex: 9999,
                              height: width * 0.2,
                            }}
                            textStyle={{width: width * 0.74}}
                            style1={styles.dropDownMain}
                            data={dataMedicie3}
                            value={isSelectIndicationLabel}
                            onSelect={item => {
                              setIndicationDropDown(false);
                              indicationSelect(item);
                              setIsErrorindication(false);
                            }}
                            isError={isErrorindication}
                            showOption={isIndicationDropDown}
                          />
                        )}
                        <View
                          style={{
                            alignItems: 'flex-start',
                            width: width * 0.95,
                            marginTop:
                              Platform.OS == 'android'
                                ? height * 0.02
                                : height * 0.025,
                          }}>
                          <View style={styles.fieldView}>
                            <Text style={styles.fieldText}>Patient Weight</Text>
                          </View>
                        </View>
                        <View
                          style={[
                            styles.fieldMainView,
                            {
                              flexDirection: 'row',
                              alignItems: 'center',
                              borderColor: isWeightEmpty == true ? error : null,
                              borderWidth: isWeightEmpty == true ? 1 : 0,
                            },
                          ]}>
                          <TextInput
                            style={[
                              styles.placeholderStyle,
                              {width: width * 0.4},
                            ]}
                            value={isPatientWeigth.toString()}
                            placeholder="Add Weight"
                            placeholderTextColor={'#cfcfcf'}
                            ref={_weight}
                            onChangeText={weight => {
                              setPatienteight(weight);
                              setWeightEmpty(false);
                            }}
                            autoFocus
                            keyboardType={'number-pad'}
                          />
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
                              onPress={() => setSelectionMode('kg')}
                              style={{
                                flex: 1,
                                borderRadius: 10,
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'row',
                                backgroundColor:
                                  isSelectionMode == 'kg' ? mainColor : white,
                              }}>
                              <Text
                                style={{
                                  color:
                                    isSelectionMode == 'kg'
                                      ? 'white'
                                      : mainColor,
                                }}>
                                Kg
                              </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              activeOpacity={1}
                              onPress={() => setSelectionMode('pound')}
                              style={{
                                flex: 1,
                                backgroundColor:
                                  isSelectionMode == 'pound'
                                    ? mainColor
                                    : 'white',
                                borderRadius: 10,
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'row',
                              }}>
                              <Text
                                style={{
                                  color:
                                    isSelectionMode == 'pound'
                                      ? 'white'
                                      : mainColor,
                                }}>
                                Pound
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                        <View
                          style={{
                            alignItems: 'flex-start',
                            width: width * 0.95,
                            marginTop:
                              Platform.OS == 'android'
                                ? height * 0.02
                                : height * 0.02,
                          }}>
                          <View style={styles.fieldView}>
                            <Text style={styles.fieldText}>
                              Preferred dose in mg/kg
                            </Text>
                          </View>
                        </View>
                        <View
                          style={[
                            styles.fieldMainView,
                            {
                              flexDirection: 'row',
                              alignItems: 'center',
                              // marginTop: 10,
                              borderColor: ismgkgEmpty == true ? error : null,
                              borderWidth: ismgkgEmpty == true ? 1 : 0,
                            },
                          ]}>
                          <TextInput
                            style={[
                              styles.placeholderStyle,
                              {
                                fontSize: 15,
                                width: width * 0.74,
                                // textAlign: 'center',
                                marginTop: 3,
                                marginLeft: 10,
                              },
                            ]}
                            value={ismgkg}
                            // placeholder="mg"
                            placeholderTextColor={mediumGray}
                            onChangeText={dose => {
                              mgkgValidation(dose);
                            }}
                            // autoFocus
                            keyboardType={'numeric'}
                            // autoCapitalize="none"
                          />
                          <Text>mg/kg</Text>
                        </View>
                        <View
                          style={{
                            width: width * 0.85,
                            alignItems: 'flex-start',
                          }}>
                          <Text style={styles.errorText}>
                            Insert value between 2.5 to 5 mg/kg
                          </Text>
                        </View>
                      </View>
                    ) : null}
                    <View
                      style={{
                        height: width * 0.2,
                        width: width,
                        alignItems: 'center',
                        marginTop:
                          isHideSecondMedicine == true
                            ? height * 0.08
                            : height * 0.0,
                      }}>
                      {isHideMedicinefour == true ? (
                        <View style={{width: width, alignItems: 'center'}}>
                          <View
                            style={[
                              styles.lastView,
                              {
                                backgroundColor: lightgray,
                                shadowColor: black,
                                elevation: 1,
                              },
                            ]}>
                            <Text
                              style={[styles.lastText, {color: mediumGray}]}>
                              Click to See Result
                            </Text>
                          </View>
                        </View>
                      ) : (
                        <View style={{width: width, alignItems: 'center'}}>
                          <TouchableOpacity
                            style={styles.lastView}
                            onPress={() => {
                              if (isMedicineId == 2) {
                                nextScreen(true);
                              } else {
                                nextScreen(false);
                              }
                            }}>
                            <Text style={styles.lastText}>
                              Click to See Result
                            </Text>
                          </TouchableOpacity>
                        </View>
                      )}
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </ScrollView>
            </View>
            {/* </TouchableWithoutFeedback> */}
          </ImageBackground>
        </View>
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
  },
  dropDownMain2: {
    // shadowColor: '#000',
    // shadowOffset: {width: 1, height: 1},
    // shadowOpacity: Platform.OS == 'ios' ? 0.4 : 0.8,
    // shadowRadius: 2,
    // elevation: 5,
    backgroundColor: white,
    width: width * 0.8,
    marginLeft: 20,
    marginTop: 2,
  },

  fieldView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fieldText: {
    marginLeft: 10,
    fontFamily: PoppinsRegular,
    marginTop: 3,
  },
  fieldMainView: {
    backgroundColor: lightgray,
    marginVertical: '1%',
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: Platform.OS == 'ios' ? 0.3 : 0.8,
    shadowRadius: 2,
    elevation: 5,
    fontSize: 16,
    width: width * 0.9,
    height: width * 0.12,
    borderRadius: 13,
  },
  fieldMainViewBig: {
    backgroundColor: lightgray,
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: Platform.OS == 'ios' ? 0.3 : 0.8,
    shadowRadius: 2,
    elevation: 5,
    fontSize: 16,
    width: width * 0.9,
    borderRadius: 13,
    // height: width * 0.36,
    // alignItems: 'center',
    marginTop: Platform.OS == 'android' ? height * 0.01 : height * 0.01,
  },
  placeholderStyle: {
    marginLeft: 15,
    color: black,
    fontSize: 12,
    width: width * 0.65,
    fontFamily: PoppinsRegular,
    marginTop: Platform.OS == 'android' ? 3 : 0,
    height: width * 0.12,
  },
  daysMainView: {
    backgroundColor: mainBackYellor,
    borderRadius: 10,
    height: height * 0.09,
    marginTop: 11,
    width: width * 0.5,
  },
  mainTextYellow: {
    color: mainColor,
    fontFamily: PoppinsSemiBold,
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
    // elevation: 5,
    height: width * 0.12,
    marginBottom: 15,
  },
  lastText: {
    fontSize: 13,
    fontFamily: PoppinsBold,
    color: white,
    marginTop: 3,
  },
  containerMain: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: white,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  okView: {
    backgroundColor: mainColor,
    borderRadius: 10,
    width: width * 0.37,
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 0.04,
    marginBottom: width * 0.1,
    marginTop: width * 0.05,
  },
  delteIconImg: {
    width: 25,
    height: 20,
    resizeMode: 'contain',
  },
  errorText: {
    fontFamily: PoppinsRegular,
    color: error,
    fontSize: 10,
    marginTop: 5,
  },
});
