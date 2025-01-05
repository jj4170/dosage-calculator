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
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useKeyboard from '../../component/UseKeyboard';
import {sumProperty} from '../../api/commonFunction';
import DatePickerDual from '../../component/DatePickerDual';
import Header from '../../component/Header';
import CalenderMainColor from '../../assets/img/CalendarMainColor.png';
import DropDownMain from '../../component/CustomDropDown';
import DropDownText from '../../component/DropDownText';
import GeneralStatusBarColor from '../../component/GenralStatusBar';
import {fetchResource, CryptoJSAesEncrypt} from '../../api/utils';
import {LoaderAnimated} from '../../component/Loader';
import toast from '../../common/Toast';
import moment from 'moment';
import NetInfo from '@react-native-community/netinfo';
import NoInernetScreen from './NoInternetScreen';
const {orangeBackground, DeleteIcon, AddIcon} = images;
const {white, black, lightgray, mediumGray, mainColor, mainBackYellor, error} =
  themeColor;
const {PoppinsSemiBold, PoppinsRegular, PoppinsBold, PoppinsMedium} =
  customFont;

export default function Calculator({route}) {
  const navigation = useNavigation();
  const isKeyboardOpen = useKeyboard();
  const [isMedicineLable, setMedicineLable] = useState('');
  const [isMedicineId, setMedicineId] = useState('');
  const [isTotalDose, setTotalDose] = useState('');
  const [isSelectionMode, setSelectionMode] = useState('kg');
  const [isError, setIsError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isMale, setMale] = useState(true);
  const [isMedicineArray, setMedicineArray] = useState('');
  const [isStartDatePicker, setOpenStartDatePicker] = useState(false);
  const calculatedData = route.params;
  const [formInputs, setFormInputs] = React.useState([]);
  const [isFrequency, setFrequency] = useState('');
  const [isFrequencyDropdown, setFrequencyDropdown] = useState(false);
  const [isStartDate, setStartDate] = useState('');
  const [isEndDate, setEndDate] = useState('');
  const [isDailyDose, setDailyDose] = useState('');
  const [ispatientDoseArray, setpatientDoseArray] = useState('');
  const [isHideView, setHideView] = useState(false);
  const [isHideMedicineThree, setHideMedicineThree] = useState(false);
  const [isHideSecondMedicine, setHideSecondMedicine] = useState(false);
  const [isHideMedicinefour, setHideMedicineFour] = useState(false);
  const [isPatientName, setPatientName] = useState('');
  const [ismgkg, setmgkg] = useState('');
  const [ismgkgEmpty, setmgkgEmpty] = useState(false);
  const [isSelectDoseLabel, setSelectDoseLabel] = useState(false);
  const [isSelectDoseId, setSelectDoseId] = useState(false);
  const [isSelectIndicationId, setSelectIndicationId] = useState('');
  const [isSelectIndicationLabel, setSelectIndicationLabel] = useState('');
  const [isdata_to_encrypt, setdata_to_encrypt] = useState('');
  //dropdown show
  const [isMedicineDropDown, setMedicineDropDown] = useState(false);
  const [isDoseDropDown, setDoseDropDown] = useState(false);
  const [isIndicationDropDown, setIndicationDropDown] = useState(false);
  const [isIndicationHideView, setIndicationHideView] = useState(false);
  const [isHideAddDosage, setHideAddDosage] = useState(false);
  //empty
  const [isWeightEmpty, setWeightEmpty] = useState(false);
  const [isMgEmpty, setMgEmpty] = useState(false);
  const [isTotalDoseEmpty, setTotalDoseEmpty] = useState(false);
  const [isPatientWeigth, setPatienteight] = useState('');
  const [isCalenderIndex, setCalenderIndex] = useState(false);
  const [isHideViewFrequency, setHideViewFrequency] = useState(true);
  const [isErrorindication, setIsErrorindication] = useState(false);
  const [isSelectDoseEmpty, setSelectDoseEmpty] = useState(false);
  const [isDoseEmptyLable, setDoseEmptyLable] = useState(false);
  const [isNetOffView, setNetOffView] = useState(false);
  const [isInternetConnect, setInternetConnect] = useState(false);

  const _weight = useRef();
  useEffect(() => {
    checkInternet();
  }, []);
  const checkInternet = () => {
    NetInfo.fetch().then(state => {
      if (state.isConnected == false) {
        setInternetConnect(true);
        setNetOffView(true);
        console.log('NO internet');
      } else {
        setInternetConnect(false);
        console.log('connected  internet');
        setNetOffView(false);
        if (calculatedData !== undefined) {
          let data = calculatedData.calculatedData;
          setPatienteight(data.PatientWeigth);
          setpatientDoseArray(data.patientDoseArray);
          setFormInputs(data.patientDoseArray2);
          setMedicineLable(data.MedicineLable);
          setMedicineId(data.MedicineId);
        }
        getData();
      }
    });
  };
  const getData = async () => {
    setLoading(true);
    try {
      const {status, message, data} = await fetchResource(
        {
          url: 'detail-list',
        },
        true,
      );
      if (status == 1) {
        if (data !== undefined) {
          let medicinData = data.medicine_list;
          let medicinearray = [];
          medicinData.map(i => {
            medicinearray.push({
              value: i.id,
              label: i.medicine_name,
            });
          });
          setLoading(false);
          setMedicineArray(medicinearray);
          // console.log('calulato data-->', medicinearray);
        }
      } else {
        setLoading(false);
        toast.danger({message: 'Something went wrong'});
      }
    } catch (e) {
      setLoading(false);
      toast.danger({message: 'Something went wrong'});
      console.log('error calulators->', e);
    }
  };

  //Set userId Input Values
  const inputHandleUserId1 = (text, key) => {
    setDailyDose(text);
    const _formNumberInputs = [...formInputs];
    _formNumberInputs[key].key = key;
    _formNumberInputs[key].daily_dose = text;
    setFormInputs(_formNumberInputs);
  };
  const inputHandleFrequency = (text, key) => {
    let textinput = text.label;
    const _formNumberInputs = [...formInputs];
    _formNumberInputs[key].key = key;
    _formNumberInputs[key].frequency = textinput;
    setFormInputs(_formNumberInputs);
  };
  const showFrequencyChange = (isShow, index) => {
    const _formNumberInputs = [...formInputs];
    _formNumberInputs[index].key = index;
    _formNumberInputs[index].isFrequencyShow = isShow;
    setFormInputs(_formNumberInputs);
    // console.log('frequency --->', _formNumberInputs);
  };
  //Add more inputs rows
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
      var l_daily_dose = l_dose.frequency;
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
    console.log('item -->', index, formInputs);
    setFormInputs(_formNumberInputs);
    return _formNumberInputs;
  };
  const naviagateToNextScreen = () => {
    if (isMedicineId == 1) {
      if (isPatientWeigth == '') {
        setLoading(false);
        if (isPatientWeigth == '') {
          setWeightEmpty(true);
        }
        if (isMedicineLable == '') {
          setIsError(true);
        }
      } else {
        getMgList();
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
        getMgList();
      }
    }
    if (isMedicineId == 3) {
      if (
        isSelectIndicationLabel == '' ||
        ismgkg == '' ||
        isPatientWeigth == ''
      ) {
        setLoading(false);
        if (ismgkg == '') {
          setmgkgEmpty(true);
        }
        if (isSelectIndicationLabel == '') {
          console.log(isSelectIndicationLabel);
          setIsErrorindication(true);
        }

        if (isPatientWeigth == '') {
          setWeightEmpty(true);
        }
      } else {
        if (ismgkg !== '') {
          if (ismgkg < 2.5 || ismgkg > 5) {
            // console.log('if--->', ismgkg);
            setLoading(false);
            setDoseEmptyLable(true);
          } else {
            getMgList();
            // console.log('false--->', ismgkg);
            setDoseEmptyLable(false);
          }
        }
      }
    }
  };
  const nextScreen = async () => {
    if (Platform.OS == 'ios') {
      setLoading(false);
    } else {
      setLoading(true);
    }
    if (isMedicineId !== '') {
      if (formInputs.length !== 0) {
        if (isMedicineId == 1) {
          const _inputs = [...formInputs];
          var l_dose = _inputs[_inputs.length - 1];
          var l_daily_dose = l_dose.frequency;
          if (l_daily_dose == '') {
            toast.info({message: 'Please fill Frequency Field'});
            setLoading(false);
          } else {
            setLoading(true);
            console.log('isLoading ', isLoading);
            naviagateToNextScreen();
          }
        } else {
          setLoading(true);
          naviagateToNextScreen();
        }
      } else {
        setLoading(true);
        naviagateToNextScreen();
      }
    } else {
      console.log('else-->');

      if (isMedicineLable == '') {
        setIsError(true);
        setLoading(false);
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
  const doseSelect = item => {
    setSelectDoseLabel(item.label);
    setSelectDoseId(item.value);
    setSelectDoseEmpty(false);
  };
  const indicationSelect = item => {
    setSelectIndicationLabel(item.label);
    setSelectIndicationId(item.value);
    setSelectDoseEmpty(false);
  };
  const getMgList = async data1 => {
    if (Platform.OS == 'ios') {
      setLoading(false);
    } else {
      setLoading(true);
    }
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

    let total_dosageAllArray = sumProperty(emptyArray, 'total_dosage');
    arr[0].data = emptyArray;
    let finalArr = JSON.stringify(arr[0]);

    // const body = new FormData();
    // body.append('medicine_id', isMedicineId);

    let data_to_encrypt = JSON.stringify({
      medicine_id: isMedicineId,
    });

    const encrypted_data = CryptoJSAesEncrypt(data_to_encrypt);
    let body = JSON.stringify(encrypted_data);

    const {status, token, message, data} = await fetchResource(
      {
        url: 'detail-list',
        body,
      },
      true,
    );

    if (status == 1) {
      if (isPatientName == '') {
        calulate_without_patientName(data, total_dosageAllArray, emptyArray);
        // console.log('name true-->');
      } else {
        const doctor_id = await AsyncStorage.getItem('@doctor_id');
        // const body = new FormData();
        // body.append('doctor_id', doctor_id);
        // body.append('name', isPatientName);

        if (isMedicineId == 1) {
          let data_to_encrypt = JSON.stringify({
            doctor_id: doctor_id,
            name: isPatientName,
            weight: isPatientWeigth,
            parameter: isSelectionMode,
            medicine_id: isMedicineId,
            indication: isSelectIndicationLabel,
            patient_dose: finalArr,
          });
          calulate_with_patientName(
            data,
            finalArr,
            total_dosageAllArray,
            data_to_encrypt,
          );
          // setdata_to_encrypt(data_to_encrypt);
          // console.log('data_to_encrypt edicine 1--->', isdata_to_encrypt);
          // body.append('weight', isPatientWeigth);
          // body.append('parameter', isSelectionMode);
          // body.append('medicine_id', isMedicineId);
          // body.append('indication', isSelectIndicationLabel);
          // body.append('patient_dose', finalArr);
        }
        if (isMedicineId == 2) {
          let data_to_encrypt = JSON.stringify({
            doctor_id: doctor_id,
            name: isPatientName,
            medicine_id: isMedicineId,
            dose_type: isSelectDoseLabel,
            indication: isSelectIndicationLabel,
          });
          // setdata_to_encrypt(data_to_encrypt);
          calulate_with_patientName(
            data,
            finalArr,
            total_dosageAllArray,
            data_to_encrypt,
          );
          // console.log('data_to_encrypt--->', isdata_to_encrypt);
          // body.append('medicine_id', isMedicineId);
          // body.append('dose_type', isSelectDoseLabel);
          // body.append('indication', isSelectIndicationLabel);
        }
        if (isMedicineId == 3) {
          let data_to_encrypt = JSON.stringify({
            doctor_id: doctor_id,
            name: isPatientName,
            medicine_id: isMedicineId,
            weight: isPatientWeigth,
            parameter: isSelectionMode,
            indication: isSelectIndicationLabel,
            mg: ismgkg,
          });
          calulate_with_patientName(
            data,
            finalArr,
            total_dosageAllArray,
            data_to_encrypt,
          );
          // setdata_to_encrypt(data_to_encrypt);
          // body.append('medicine_id', isMedicineId);
          // body.append('weight', isPatientWeigth);
          // body.append('parameter', isSelectionMode);
          // body.append('indication', isSelectIndicationLabel);
          // body.append('mg', ismgkg);
        }

        // console.log('name empty-->');
      }
      // setLoading(false);
    } else {
      setLoading(false);
      toast.danger({message: 'Something went wrong'});
      console.log('error login->', e);
    }
  };
  const calulate_without_patientName = (
    data,
    total_dosageAllArray,
    emptyArray,
  ) => {
    // console.log('total --->', data);
    // console.log('total_dosageAllArray --->', total_dosageAllArray);
    // console.log('emptyArray --->', emptyArray);

    if (isMedicineId == 1) {
      // console.log('total --->', data);
      let mg_list = data.MgList_list;
      let dose_list = data.dosage_list;
      setLoading(false);
      navigation.replace('ResultCalculator', {
        isCalculator: true,
        mgList: mg_list,
        doseList: dose_list,
        PatientWeigth: isPatientWeigth,
        total_dosageAllArray: total_dosageAllArray,
        patientDoseArray: formInputs,
        patientDoseArray2: ispatientDoseArray,
        MedicineLable: isMedicineLable,
        MedicineId: isMedicineId,
        frequency: isFrequency,
        patient_dose: emptyArray,
        PatientName: isPatientName,
      });
      setLoading(false);
      // toast.success({message: message});
    }
    if (isMedicineId == 2) {
      setLoading(false);
      navigation.replace('ResultStatement', {
        data: data,
        isMedicineID: 'two',
        doseType: isSelectDoseLabel,
      });
    }
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
        var final = isPatientWeigth * ismgkg;
        var final2 = final / 2;
        navigation.replace('ResultStatement', {
          data: final2,
          isMedicineID: 'three',
          doseType: isSelectIndicationLabel,
          note: data,
        });
      }
    }
    setLoading(false);
  };
  const calulate_with_patientName = async (
    data1,
    finalArr,
    total_dosageAllArray,
    data_to_encrypt,
  ) => {
    // setLoading(true);

    const encrypted_data = CryptoJSAesEncrypt(data_to_encrypt);
    let body = JSON.stringify(encrypted_data);

    try {
      const {status, message, data} = await fetchResource(
        {
          url: 'patient-add',
          body,
        },
        true,
      );
      console.log('add patient data  ->', data, status, message);
      if (status == 1) {
        toast.success({message: message});
        if (isMedicineId == 3) {
          // setLoading(false);
          if (ismgkg < 2.5 || ismgkg > 5) {
            // setLoading(false);
            console.log('is mmgp0000--->');
            if (ismgkg < 2.5) {
              setDoseEmptyLable(true);
            } else {
              setDoseEmptyLable(false);
            }
            setmgkgEmpty(false);
          } else {
            console.log('m 3 else->');
            calulate_without_patientName(data1, total_dosageAllArray, finalArr);
          }
        } else {
          setLoading(false);
          console.log('else->');
          calulate_without_patientName(data1, total_dosageAllArray, finalArr);
        }
      } else {
        setLoading(false);
        toast.danger({message: message});
        console.log('add patient error  ->');
      }
    } catch (e) {
      setLoading(false);
      console.log('add patient error catch  --->');
      toast.danger({message: 'Something went wrong'});
    }
  };
  const calenderOK = async key => {
    setOpenStartDatePicker(false);
    const totalDays = await AsyncStorage.getItem('@totalDays');
    const startDate = await AsyncStorage.getItem('@startDate');
    const ednDate = await AsyncStorage.getItem('@endDate');
    // console.log('ednDate --->', ednDate);

    const s_date = moment(JSON.parse(startDate)).format('DD-MM-YYYY');
    const e_date = moment(JSON.parse(ednDate)).format('DD-MM-YYYY');

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
  const medicineSelect = item => {
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
      setIndicationDropDown(false);
      setHideSecondMedicine(true);
      setHideView(false);
      setHideViewFrequency(false);
      setHideMedicineThree(false);
      setHideMedicineFour(false);
      setSelectIndicationLabel('Psoriasis');
    }
    if (item.value == '3') {
      setIndicationDropDown(false);
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
  const closeDropDown = () => {
    setMedicineDropDown(false);
    setDoseDropDown(false);
    setIndicationDropDown(false);
    setIndicationHideView(false);
  };
  return (
    <>
      <GeneralStatusBarColor
        backgroundColor={'#ffa448'}
        // barStyle="dark-content"
      />
      <SafeAreaView style={{flex: 1, backgroundColor: white}}>
        <LoaderAnimated visible={isLoading} />

        <View>
          <ImageBackground
            source={orangeBackground}
            resizeMode="cover"
            style={{height: height, width: width}}>
            <Header text={'Calculator'} />

            <View
              onStartShouldSetResponder={() => closeDropDown()}
              style={styles.containerMain}
              keyboardShouldPersistTaps={'always'}>
              {isNetOffView == true ? (
                <NoInernetScreen onPress={checkInternet} />
              ) : (
                <ScrollView
                  onScroll={() => closeDropDown()}
                  keyboardShouldPersistTaps={'always'}
                  keyboardDismissMode="none"
                  onStartShouldSetResponder={() => closeDropDown()}
                  style={{
                    marginBottom: Platform.OS == 'ios' ? height * 0.2 : 13,
                  }}>
                  <TouchableWithoutFeedback onScroll={() => closeDropDown()}>
                    <View
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
                            marginTop: Platform.OS == 'ios' ? height * 0.01 : 3,
                          },
                        ]}>
                        <TextInput
                          style={[
                            styles.placeholderStyle,
                            {
                              marginTop:
                                Platform.OS == 'ios' ? height * 0.015 : 3,
                            },
                          ]}
                          value={isPatientName}
                          placeholder="Enter Patient Name"
                          placeholderTextColor={'#cfcfcf'}
                          onChangeText={name => {
                            closeDropDown();
                            setPatientName(name);
                          }}
                          autoFocus
                          keyboardType="email-address"
                        />
                      </View>
                      <View
                        style={{
                          alignItems: 'flex-start',
                          width: width * 0.95,
                          marginTop:
                            Platform.OS == 'ios'
                              ? height * 0.015
                              : height * 0.01,
                        }}>
                        <View style={styles.fieldView}>
                          <Text style={styles.fieldText}>Select Medicine</Text>
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
                              top: 2,
                            }}
                            textStyle={{width: width * 0.76}}
                            style1={styles.dropDownMain}
                            data={isMedicineArray}
                            value={isMedicineLable}
                            onSelect={item => {
                              setIsError(false);
                              setMedicineLable(item.label);
                              setMedicineId(item.value);
                              medicineSelect(item);
                              setIndicationHideView(false);
                              setMedicineDropDown(false);
                            }}
                            isError={isError}
                            showOption={isMedicineDropDown}
                          />
                          {/* </View> */}
                        </View>
                      ) : (
                        <View
                          style={{
                            width: width,
                            alignItems: 'center',
                          }}>
                          <DropDownText
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
                            isError={isError}
                          />
                          <DropDownMain
                            text={
                              isMedicineLable == ''
                                ? 'Select Medicine'
                                : isMedicineLable
                            }
                            style={{
                              width: width * 0.9,
                              top: 2,
                            }}
                            textStyle={{width: width * 0.76}}
                            style1={styles.dropDownMain}
                            data={isMedicineArray}
                            value={isMedicineLable}
                            onSelect={item => {
                              setIsError(false);
                              setMedicineLable(item.label);
                              setMedicineId(item.value);
                              medicineSelect(item);
                              setMedicineDropDown(false);
                            }}
                            isError={isError}
                            showOption={isMedicineDropDown}
                          />
                        </View>
                      )}

                      {isHideView == true ? (
                        <View style={{alignItems: 'center', width: width}}>
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
                              // <View
                              //   style={{
                              //     alignItems: 'center',
                              //     height: width * 0.05,
                              //   }}>
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
                                }}
                              />
                            ) : (
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
                                style={{
                                  width: width * 0.9,
                                  top: Platform.OS == 'ios' ? 2 : 2,
                                  zIndex: 9999,
                                  height: height * 0.06,
                                }}
                                textStyle={{width: width * 0.74}}
                                style1={styles.dropDownMain}
                                data={dataMedicie1}
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
                                isSelectIndicationLabel == ''
                                  ? 'Select Indication'
                                  : isSelectIndicationLabel
                              }
                              style={{
                                width: width * 0.9,
                                top: Platform.OS == 'ios' ? 2 : 2,
                                zIndex: 9999,
                                height: height * 0.08,
                              }}
                              textStyle={{width: width * 0.74}}
                              style1={styles.dropDownMain}
                              data={dataMedicie1}
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
                                  : height * 0.0,
                            }}>
                            <View style={styles.fieldView}>
                              <Text style={styles.fieldText}>
                                Patient Weight
                              </Text>
                            </View>
                          </View>
                          <View
                            style={[
                              styles.fieldMainView,
                              {
                                flexDirection: 'row',
                                alignItems: 'center',
                                borderColor:
                                  isWeightEmpty == true ? error : null,
                                borderWidth: isWeightEmpty == true ? 1 : 0,
                                marginTop:
                                  Platform.OS == 'android'
                                    ? height * 0.0
                                    : height * 0.01,
                              },
                            ]}>
                            <TextInput
                              style={[
                                styles.placeholderStyle,
                                {width: width * 0.4},
                              ]}
                              placeholder={'Add Weight'}
                              placeholderTextColor={'#cfcfcf'}
                              onChangeText={weight => {
                                setPatienteight(weight);
                                setWeightEmpty(false);
                              }}
                              keyboardType={'numeric'}
                              value={isPatientWeigth}
                              autoFocus
                              autoCapitalize="none"
                              editable={isHideView == false ? false : true}
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
                                onPress={() => {
                                  closeDropDown();
                                  setSelectionMode('kg');
                                }}
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
                                  closeDropDown();
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
                        </View>
                      ) : null}

                      {isHideView == true ? (
                        <View style={{width: width, alignItems: 'center'}}>
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
                                marginTop:
                                  Platform.OS == 'android'
                                    ? height * 0.0
                                    : height * 0.015,
                              },
                            ]}>
                            <View
                              style={{
                                width: width * 0.5,
                                marginLeft: 18,
                                flexDirection: 'row',
                                marginTop: 10,
                              }}>
                              <Text style={{width: width * 0.5}}>
                                Total Dosage days
                              </Text>
                              <Text>Daily Dose(mg)</Text>
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
                                      style={[
                                        styles.submitFormRow,
                                        {
                                          marginTop:
                                            Platform.OS == 'ios'
                                              ? height * 0.02
                                              : height * 0.0,
                                        },
                                      ]}>
                                      <View
                                        style={[
                                          {
                                            alignitems: 'flex-start',
                                          },
                                        ]}>
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
                                              {item.day == ''
                                                ? 'Days'
                                                : item.day}{' '}
                                              {item.day == ''
                                                ? null
                                                : item.day == '1'
                                                ? 'Day'
                                                : 'Days'}
                                            </Text>

                                            <TouchableOpacity
                                              onPress={() => {
                                                setTotalDoseEmpty(false);
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
                                                    },
                                                  ]}>
                                                  TO{'  '}
                                                  {(item.end_date == '' &&
                                                    'End Date') ||
                                                    (item.end_date ==
                                                      'Invalid date' &&
                                                      'End Date') ||
                                                    item.end_date}
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
                                                    setTotalDoseEmpty(false);
                                                    inputHandleUserId1(
                                                      dose,
                                                      index,
                                                    );
                                                  }}
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
                                                    width: width * 0.9,
                                                    alignItems: 'center',
                                                  }}>
                                                  <DatePickerDual />
                                                  <TouchableOpacity
                                                    activeOpacity={0.8}
                                                    style={styles.okView}
                                                    onPress={() => {
                                                      calenderOK(index);
                                                    }}>
                                                    <Text
                                                      style={{
                                                        color: white,
                                                        fontFamily:
                                                          PoppinsMedium,
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
                                            // zIndex: 9999,
                                            // height:
                                            //   Platform.OS == 'ios'
                                            //     ? height * 0.0
                                            //     : height * 0.05,
                                            width: width * 0.83,
                                            alignItems: 'center',
                                          }}>
                                          {Platform.OS == 'ios' ? (
                                            // <View
                                            //   style={{
                                            //     // height: height * 0.05,
                                            //     // width: width * 0.83,
                                            //     // alignItems: 'center',
                                            //     // position: 'absolute'
                                            //     // zIndex: 9999,
                                            //   }}>
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
                                                zIndex: 9999,
                                                // marginLeft: 20,
                                                width: width,
                                                // height: width * 0.1,
                                                alignItems: 'center',
                                                // position: 'absolute',
                                                // top: 25,
                                                // marginTop: 35,
                                              }}>
                                              <DropDownMain
                                                text={
                                                  isFrequency == ''
                                                    ? 'Select Frequency'
                                                    : isFrequency
                                                }
                                                style={{
                                                  width: width * 0.8,
                                                  // zIndex: 9999,
                                                  marginLeft: 20,
                                                  backgroundColor: 'white',
                                                  elevation: 1,
                                                  height: height * 0.08,
                                                }}
                                                onDropdownSelect={() => {
                                                  setFrequencyDropdown(true);
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
                                                  setFrequency(item.label);
                                                  inputHandleFrequency(
                                                    item,
                                                    index,
                                                  );
                                                }}
                                                isError={isError}
                                                showOption={
                                                  item.isFrequencyShow
                                                }
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
                                                  isFrequency == ''
                                                    ? 'Select Frequency'
                                                    : isFrequency
                                                }
                                                style={{
                                                  width: width * 0.8,
                                                  top: 2,
                                                  marginLeft: 20,
                                                  backgroundColor: 'white',
                                                  elevation: 1,
                                                }}
                                                onDropdownSelect={() => {
                                                  setFrequencyDropdown(true);
                                                  inputHandleFrequency(
                                                    item,
                                                    index,
                                                  );
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
                                                  setFrequency(item.label);
                                                  inputHandleFrequency(
                                                    item,
                                                    index,
                                                  );
                                                }}
                                                isError={isError}
                                                showOption={
                                                  item.isFrequencyShow
                                                }
                                              />
                                            </View>
                                          )}
                                        </View>
                                      </View>
                                    </View>
                                  ))
                                : null}
                              {/* {isHideAddDosage == true ? (
                                <View style={{height: width * 0.26}}></View>
                              ) : (
                              )} */}
                              {/* <View> */}
                              <TouchableOpacity
                                activeOpacity={0.8}
                                style={[
                                  styles.lastView,
                                  {
                                    flexDirection: 'row',
                                    height: width * 0.11,
                                    marginLeft: width * 0.06,
                                    marginTop:
                                      Platform.OS == 'ios'
                                        ? height * 0.11
                                        : height * 0.06,
                                    // zIndex: 9999,
                                  },
                                ]}
                                onPress={() => {
                                  closeDropDown();
                                  handleAddMoreLine1();
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
                              {/* </View> */}
                            </View>
                          </View>
                        </View>
                      ) : null}
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
                                    setIndicationDropDown(
                                      !isIndicationDropDown,
                                    );
                                    setMedicineDropDown(false);
                                  } else {
                                    setIndicationDropDown(
                                      !isIndicationDropDown,
                                    );
                                  }
                                  if (isDoseDropDown == true) {
                                    setDoseDropDown(false);
                                    setIndicationDropDown(
                                      !isIndicationDropDown,
                                    );
                                  } else {
                                    setIndicationDropDown(
                                      !isIndicationDropDown,
                                    );
                                  }
                                }}
                              />
                            ) : (
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
                                    setIndicationDropDown(
                                      !isIndicationDropDown,
                                    );
                                    setMedicineDropDown(false);
                                  } else {
                                    setIndicationDropDown(
                                      !isIndicationDropDown,
                                    );
                                  }
                                  if (isDoseDropDown == true) {
                                    setDoseDropDown(false);
                                    setIndicationDropDown(
                                      !isIndicationDropDown,
                                    );
                                  } else {
                                    setIndicationDropDown(
                                      !isIndicationDropDown,
                                    );
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
                              {/* <DropDownText
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
                                    setIndicationDropDown(
                                      !isIndicationDropDown,
                                    );
                                    setMedicineDropDown(false);
                                  } else {
                                    setIndicationDropDown(
                                      !isIndicationDropDown,
                                    );
                                  }
                                  if (isDoseDropDown == true) {
                                    setDoseDropDown(false);
                                    setIndicationDropDown(
                                      !isIndicationDropDown,
                                    );
                                  } else {
                                    setIndicationDropDown(
                                      !isIndicationDropDown,
                                    );
                                  }
                                }}
                              /> */}
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
                                    : height * 0.0,
                              }}>
                              <View style={styles.fieldView}>
                                <Text style={styles.fieldText}>
                                  Select Dose
                                </Text>
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
                                      setIndicationDropDown(false);
                                      setDoseDropDown(!isDoseDropDown);
                                    } else {
                                      setDoseDropDown(!isDoseDropDown);
                                    }
                                  }}
                                />
                                <DropDownMain
                                  text={
                                    isSelectDoseLabel == ''
                                      ? 'Select Dose'
                                      : isSelectDoseLabel
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
                                    setDoseDropDown(false);
                                    doseSelect(item);
                                  }}
                                  isError={isSelectDoseEmpty}
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
                                    isSelectDoseLabel == ''
                                      ? 'Select Dose'
                                      : isSelectDoseLabel
                                  }
                                  style={{
                                    width: width * 0.9,
                                    top: Platform.OS == 'ios' ? 2 : 2,
                                    zIndex: 9999,
                                    height: width * 0.22,
                                  }}
                                  textStyle={{width: width * 0.74}}
                                  style1={styles.dropDownMain}
                                  data={dataMedcine2}
                                  value={isSelectDoseLabel}
                                  onSelect={item => {
                                    setDoseDropDown(false);
                                    doseSelect(item);
                                  }}
                                  isError={isSelectDoseEmpty}
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
                                text={
                                  isSelectIndicationLabel == ''
                                    ? 'Select Indication'
                                    : isSelectIndicationLabel
                                }
                                value={isSelectIndicationLabel}
                                isError={isErrorindication}
                                onPress={() => {
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
                                  if (isDoseDropDown == true) {
                                    setDoseDropDown(false);
                                    setIndicationDropDown(
                                      !isIndicationDropDown,
                                    );
                                  } else {
                                    setIndicationDropDown(
                                      !isIndicationDropDown,
                                    );
                                  }
                                }}
                              />
                            ) : (
                              <DropDownText
                                text={
                                  isSelectIndicationLabel == ''
                                    ? 'Select Indication'
                                    : isSelectIndicationLabel
                                }
                                isError={isErrorindication}
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
                                    setIndicationDropDown(
                                      !isIndicationDropDown,
                                    );
                                    setMedicineDropDown(false);
                                  } else {
                                    setIndicationDropDown(
                                      !isIndicationDropDown,
                                    );
                                  }
                                  if (isDoseDropDown == true) {
                                    setDoseDropDown(false);
                                    setIndicationDropDown(
                                      !isIndicationDropDown,
                                    );
                                  } else {
                                    setIndicationDropDown(
                                      !isIndicationDropDown,
                                    );
                                  }
                                }}
                              />
                            )
                          ) : (
                            <View
                              style={{
                                height:
                                  Platform.OS == true
                                    ? width * 0.14
                                    : width * 0.13,
                              }}>
                              <Text>null</Text>
                            </View>
                          )}
                          {Platform.OS == 'ios' ? (
                            <View
                              style={{
                                height: width * 0.02,
                                zIndex: 9999,
                                alignItems: 'center',
                              }}>
                              {/* <DropDownText
                                text={
                                  isSelectIndicationLabel == ''
                                    ? 'Select Indication'
                                    : isSelectIndicationLabel
                                }
                                value={isSelectIndicationLabel}
                                onPress={() => {
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
                                  if (isDoseDropDown == true) {
                                    setDoseDropDown(false);
                                    setIndicationDropDown(
                                      !isIndicationDropDown,
                                    );
                                  } else {
                                    setIndicationDropDown(
                                      !isIndicationDropDown,
                                    );
                                  }
                                }}
                              /> */}
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
                                  : height * 0.01,
                            }}>
                            <View style={styles.fieldView}>
                              <Text
                                style={[
                                  styles.fieldText,
                                  {
                                    marginTop:
                                      Platform.OS == 'android'
                                        ? height * 0.0
                                        : height * 0.0,
                                  },
                                ]}>
                                Patient Weight
                              </Text>
                            </View>
                          </View>
                          <View
                            style={[
                              styles.fieldMainView,
                              {
                                flexDirection: 'row',
                                alignItems: 'center',
                                borderColor:
                                  isWeightEmpty == true ? error : null,
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
                                  : height * 0.025,
                            }}>
                            <View style={styles.fieldView}>
                              <Text style={styles.fieldText}>
                                Preferred dose in mg/kg
                              </Text>
                            </View>
                          </View>
                          <View
                            style={{
                              height: width * 0.12,
                              zIndex: 9999,
                              width: width,
                              alignItems: 'center',
                            }}>
                            <View
                              style={[
                                styles.fieldMainView,
                                {
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  marginTop:
                                    Platform.OS == 'ios'
                                      ? height * 0.01
                                      : height * 0.0,
                                  borderColor:
                                    ismgkgEmpty == true ? error : null,
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
                                  closeDropDown();
                                  mgkgValidation(dose);
                                }}
                                // autoFocus
                                keyboardType={'numeric'}
                                // autoCapitalize="none"
                              />
                              <Text>mg/kg</Text>
                            </View>
                          </View>
                          {/* {isDoseEmptyLable == true ? ( */}
                          <View
                            style={{
                              marginTop:
                                Platform.OS == 'ios'
                                  ? height * 0.01
                                  : height * 0.0,
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
                                Submit
                              </Text>
                            </View>
                          </View>
                        ) : (
                          <View style={{width: width, alignItems: 'center'}}>
                            <TouchableOpacity
                              style={[
                                styles.lastView,
                                {
                                  marginBottom:
                                    Platform.OS == 'ios' ? height * 0.2 : 13,
                                },
                              ]}
                              onPress={() => {
                                closeDropDown();
                                nextScreen();
                              }}>
                              <Text style={styles.lastText}>Submit</Text>
                            </TouchableOpacity>
                          </View>
                        )}
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                </ScrollView>
              )}
            </View>
          </ImageBackground>
        </View>
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
  dropDownMain: {
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: Platform.OS == 'ios' ? 0.4 : 0.8,
    shadowRadius: 2,
    elevation: Platform.OS == 'ios' ? 0 : 5,
  },
  dropDownStyle: {
    backgroundColor: lightgray,
    width: width * 0.9,
    height: width * 0.12,
    alignItems: 'center',
    borderRadius: 12,
    marginTop: 8,
    flexDirection: 'row',
    // zIndex: 999999,
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
    marginTop: Platform.OS == 'android' ? 3 : height * 0.0,
  },
  fieldMainView: {
    backgroundColor: lightgray,
    marginVertical: '1%',
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: Platform.OS == 'ios' ? 0.4 : 0.8,
    shadowRadius: 2,
    elevation: 5,
    fontSize: 16,
    width: width * 0.9,
    borderRadius: 13,
    height: width * 0.12,
  },
  fieldMainViewBig: {
    backgroundColor: lightgray,
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: Platform.OS == 'ios' ? 0.4 : 0.8,
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
    marginTop: Platform.OS == 'ios' ? height * 0.0 : 3,
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
    // shadowColor: mainColor,
    // shadowOffset: {width: 1, height: 1},
    // shadowOpacity: 0.8,
    // shadowRadius: 2,
    // elevation: 5,
    height: width * 0.12,
    marginBottom: 13,
    // zIndex: 9999,
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
