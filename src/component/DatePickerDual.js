import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {Calendar} from 'react-native-calendars';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class DatePickerDual extends React.Component {
  state = {
    markedDates: {},
    isStartDatePicked: false,
    isEndDatePicked: false,
    startDate: '',
  };

  onDayPress = async day => {
    if (this.state.isStartDatePicked == false) {
      let markedDates = {};
      markedDates[day.dateString] = {
        startingDay: true,
        color: '#ff7700',
        textColor: '#FFFFFF',
      };
      this.setState({
        markedDates: markedDates,
        isStartDatePicked: true,
        isEndDatePicked: false,
        startDate: day.dateString,
      });
      let startDate = moment(day.dateString);

      await AsyncStorage.setItem('@startDate', JSON.stringify(startDate));
    } else {
      let markedDates = this.state.markedDates;
      let startDate = moment(this.state.startDate);
      let endDate = moment(day.dateString);
      let range = endDate.diff(startDate, 'days');
      let startDate1 = moment(this.state.startDate).add(1, 'day');
      let endDate1 = moment(day.dateString).add(1, 'day');

      if (range >= 0) {
        var total_date = range + 1;
        await AsyncStorage.setItem('@totalDays', JSON.stringify(total_date));
        await AsyncStorage.setItem('@startDate', JSON.stringify(startDate));
        await AsyncStorage.setItem('@endDate', JSON.stringify(endDate));
        for (let i = 1; i <= range; i++) {
          let tempDate = startDate.add(1, 'day');

          tempDate = moment(tempDate).format('YYYY-MM-DD');
          if (i < range) {
            markedDates[tempDate] = {color: '#ff7700', textColor: '#FFFFFF'};
          } else {
            markedDates[tempDate] = {
              endingDay: true,
              color: '#ff7700',
              textColor: '#FFFFFF',
            };
          }
        }
        this.setState({
          markedDates: markedDates,
          isStartDatePicked: false,
          isEndDatePicked: true,
          startDate: '',
        });
      } else {
        alert('Select an upcomming date!');
      }
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Calendar
          // minDate={Date()}
          monthFormat={'MMMM yyyy'}
          markedDates={this.state.markedDates}
          markingType="period"
          hideExtraDays={true}
          hideDayNames={true}
          onDayPress={this.onDayPress}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    backgroundColor: 'white',
    padding: 20,
    justifyContent: 'center',
  },
});
