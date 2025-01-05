import React, {useState, useEffect, useRef, useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {sumProperty} from '../../api/commonFunction';
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
import useKeyboard from '../../component/UseKeyboard';
import {AppContext} from '../../container/ContextProvider';

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
import Header from '../../component/Header';
import CalenderMainColor from '../../assets/img/CalendarMainColor.png';
import DropDownMain from '../../component/CustomDropDown';
import DropDownText from '../../component/DropDownText';
import GeneralStatusBarColor from '../../component/GenralStatusBar';
import {fetchResource, CryptoJSAesEncrypt} from '../../api/utils';
import {LoaderAnimated} from '../../component/Loader';
import toast from '../../common/Toast';
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
  darkGray,
} = themeColor;
const {
  PoppinsBlack,
  PoppinsSemiBold,
  PoppinsRegular,
  PoppinsBold,
  PoppinsMedium,
} = customFont;
export default function PatientDetail({route}) {
  const navigation = useNavigation();
  const patientDetail = route.params;
  const {isPatientUpdate, setPatientUpdate} = useContext(AppContext);
  const [isMedicineLable, setMedicineLable] = useState('');
  const isKeyboardOpen = useKeyboard();
  const [isMedicineId, setMedicineId] = useState('');

  const [isMedicineId2, setMedicineId2] = useState('');

  const [isKgPound, setKgPound] = useState(true);
  const [isPatientDetail, setPatientDetail] = useState('');
  const [isPatientName, setPatientName] = useState('');
  const [isSelectionMode, setSelectionMode] = useState('');
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
  const [startDate1, setStartDate1] = useState(false);
  const [endDate1, setEndDate1] = useState('');

  const [isSelectDoseLabel, setSelectDoseLabel] = useState(false);
  const [isSelectDoseId, setSelectDoseId] = useState(false);
  const [isSelectIndicationId, setSelectIndicationId] = useState('');
  const [isSelectIndicationLabel, setSelectIndicationLabel] = useState('');
  const [ismgkg, setmgkg] = useState('');
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
  const [isMgEmpty, setMgEmpty] = useState(false);
  const [isTotalDoseEmpty, setTotalDoseEmpty] = useState(false);
  const [isErrorFrequency, setErrorFrequency] = useState(false);
  const [isHideView, setHideView] = useState(false);
  const [isHideViewFrequency, setHideViewFrequency] = useState(true);
  const [isFrequency, setFrequency] = useState('');
  const [isErrorindication, setIsErrorindication] = useState(false);
  const [isHideMedicineThree, setHideMedicineThree] = useState(false);
  const [isHideSecondMedicine, setHideSecondMedicine] = useState(false);
  const [isSelectDoseEmpty, setSelectDoseEmpty] = useState(false);
  const [ismgkgEmpty, setmgkgEmpty] = useState(false);
  const [isDoseEmptyLable, setDoseEmptyLable] = useState(false);
  const [isHideMedicinefour, setHideMedicineFour] = useState(false);

  // for add view
  const [formInputs, setFormInputs] = React.useState([]);
  const [isCalenderIndex, setCalenderIndex] = useState(false);
  const _weight = useRef();
  // for add view
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
  useEffect(() => {
    if (patientDetail !== undefined) {
      setLoading(true);
      let data = patientDetail.data;
      if (data.frequency !== null) {
        setFrequency(data.frequency);
      }
      if (data.medicine_id == 1) {
        setHideView(true);
        setHideViewFrequency(false);
        setSelectIndicationLabel(data.indication);
      }
      if (data.medicine_id == 2) {
        setHideView(false);
        setHideViewFrequency(false);
        setHideSecondMedicine(true);
        setSelectDoseLabel(data.dose_type);
        setSelectIndicationLabel(data.indication);
      }
      if (data.medicine_id == 3) {
        setSelectIndicationLabel(data.indication);
        setHideViewFrequency(false);
        setHideMedicineThree(true);
        setmgkg(data.mg);
      }
      if (data.patient_dose.length !== 0) {
        var l_fre = data.patient_dose;
        var l_fre2 = l_fre[l_fre.length - 1];
        var l_fre3 = l_fre2.frequency;
        setFrequency(l_fre3);
      }

      setpatientDoseArray(data.patient_dose);
      setmgkg(data.mg);
      setMedicineId(data.medicine_id);
      setMedicineId2(data.medicine_id);
      setPatientName(data.name);
      var currentDate = moment(new Date()).format('YYYY-MM-DD');
      setStartDate1(currentDate);
      setEndDate1(currentDate);
      getData(data);
    } else {
      getMedicineList();
      setPatientDetail('');
      setSelectionMode('');
      setTotalDose('');
      setStartDate('');
      setEndDate('');
      setPatienteight('');
    }
  }, []);
  const mgkgValidation = item => {
    let data = patientDetail.data;
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
    setFrequency(textinput);
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
    console.log('frequency --->', _formNumberInputs);
  };
  const onDeletePush = (index, isFormInput) => {
    const _formNumberInputs = [...formInputs];
    _formNumberInputs.splice(index, 1);
    setFormInputs(_formNumberInputs);
    // console.log('item -->', index, formInputs);

    return _formNumberInputs;
  };
  const onDeleteApiCall = async (index, item) => {
    setLoading(true);
    let dose_id = item.id;
    let patient_id = item.patient_id;

    const body = new FormData();
    body.append('patient_dose_id', dose_id);
    body.append('patient_id', patient_id);
    try {
      const {status, message, data} = await fetchResource(
        {
          url: 'patient-dose-delete',
          body,
        },
        true,
      );
      if (status == 1) {
        toast.success({message: message});
        setpatientDoseArray(data);
        setLoading(false);
      } else {
        setLoading(false);
        toast.danger({message: message});
      }
    } catch (e) {
      setLoading(false);
      toast.danger({message: 'Something went wrong'});
      // console.log('error ->', e);
    }
  };
  //renderview modal
  const [isDateInput, setDateINput] = useState([
    {label: 'New label', show: false},
  ]);
  const [isDateData, setDateData] = useState([]);

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
  const getData = data => {
    setPatientDetail(data);
    let k1 = data.parameter;
    setSelectionMode(k1);
    getMedicineList(data);
    setTotalDose(data.day);
    var start_date = moment(data.start_date).format('MM-DD-YYYY');
    var end_date = moment(data.end_date).format('MM-DD-YYYY');
    setStartDate(start_date);
    setEndDate(end_date);
    let weight = data.weight;
    setPatienteight(weight);
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
        goNextScreen();
      }
    }
    if (isMedicineId == '2') {
      setLoading(false);
      if (isSelectDoseLabel == '') {
        if (isSelectDoseLabel == '') {
          setSelectDoseEmpty(true);
        }
        if (isMedicineLable == '') {
          setIsErrorindication(true);
        }
      } else {
        goNextScreen();
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
          console.log('is mgkg  -->');
          setmgkgEmpty(true);
        }
        if (isSelectIndicationLabel == '') {
          setIsErrorindication(true);
        }
        if (isPatientWeigth == '') {
          console.log('isPatientWeigth  -->', isPatientWeigth);
          setWeightEmpty(true);
        }
      } else {
        if (ismgkg !== '') {
          if (ismgkg < 2.5 || ismgkg > 5) {
            setDoseEmptyLable(true);
            setLoading(false);
          } else {
            goNextScreen();
            setDoseEmptyLable(false);
          }
        }
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
            setLoading(false);
          } else {
            setLoading(true);
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
      if (isMedicineLable == '') {
        setIsError(true);
        setmgkgEmpty(false);
        setLoading(false);
      }
    }
  };

  const goNextScreen = async () => {
    // setLoading(true);
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
    // console.log('hieeehh---->', finalArr);
    let patient_id = patientDetail.data.id;
    let remaining_dosage = patientDetail.data.remaining_dosage;

    // const body = new FormData();
    // body.append('patient_id', patient_id);
    // body.append('name', isPatientName);

    if (isMedicineId == 1) {
      let data_to_encrypt = JSON.stringify({
        patient_id: patient_id,
        name: isPatientName,
        weight: isPatientWeigth,
        parameter: isSelectionMode,
        medicine_id: isMedicineId,
        indication: isSelectIndicationLabel,
        patient_dose: finalArr,
        remaining_dosage: remaining_dosage,
        frequency: isFrequency,
      });
      apicall_update_patient(data_to_encrypt, emptyArray);
      // body.append('weight', isPatientWeigth);
      // body.append('parameter', isSelectionMode);
      // body.append('medicine_id', isMedicineId);
      // body.append('indication', isSelectIndicationLabel);
      // body.append('patient_dose', finalArr);
    }
    if (isMedicineId == 2) {
      let data_to_encrypt = JSON.stringify({
        patient_id: patient_id,
        name: isPatientName,
        medicine_id: isMedicineId,
        dose_type: isSelectDoseLabel,
        indication: isSelectIndicationLabel,
        remaining_dosage: remaining_dosage,
        patient_dose: '',
      });
      apicall_update_patient(data_to_encrypt, emptyArray);
      // body.append('medicine_id', isMedicineId);
      // body.append('dose_type', isSelectDoseLabel);
      // body.append('indication', isSelectIndicationLabel);
    }
    if (isMedicineId == 3) {
      let data_to_encrypt = JSON.stringify({
        patient_id: patient_id,
        name: isPatientName,
        medicine_id: isMedicineId,
        weight: isPatientWeigth,
        parameter: isSelectionMode,
        indication: isSelectIndicationLabel,
        mg: ismgkg,
        remaining_dosage: remaining_dosage,
        // patient_dose: finalArr,
        // frequency: isFrequency,
      });
      apicall_update_patient(data_to_encrypt, emptyArray);
      // body.append('medicine_id', isMedicineId);
      // body.append('weight', isPatientWeigth);
      // body.append('parameter', isSelectionMode);
      // body.append('indication', isSelectIndicationLabel);
      // body.append('mg', ismgkg);
    }
    // if (isMedicineId == 2) {
    //   body.append('patient_dose', '');
    // } else {
    //   body.append('patient_dose', finalArr);
    //   body.append('frequency', isFrequency);
    // }
    // body.append('remaining_dosage', remaining_dosage);
  };
  const apicall_update_patient = async (data_to_encrypt, emptyArray) => {
    const encrypted_data = CryptoJSAesEncrypt(data_to_encrypt);
    let body = JSON.stringify(encrypted_data);

    try {
      const {status, message, data} = await fetchResource(
        {
          url: 'patient-update',
          body,
        },
        true,
      );
      // console.log('update -->', data, message, status);
      if (status == 1) {
        if (isMedicineId == 3) {
          setLoading(false);
          if (ismgkg < 2.5 || ismgkg > 5) {
            console.log('if 1-->');
            if (ismgkg < 2.5) {
              setDoseEmptyLable(true);
            } else {
              setDoseEmptyLable(false);
            }
            setmgkgEmpty(false);
          } else {
            getMgList(emptyArray);
          }
        } else {
          getMgList(emptyArray);
        }
      } else {
        setLoading(false);
        toast.danger({message: message});
      }
    } catch (e) {
      setLoading(false);
      toast.danger({message: 'Something went wrong'});
      console.log('patient-update   ->', e);
    }
  };
  const getMgList = async finalArr => {
    console.log('array  update  -->', finalArr);
    var arrEmpty = [];
    ispatientDoseArray.map(i => {
      arrEmpty.push({
        created_at: i.created_at,
        daily_dose: i.daily_dose,
        day: i.day,
        deleted_at: i.deleted_at,
        end_date: i.end_date,
        id: i.id,
        patient_id: i.patient_id,
        start_date: i.start_date,
        total_dosage: i.day * i.daily_dose,
        updated_at: i.updated_at,
      });
    });
    // if (isMedicineId == 2) {
    // } else {

    // }
    let total_dosageAllArray = sumProperty(finalArr, 'total_dosage');
    console.log('array  update  -->', total_dosageAllArray);
    let total_dosageAllArray1 = sumProperty(ispatientDoseArray, 'total_dosage');
    let sumDaily_dose = total_dosageAllArray + total_dosageAllArray1;

    var arr = [{data: []}];
    let emptyArray = [];
    // for remove key parameter from array
    ispatientDoseArray.map(item => {
      emptyArray.push({
        day: item.day,
        start_date: item.start_date,
        end_date: item.end_date,
        daily_dose: item.daily_dose,
        total_dosage: item.day * item.daily_dose * item.frequency,
        frequency: item.frequency,
      });
    });
    arr[0].data = emptyArray;

    let finalArr1 = JSON.stringify(arr[0]);
    console.log('finalArr one-->', finalArr1);
    // const body = new FormData();
    // body.append('medicine_id', isMedicineId);
    let data_to_encrypt = JSON.stringify({
      medicine_id: isMedicineId,
    });
    const encrypted_data = CryptoJSAesEncrypt(data_to_encrypt);
    let body = JSON.stringify(encrypted_data);
    try {
      const {status, message, data} = await fetchResource(
        {
          url: 'detail-list',
          body,
        },
        true,
      );

      if (status == 1) {
        if (data.length == '0') {
          if (isMedicineId == 3) {
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
          setFormInputs([]);
          setFrequency('');
          setpatientDoseArray('');
          setLoading(false);
          setHideView(true);
        } else {
          let mg_list = data.MgList_list;
          let dose_list = data.dosage_list;
          setPatientUpdate(true);
          if (isMedicineId == 2) {
            navigation.replace('ResultStatement', {
              data: data,
              isMedicineID: 'two',
              doseType: isSelectDoseLabel,
            });
          }

          if (finalArr.length == 0) {
            var fredata = finalArr1.data;
          } else {
          }
          if (isMedicineId == 1) {
            navigation.replace('ResultCalculator', {
              isCalculator: false,
              mgList: mg_list,
              doseList: dose_list,
              total_dosageAllArray: sumDaily_dose,
              MedicineLable: isMedicineLable,
              MedicineId: isMedicineId,
              PatientName: isPatientName,
              PatientWeigth: isPatientWeigth,
              paramter: isSelectionMode,
              patient_dose: finalArr.length == 0 ? finalArr1 : finalArr,
              frequency: isFrequency,
            });
          }

          if (isMedicineId == 3) {
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
          const _emptyArr = [];

          setFormInputs(_emptyArr);
          setpatientDoseArray('');
          toast.success({message: message});
          setLoading(false);
        }
      } else {
        setLoading(false);
        toast.danger({message: 'Something went wrong'});
        // console.log('error login->', e);
      }
    } catch (e) {
      setLoading(false);
      toast.danger({message: 'Something went wrong'});
      console.log('detail-list error->', e);
    }
  };
  const calenderOK = async key => {
    setOpenStartDatePicker(false);

    const totalDays = await AsyncStorage.getItem('@totalDays');
    const startDate = await AsyncStorage.getItem('@startDate');
    const ednDate = await AsyncStorage.getItem('@endDate');
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

    console.log('start formInputs -->', formInputs);

    await AsyncStorage.removeItem('@totalDays');
    await AsyncStorage.removeItem('@startDate');
    await AsyncStorage.removeItem('@endDate');
  };
  const medicineSelect = item => {
    // setSelectIndicationLabel('');
    // setSelectIndicationId('');
    setIndicationHideView(false);
    if (item.value == '1') {
      setHideView(true);
      setHideSecondMedicine(false);
      setHideViewFrequency(false);
      setHideMedicineThree(false);
      setHideMedicineFour(false);
      setSelectIndicationLabel('Acne');
      setSelectIndicationId('1');
    }
    if (item.value == '2') {
      setHideSecondMedicine(true);
      setHideView(false);
      setHideViewFrequency(false);
      setHideMedicineThree(false);
      setHideMedicineFour(false);
      setSelectIndicationLabel('Psoriasis');
      setSelectIndicationId('1');
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
  const datePlusClick = showPop => {
    setDateINput.push({label: 'New label', show: false});
  };
  const RenderDosageView = ({item, index, isFormInput}) => {
    // console.log('item =====-->', item);
    return (
      <View>
        <View style={{flexDirection: 'row'}}>
          <View style={[styles.daysMainView, {marginLeft: 15}]}>
            <Text
              style={[
                styles.mainTextYellow,
                {fontSize: 13, marginLeft: 10, marginTop: 10},
              ]}>
              {item.day == '' ? 'Days' : item.day}{' '}
              {item.day == '' ? null : 'Days'}
            </Text>
            <TouchableOpacity
              onPress={() => {
                isFormInput === false ? null : setOpenStartDatePicker(true);
              }}
              activeOpacity={0.8}
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={CalenderMainColor}
                style={{width: 20, height: 22, marginLeft: 5}}
              />
              <View style={{flexDirection: 'row'}}>
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
                  {item.start_date == '' ? 'Start Date' : item.start_date}
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
                  TO {item.end_date == '' ? 'End Date' : item.end_date}
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
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={[
                  styles.daysMainView,
                  {
                    width: width * 0.16,
                    justifyContent: 'center',
                    alignItems: 'center',
                    // borderColor: isTotalDoseEmpty == true ? error : null,
                    // borderWidth: isTotalDoseEmpty == true ? 1 : 0,
                  },
                ]}>
                <Text
                  style={[
                    styles.mainTextYellow,
                    {
                      marginTop: 3,
                      fontSize: 15,
                    },
                  ]}>
                  {item.daily_dose.toString()}
                </Text>
                {/* <TextInput
                style={[
                  styles.mainTextYellow,
                  {
                    fontSize: 15,
                    width: width * 0.1,
                    textAlign: 'center',
                    marginTop: 3,
                  },
                ]}
                value={
                  isFormInput === false
                    ? item.daily_dose.toString()
                    : item.daily_dose.toString()
                }
                placeholder="mg"
                placeholderTextColor={mediumGray}
                onChangeText={dose => {
                  inputHandleUserId1(dose, index);
                }}
                keyboardType={'numeric'}
                // autoCapitalize="none"
              /> */}
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
                  isFormInput === false
                    ? onDeleteApiCall(index, item)
                    : onDeletePush(index);
                }}>
                <Image source={DeleteIcon} style={styles.delteIconImg} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View
          style={{
            width: width * 0.83,
            alignItems: 'center',
          }}>
          {item.frequency !== null ? (
            <View>
              <View
                style={{
                  alignItems: 'flex-start',
                  width: width * 0.83,
                }}>
                <View style={styles.fieldView}>
                  <Text style={[styles.fieldText, {marginLeft: 20}]}>
                    Frequency
                  </Text>
                </View>
              </View>
              <View
                style={[
                  styles.fieldMainViewDropDown,
                  {marginTop: height * 0.01},
                ]}>
                <Text
                  style={[
                    styles.placeholderStyle,
                    {textAlignVertical: 'center'},
                  ]}>
                  {item.frequency.toString()}
                </Text>
              </View>
            </View>
          ) : null}
        </View>
      </View>
    );
  };

  return (
    <>
      <GeneralStatusBarColor backgroundColor={'#ffa448'} />
      <SafeAreaView style={{flex: 1, backgroundColor: white}}>
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
                    {isPatientName == '' ? (
                      <Text
                        style={[
                          styles.placeholderStyle,
                          {
                            textAlignVertical: 'center',
                            color: '#cfcfcf',
                            height: width * 0.12,
                            marginTop:
                              Platform.OS == 'ios' ? height * 0.018 : 0,
                          },
                        ]}>
                        Patient Name
                      </Text>
                    ) : (
                      <Text
                        style={[
                          styles.placeholderStyle,
                          {
                            textAlignVertical: 'center',
                            color: darkGray,
                            height: width * 0.12,
                            marginTop:
                              Platform.OS == 'ios' ? height * 0.018 : 0,
                          },
                        ]}>
                        {isPatientName}
                      </Text>
                    )}
                  </View>

                  <View
                    style={{
                      alignItems: 'flex-start',
                      width: width * 0.95,
                      marginTop: height * 0.01,
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
                            // height: width * 0.3,
                          }}
                          textStyle={{width: width * 0.74}}
                          style1={styles.dropDownMain}
                          data={isMedicineArray}
                          value={isMedicineLable}
                          onSelect={item => {
                            setMedicineDropDown(false);
                            setIsError(false);
                            setMedicineLable(item.label);
                            setMedicineId(item.value);
                            medicineSelect(item);
                            setIndicationHideView(false);
                          }}
                          isError={isError}
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
                          // height: width * 0.3,
                        }}
                        textStyle={{width: width * 0.74}}
                        style1={styles.dropDownMain}
                        data={isMedicineArray}
                        value={isMedicineLable}
                        onSelect={item => {
                          setMedicineDropDown(false);
                          setIsError(false);
                          setMedicineLable(item.label);
                          setMedicineId(item.value);
                          medicineSelect(item);
                        }}
                        isError={isError}
                        showOption={isMedicineDropDown}
                      />
                    </View>
                  )}

                  {isHideView == true ? (
                    <View style={{width: width, alignItems: 'center'}}>
                      <View
                        style={{
                          alignItems: 'flex-start',
                          width: width * 0.95,
                          marginTop:
                            Platform.OS == 'android'
                              ? height * 0.02
                              : height * 0.03,
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
                                  setIndicationDropDown(!isIndicationDropDown);
                                  setMedicineDropDown(false);
                                } else {
                                  setIndicationDropDown(!isIndicationDropDown);
                                }
                              } else {
                              }
                              if (isMedicineDropDown == true) {
                                setIndicationDropDown(!isIndicationDropDown);
                                setMedicineDropDown(false);
                              } else {
                                setIndicationDropDown(!isIndicationDropDown);
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
                            onPress={() => {}}
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
                        <View style={{height: width * 0.03, zIndex: 9999}}>
                          <DropDownMain
                            text={
                              isSelectIndicationLabel == ''
                                ? 'Select Dose'
                                : isSelectIndicationLabel
                            }
                            style={{
                              width: width * 0.9,
                              // top: Platform.OS == 'ios' ? 2 : 2,
                              zIndex: 9999,
                              height: width * 0.15,
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
                            Platform.OS == 'ios' ? height * 0.0 : height * 0.01,
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
                          keyboardType={'numeric'}
                          placeholder="Add Weight"
                          placeholderTextColor={'#cfcfcf'}
                          onChangeText={weight => {
                            closeDropDown();
                            setPatienteight(weight);
                            setWeightEmpty(false);
                          }}
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
                              isHideView == false
                                ? null
                                : setSelectionMode('kg');
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
                                  isSelectionMode == 'kg' ? 'white' : mainColor,
                              }}>
                              Kg
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => {
                              closeDropDown();
                              isHideView == false
                                ? null
                                : setSelectionMode('pound');
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
                          zIndex: 0,
                          alignItems: 'flex-start',
                          width: width * 0.95,
                          marginTop:
                            Platform.OS == 'android'
                              ? height * 0.01
                              : height * 0.01,
                        }}>
                        <View style={styles.fieldView}>
                          <Text style={styles.fieldText}>Previous Dosage</Text>
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
                          {ispatientDoseArray !== ''
                            ? ispatientDoseArray.map((input, key) => (
                                <View key={key} style={styles.submitFormRow}>
                                  <View style={[{alignitems: 'flex-start'}]}>
                                    <RenderDosageView
                                      item={{...input}}
                                      index={key}
                                      isFormInput={false}
                                    />
                                  </View>
                                </View>
                              ))
                            : null}
                          {formInputs !== ''
                            ? formInputs.map((item, index) => (
                                <View key={index} style={styles.submitFormRow}>
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
                                              height: 22,
                                              marginLeft: 5,
                                            }}
                                          />
                                          <View style={{flexDirection: 'row'}}>
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
                                              {(item.start_date == '' &&
                                                'Start Date') ||
                                                item.start_date}
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
                                                borderColor:
                                                  isTotalDoseEmpty == true
                                                    ? error
                                                    : null,
                                                borderWidth:
                                                  isTotalDoseEmpty == true
                                                    ? 1
                                                    : 0,
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
                                              placeholderTextColor={mediumGray}
                                              onChangeText={dose => {
                                                inputHandleUserId1(dose, index);
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

                                          <Modal isVisible={isStartDatePicker}>
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
                                        // height: height * 0.1,
                                        width: width * 0.83,
                                        alignItems: 'center',
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
                                            setFrequencyDropDown(
                                              !isFrequencyDropDown,
                                            );
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
                                            setFrequencyDropDown(
                                              !isFrequencyDropDown,
                                            );
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

                                            // marginTop:
                                            //   Platform.OS == 'ios'
                                            //     ? height * 0.015
                                            //     : height * 0.0,
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
                                              setFrequency(item.label);
                                              setErrorFrequency(false);
                                              inputHandleFrequency(item, index);
                                              showFrequencyChange(false, index);
                                            }}
                                            isError={isErrorFrequency}
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
                                              marginLeft: 50,
                                              backgroundColor: 'white',
                                              elevation: 1,
                                              // marginRight: 1,
                                            }}
                                            textStyle={{
                                              width: width * 0.65,
                                              color: mediumGray,
                                            }}
                                            style1={styles.dropDownMain2}
                                            data={dataFrequency}
                                            value={item.frequency.toString()}
                                            onSelect={item => {
                                              setFrequency(item.label);
                                              setErrorFrequency(false);
                                              inputHandleFrequency(item, index);
                                              setFrequencyDropDown(false);
                                              showFrequencyChange(false, index);
                                            }}
                                            isError={isErrorFrequency}
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
                              },
                            ]}
                            onPress={() => handleAddMoreLine1()}>
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
                                  setIndicationDropDown(!isIndicationDropDown);
                                  setMedicineDropDown(false);
                                } else {
                                  setIndicationDropDown(!isIndicationDropDown);
                                }
                              } else {
                              }
                              setIndicationHideView(false);

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
                            text={
                              isSelectIndicationLabel == ''
                                ? 'Select Indication'
                                : isSelectIndicationLabel
                            }
                            value={isSelectIndicationLabel}
                            onPress={() => {
                              if (isIndicationHideView == false) {
                                if (isMedicineDropDown == true) {
                                  setIndicationDropDown(!isIndicationDropDown);
                                  setMedicineDropDown(false);
                                } else {
                                  setIndicationDropDown(!isIndicationDropDown);
                                }
                              } else {
                              }
                              setIndicationHideView(false);

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
                        <View style={{height: width * 0.03, zIndex: 9999}}>
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
                            <Text style={styles.fieldText}>Select Dose</Text>
                          </View>
                        </View>
                        {Platform.OS == 'ios' ? (
                          <View
                            style={{
                              height: width * 0.12,
                              alignItems: 'center',
                              zIndex: 9999,
                            }}>
                            <DropDownText
                              text={
                                isSelectDoseLabel == ''
                                  ? 'Select Dose'
                                  : isSelectDoseLabel
                              }
                              value={isSelectDoseLabel}
                              onPress={() => {
                                if (isMedicineDropDown == true) {
                                  setDoseDropDown(!isDoseDropDown);
                                  setMedicineDropDown(false);
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
                                setDoseDropDown(false);
                                doseSelect(item);
                              }}
                              isError={isError}
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
                                isSelectDoseId == ''
                                  ? 'Select Dose'
                                  : isSelectDoseId
                              }
                              style={{
                                width: width * 0.9,
                                top: Platform.OS == 'ios' ? 2 : 2,
                                zIndex: 9999,
                                height: width * 0.2,
                                //  position: 'absolute',
                              }}
                              textStyle={{width: width * 0.74}}
                              style1={styles.dropDownMain}
                              data={dataMedcine2}
                              value={isSelectDoseLabel}
                              onSelect={item => {
                                setDoseDropDown(false);
                                doseSelect(item);
                                setIsErrorindication(false);
                                setIndicationHideView(false);
                              }}
                              isError={isError}
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
                            text={
                              isSelectIndicationLabel == ''
                                ? 'Select Indication'
                                : isSelectIndicationLabel
                            }
                            value={isSelectIndicationLabel}
                            onPress={() => {
                              setIndicationDropDown(!isIndicationDropDown);
                              if (isIndicationHideView == false) {
                                if (isMedicineDropDown == true) {
                                  setIndicationDropDown(!isIndicationDropDown);
                                  setMedicineDropDown(false);
                                } else {
                                  setIndicationDropDown(!isIndicationDropDown);
                                }
                              } else {
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
                              Platform.OS == true ? width * 0.14 : width * 0.13,
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
                                ? 'Select Dose'
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
                                  isSelectionMode == 'kg' ? 'white' : mainColor,
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
                            // marginTop: 15,
                          },
                        ]}>
                        <TextInput
                          style={[
                            styles.placeholderStyle,
                            {
                              fontSize: 15,
                              width: width * 0.74,
                              marginTop: 3,
                              marginLeft: 10,
                            },
                          ]}
                          value={ismgkg.toString()}
                          placeholderTextColor={mediumGray}
                          onChangeText={dose => {
                            closeDropDown();
                            mgkgValidation(dose);
                          }}
                          keyboardType={'numeric'}
                        />
                        <Text>mg/kg</Text>
                      </View>
                      {/* {isDoseEmptyLable == true ? ( */}
                      <View
                        style={{width: width * 0.85, alignItems: 'flex-start'}}>
                        <Text style={styles.errorText}>
                          Insert value between 2.5 to 5 mg/kg
                        </Text>
                      </View>
                      {/* ) : null} */}
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
                        <TouchableOpacity
                          activeOpacity={0.8}
                          style={[
                            styles.lastView,
                            {
                              backgroundColor: lightgray,
                              shadowColor: black,
                              elevation: 1,
                            },
                          ]}>
                          <Text style={[styles.lastText, {color: mediumGray}]}>
                            Click to See Result
                          </Text>
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <View style={{width: width, alignItems: 'center'}}>
                        <TouchableOpacity
                          activeOpacity={0.8}
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
    marginTop: 1,
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
    shadowOpacity: Platform.OS == 'ios' ? 0.4 : 0.8,
    shadowRadius: 2,
    elevation: 5,
    fontSize: 16,
    width: width * 0.9,
    height: width * 0.12,
    borderRadius: 13,
  },
  fieldMainViewDropDown: {
    backgroundColor: white,
    elevation: 1,
    fontSize: 16,
    width: width * 0.8,
    height: width * 0.12,
    borderRadius: 13,
    marginLeft: 20,

    // justifyContent: 'center',
    // alignItems: 'center',
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
    marginTop: Platform.OS == 'android' ? 3 : 0,
    height: width * 0.12,
  },
  daysMainView: {
    backgroundColor: mainBackYellor,
    borderRadius: 10,
    height: height * 0.09,
    marginTop: 20,
    width: width * 0.5,
    // marginLeft: 12,
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
    height: height,
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
