import React, { Component, useState } from 'react';
import { Button, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';


export default class CreateSchedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: "Click to choose Date",
      isVisible: false

    }
  }

  handlePicker = (date) => {
    this.setState({ isVisible: false })
    this.setState({ selectedDate: moment(date).format('MM-DD-YYYY') })
    //selectedDate: moment(date).format('MM-DD-YYYY')
  }

  showDatePicker = () => {
    this.setState({ isVisible: true })
  }

  hideDatePicker = () => {
    this.setState({ isVisible: false })
  }

  render() {
    // const params = this.props.route.params;
    // const user_name = params.username


    let data = [{
      value: 'Zeefa'
    },
    { value: 'Saim' },
    {
      value: 'Suhail'
    }];
    return (
      <View style={styles.container}>
        <View style ={styles.row}>
          <Text style={styles.dateLabel}>Select Date:</Text>
          <TouchableOpacity onPress={this.showDatePicker} style ={styles.datePickerButton}>
            <Text style={styles.DateSelector}>{this.state.selectedDate}</Text>
          </TouchableOpacity>
        </View>
        <View style ={styles.row}>
          <Text style={styles.dateLabel}>Select Site:</Text>
          <TouchableOpacity onPress={this.showDatePicker} style ={styles.datePickerButton}>
            <Text style={styles.DateSelector}>{this.state.selectedDate}</Text>
          </TouchableOpacity>
        </View>
        <DateTimePickerModal
          isVisible={this.state.isVisible}
          mode={"date"}
          datePickerModeAndroid={"spinner"}
          is24Hour={false}
          onConfirm={this.handlePicker}
          onCancel={this.hideDatePicker}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container : {
   justifyContent:"center",
   margin:30,
   marginTop:50
  },
  dateLabel :{
    fontSize:20,
    alignSelf:"center",
    width:150,
  },
  DateSelector :{
    fontSize:15,
    alignSelf:"center",
  },
  dropdown: {
    width: 10,
    color: 'red'
  },
  row:{
    flexDirection:"row",
    marginBottom:30
  },
  datePickerButton:{
    backgroundColor:"#A4B0BD",
    borderRadius:5,
    height:30,
    width:200,
  }
})