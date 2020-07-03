import React, {Component, useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import {Container, Header, Content, Button, Text} from 'native-base';
import {Dropdown} from 'react-native-material-dropdown';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';

const {width: Width} = Dimensions.get('window');
export default class CreateSchedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: '',
      isVisible: false,
      selectedGuardName: '',
      selectedSiteName: '',
      selectedShiftTiming: '',
      siteNames: [],
    };
  }
  componentDidMount() {
    fetch(global.hostUrl + '/sites/', {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((responseData) => {
        //console.log(responseData)
        var data = responseData.map(function (item) {
          return {
            value: item.site_name,
          };
        });
        console.log(data);

        this.setState({siteNames: data});
      })
      .catch((error) => console.log('Error : ', error));

    /** Fetching Guard Names */
    fetch(global.hostUrl + '/users/', {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((responseData) => {
        //console.log(responseData)
        var data = responseData.map(function (item) {
          return {
            value: item.first_name + ' ' + item.last_name,
          };
        });
        this.setState({guardNames: data});
      })
      .catch((error) => console.log('Error : ', error));
  }

  fieldValidation = () => {
    //getting today's date and converting in required format
    var today = new Date();
    var date = today.getDate();
    var month = today.getMonth() + 1;
    var year = today.getFullYear();
    if (month < 10) {
      month = '0' + month;
    }
    if (date < 10) {
      date = '0' + date;
    }

    var currentDate = year + '-' + month + '-' + date;
    //console.log(currentDate);
    console.log(this.state.selectedDate);
    console.log(this.state.selectedGuardName);
    console.log(this.state.selectedShiftTiming);

    if (
      this.state.selectedDate == '' ||
      this.state.selectedGuardName == '' ||
      this.state.selectedSiteName == '' ||
      this.state.selectedShiftTiming == ''
    ) {
      alert('All fields are necessary');
    } else if (this.state.selectedDate < currentDate) {
      alert('selected date cannot be in the past');
    } else {
      this.scheduleClicked.bind(this);
    }
  };

  scheduleClicked = () => {
    this.fieldValidation();
  };

  handlePicker = (date) => {
    this.setState({isVisible: false});
    this.setState({selectedDate: moment(date).format('YYYY-MM-DD')});
    //selectedDate: moment(date).format('MM-DD-YYYY')
  };

  showDatePicker = () => {
    this.setState({isVisible: true});
  };

  hideDatePicker = () => {
    this.setState({isVisible: false});
  };

  render() {
    // const params = this.props.route.params;
    // const user_name = params.username

    let shiftTime = [
      {
        value: '9:30AM- 9:30PM',
      },
      {
        value: '9:30PM- 9:30AM',
      },
    ];

    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.dateLabel}>Select Date:</Text>
          <TouchableOpacity
            onPress={this.showDatePicker}
            style={styles.datePickerButton}>
            <Text style={styles.DateSelector}>{this.state.selectedDate}</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.dateLabel}>Guard Name:</Text>
          <Dropdown
            //style= {styles.dropdown}
            dropdownOffset={{top: 10, left: 50}}
            dropdownMargins={{min: 5, max: 10}}
            containerStyle={{
              borderWidth: 1,
              borderColor: 'lightgrey',
              borderRadius: 5,
              width: Width * 0.8,
              height: 50,
              paddingRight: 10,
              marginBottom: 20,
            }}
            rippleCentered={true}
            inputContainerStyle={{borderBottomColor: 'transparent'}}
            data={this.state.guardNames}
            valueExtractor={({value}) => value}
            onChangeText={(value) => {
              this.setState({selectedGuardName: value});
            }}
          />
        </View>
        <View>
          <Text style={styles.dateLabel}>Site Name:</Text>
          <Dropdown
            //style= {styles.dropdown}
            dropdownOffset={{top: 10, left: 20}}
            dropdownMargins={{min: 10, max: 50}}
            containerStyle={{
              borderWidth: 1,
              borderColor: 'lightgrey',
              borderRadius: 5,
              width: Width * 0.8,
              height: 50,
              paddingRight: 10,
              marginBottom: 20,
            }}
            rippleCentered={true}
            inputContainerStyle={{borderBottomColor: 'transparent'}}
            data={this.state.siteNames}
            valueExtractor={({value}) => value}
            onChangeText={(value) => {
              this.setState({selectedSiteName: value});
            }}
          />
        </View>
        <View>
          <Text style={styles.dateLabel}>Shift Time:</Text>
          <Dropdown
            //style= {styles.dropdown}
            dropdownOffset={{top: 10, left: 20}}
            dropdownMargins={{min: 5, max: 10}}
            containerStyle={{
              borderWidth: 1,
              borderColor: 'lightgrey',
              borderRadius: 5,
              width: Width * 0.8,
              height: 50,
              paddingRight: 10,
              marginBottom: 20,
            }}
            rippleCentered={true}
            inputContainerStyle={{borderBottomColor: 'transparent'}}
            data={shiftTime}
            valueExtractor={({value}) => value}
            onChangeText={(value) => {
              this.setState({selectedShiftTiming: value});
            }}
          />
        </View>
        <DateTimePickerModal
          isVisible={this.state.isVisible}
          mode={'date'}
          datePickerModeAndroid={'spinner'}
          is24Hour={false}
          onConfirm={this.handlePicker}
          onCancel={this.hideDatePicker}
        />

        <Button block info onPress={this.fieldValidation.bind(this)}>
          <Text>SCHEDULE</Text>
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    margin: 30,
    marginTop: 50,
  },
  dateLabel: {
    fontSize: 20,
    //alignSelf:"center",
    width: 150,
  },
  DateSelector: {
    fontSize: 16,
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  datePickerButton: {
    backgroundColor: '#DAE0E2',
    borderRadius: 5,
    height: 30,
    width: 200,
  },
});
