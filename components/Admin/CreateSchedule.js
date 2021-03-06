import React, { Component, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Container, Header, Content, Button, Text } from 'native-base';
import { Dropdown } from 'react-native-material-dropdown';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';

const { width: Width } = Dimensions.get('window');
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
      guardData:{},
      selectedGuardId:'',
      guardNames:[]
    };
  }


  /***Component did mount should load site names, all the available guards */
  componentDidMount() {
    /**fetching site names */
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

        this.setState({ siteNames: data });
        console.log("site names : "+this.state.siteNames)
      })
      .catch((error) => console.log('Error : ', error));

    /** Fetching Guard Names */
    fetch(global.hostUrl + '/users/guardNames', {
      method: 'POST',
    })
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({guardData:responseData})
        console.log('guardData',this.state.guardData)
        var data = [...new Set(responseData.map(q => q.first_name+' '+q.last_name))];
        
        var data1 = data.map(function (item) {
          return {
            value: item,
          };
        });  
        this.setState({ guardNames: data1 });
        console.log('guardName  : ', this.state.guardNames)
      })
      .catch((error) => console.log('Error : ', error));
  }

/** Field validation after user clicks on schedule button */
  fieldValidation = () => {
    /**getting today's date and converting in required format**/
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
    console.log(this.state.selectedDate);
    console.log(this.state.selectedGuardName);
    console.log(this.state.selectedShiftTiming);

    if (
      this.state.selectedDate == '' ||
      this.state.selectedGuardName == '' ||
      this.state.selectedSiteName == '' ||
      this.state.selectedShiftTiming == ''||
      this.state.selectedGuardId == ''
    ) {
      alert('Please completely fill out the form to create schedule.');
    } else if (this.state.selectedDate < currentDate) {
      alert('selected date cannot be in the past');
    } else {
      this.scheduleClicked.bind(this);
      fetch(global.hostUrl+"/shifts/create", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
           site_name:this.state.selectedSiteName,
           date:this.state.selectedDate,
           shift_slot:this.state.selectedShiftTiming,
           guard_id:this.state.selectedGuardId,
           guard_name:this.state.selectedGuardName
        })
      }) 
      .then((response) => response.text())
      .then((responseData) => {
         console.log(responseData)
         alert(responseData)
         if(responseData=="Schedule is created successfully."){
           this.resetAllFields();
         }
      })
      .catch(error=> {
        console.log("Error : ",error)
        alert(error)
      })
      
    }
  };

 /**Date picker */
  handlePicker = (date) => {
    this.setState({ isVisible: false });
    this.setState({ selectedDate: moment(date).format('YYYY-MM-DD') });
    //selectedDate: moment(date).format('MM-DD-YYYY')
  };
 /**To show date picker */
  showDatePicker = () => {
    this.setState({ isVisible: true });
  };

  /**To hide date pickers */
  hideDatePicker = () => {
    this.setState({ isVisible: false });
  };

  /** get the guard id for selected guard name */
  getCorrespondingId=async(guardName)=>{
    console.log("In corresponding ID")
    await fetch(global.hostUrl+"/users/getId", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
         first_name:guardName.toString().split(" ")[0],
         last_name:guardName.toString().split(" ")[1]
      })
    }) 
    .then((response) => response.json())
    .then((responseData) => {
       console.log(responseData)
       console.log("After setting the state")
       var data = responseData.map(function (item) {
        return {
          value: item._id,
        };
      });
       this.setState({guardId:data})
    })
    .catch(error => console.log("Error : ",error))
  }

  render() {
    /**Shift timings for the dropdown */
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
            dropdownOffset={{top: 10, left: 20}}
            dropdownMargins={{min: 5, max: 30}}
            containerStyle={{
              borderWidth: 1,
              borderColor: 'lightgrey',
              borderRadius: 5,
              width: Width * 0.8,
              height: 50,
              paddingRight: 10,
              marginBottom: 20,
              paddingLeft:20,
            }}
            rippleCentered={true}
            inputContainerStyle={{ borderBottomColor: 'transparent' }}
            data={this.state.guardNames}
            valueExtractor={({ value }) => value}
            onChangeText={(value) => {
            this.setState({selectedGuardName: value});
            this.guardIdDropDown.setState({ value: '' });
            this.state.selectedGuardId=''
            console.log("selected guard name : "+this.state.selectedGuardName)
            this.getCorrespondingId(this.state.selectedGuardName)
            }}
          />
        </View>
        <View>
          <Text style={styles.dateLabel}>Guard ID:</Text>
          <Dropdown
            //style= {styles.dropdown}
            dropdownOffset={{top: 10, left: 0}}
            dropdownMargins={{min: 5, max: 30}}
            containerStyle={{
              borderWidth: 1,
              borderColor: 'lightgrey',
              borderRadius: 5,
              width: Width * 0.8,
              height: 50,
              paddingRight: 10,
              marginBottom: 20,
              paddingLeft:20,
              fontSize:25
            }}
            rippleCentered={true}
            ref={c => (this.guardIdDropDown = c)}
            inputContainerStyle={{borderBottomColor: 'transparent'}}
            data={this.state.guardId}
            valueExtractor={({value}) => value}
            onChangeText={(value) => {
            this.setState({selectedGuardId: value});
            }}
          />
        </View>
        <View>
          <Text style={styles.dateLabel}>Site Name:</Text>
          <Dropdown
            //style= {styles.dropdown}
            dropdownOffset={{ top: 10, left: 20 }}
            dropdownMargins={{ min: 10, max: 50 }}
            containerStyle={{
              borderWidth: 1,
              borderColor: 'lightgrey',
              borderRadius: 5,
              width: Width * 0.8,
              height: 50,
              paddingRight: 10,
              marginBottom: 20,
              paddingLeft:20
            }}
            rippleCentered={true}
            inputContainerStyle={{ borderBottomColor: 'transparent' }}
            data={this.state.siteNames}
            valueExtractor={({ value }) => value}
            onChangeText={(value) => {
              this.setState({ selectedSiteName: value });
            }}
          />
        </View>
        <View>
          <Text style={styles.dateLabel}>Shift Time:</Text>
          <Dropdown
            //style= {styles.dropdown}
            dropdownOffset={{ top: 10, left: 20 }}
            dropdownMargins={{ min: 5, max: 10 }}
            containerStyle={{
              borderWidth: 1,
              borderColor: 'lightgrey',
              borderRadius: 5,
              width: Width * 0.8,
              height: 50,
              paddingRight: 10,
              marginBottom: 20,
              paddingLeft:20,
              fontSize:25
            }}
            rippleCentered={true}
            inputContainerStyle={{ borderBottomColor: 'transparent' }}
            data={shiftTime}
            valueExtractor={({ value }) => value}
            onChangeText={(value) => {
              this.setState({ selectedShiftTiming: value });
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

/**Styling */
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    margin: 30,
    marginTop: 50,
   // backgroundColor:'#DAE0E2'
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
    backgroundColor: '#99AAAB',
    borderRadius: 5,
    height: 30,
    width: 200,
  },
});
