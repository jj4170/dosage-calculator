import React, {useState, useEffect} from 'react';
import {Button, View, StyleSheet, Text} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
export default function DateTimePicker({
  isVisible,
  onConfirm,
  onCancel,
  mode,
  isNewDate,
  onChange,
}) {
  return (
    <View>
      <DateTimePickerModal
        isVisible={isVisible}
        mode={mode}
        onConfirm={onConfirm}
        onCancel={onCancel}
        // date={
        //   isNewDate == false
        //     ? new Date()
        //     : new Date(isYearAfterFour, isMonthAfterFour, isDateAfterFour)
        // }
        onChange={onChange}
        minimumDate={isNewDate == false ? null : new Date()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderBottomColor: '#5b4c82',
    borderBottomWidth: 1,
    marginVertical: 10,
    marginHorizontal: 10,
    justifyContent: 'center',
    borderRadius: 2,
    height: 50,
  },
});
