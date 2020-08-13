import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  Dimensions
} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Dropdown} from 'react-native-material-dropdown';
import Modal from 'react-native-modal';

const { width: Width } = Dimensions.get('window');
export default class UpdateUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newFirstName: '',
      newEmail: '',
      newLastName: '',
      newPhone: '',
      newconfirmpassword: '',
      Alert_Visibility: false,
      selectedGuardName:'',
      selectedGuardId:'',
      guardDetails:{}
    };
  }
  componentDidMount() {
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

  


  updateRecords=async()=>{
    console.log("In fetching guard details")
    await fetch(global.hostUrl+"/users/UpdateUser", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
         id:this.state.selectedGuardId,
         first_name:this.state.newFirstName,
         last_name:this.state.newLastName,
         email:this.state.newEmail,
         phone:this.state.newPhone
      })
    }) 
    .then((response) => response.text())
    .then((responseData) => {
       console.log(responseData)
       console.log("After setting the state")
       alert(responseData)
       this.componentDidMount();
    })
    .catch(error => console.log("Error : ",error))
  }


  getGuardDetails=async(guardId)=>{
    console.log("In fetching guard details")
    await fetch(global.hostUrl+"/users/getGuardInfo", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
         id:guardId,
      })
    }) 
    .then((response) => response.json())
    .then((responseData) => {
       console.log(responseData)
       console.log("After setting the state")
       this.setState({guardDetails:responseData})
       this.setState({newFirstName:responseData[0].first_name, newLastName:responseData[0].last_name,
        newPhone:responseData[0].phone,newEmail:responseData[0].email
        })
    })
    .catch(error => console.log("Error : ",error))
  }


  inputValidation = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let regPhone = /^\(?([0-9]{3})\)?[-.●]?\s?([0-9]{3})[-.●]?\s?([0-9]{4})$/;

    if (
      this.state.newFirstName == '' ||
      this.state.newEmail == '' ||
      this.state.newPhone == '' ||
      this.state.newLastName == ''||
      this.state.selectedGuardName==''||
      this.state.selectedGuardId==''
    ) {
      alert('Please completely fill out the form to update the record.');
    } else if (reg.test(this.state.newEmail) === false) {
      alert('Please enter the valid email address.');
     } else if(regPhone.test(this.state.newPhone) === false){
        console.log(this.state.newPhone)
        alert('Please enter the valid phone number.')
    } else {
      this.updateRecords();
    }
  };

  render() {
    return (
      <KeyboardAwareScrollView enableOnAndroid style={styles.container}>
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
              height: 40,
              paddingRight: 10,
              marginBottom: 20,
              paddingLeft: 20,
            }}
            rippleCentered={true}
            inputContainerStyle={{borderBottomColor: 'transparent'}}
            data={this.state.guardNames}
            valueExtractor={({value}) => value}
            onChangeText={(value) => {
              this.setState({selectedGuardName: value});
              this.guardIdDropDown.setState({value: ''});
              this.state.selectedGuardId = '';
              console.log(
                'selected guard name : ' + this.state.selectedGuardName,
              );
              this.getCorrespondingId(this.state.selectedGuardName);
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
              height: 40,
              paddingRight: 10,
              marginBottom: 20,
              paddingLeft: 20,
              fontSize: 25,
            }}
            rippleCentered={true}
            ref={(c) => (this.guardIdDropDown = c)}
            inputContainerStyle={{borderBottomColor: 'transparent'}}
            data={this.state.guardId}
            valueExtractor={({value}) => value}
            onChangeText={(value) => {
              this.setState({selectedGuardId: value});
              this.setState({guardDetails:[]})
              this.getGuardDetails(this.state.selectedGuardId);

            }}
          />
        </View>
        <View style={styles.formContainer}>
          <Text
            style={{
              color: '#000',
              marginBottom: 10,
              fontWeight: 'bold',
              fontSize: 20,
            }}>
            Details:
          </Text>
          <TextInput
            style={styles.textInput}
            placeholder="First Name"
            value={this.state.newFirstName}
            onChangeText={(value) => this.setState({newFirstName: value})}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Last Name"
            value={this.state.newLastName}
            onChangeText={(value) => this.setState({newLastName: value})}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Email"
            value={this.state.newEmail}
            onChangeText={(value) => this.setState({newEmail: value})}
          />
          <TextInput
            style={styles.textInput}
            value={this.state.newPhone}
            placeholder="Phone Number"
            onChangeText={(value) => this.setState({newPhone: value})}
          />
         
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => this.inputValidation()}>
            <Text style={styles.buttonText}>UPDATE</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Modal
            visible={this.state.Alert_Visibility}
            transparent={true}
            animationType={'fade'}
            onRequestClose={() => {
              this.cancelAlertBox(!this.state.Alert_Visibility);
            }}>
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <View style={styles.MainAlertView}>
                <Text style={styles.AlertTitle}>
                  Custom Alert Dialog Box Title.
                </Text>
                <View
                  style={{width: '100%', height: 0.5, backgroundColor: '#fff'}}
                />

                <Text style={styles.AlertMessage}> Are You Sure ?? </Text>

                <View
                  style={{width: '100%', height: 0.5, backgroundColor: '#fff'}}
                />

                <View style={{flexDirection: 'row', height: '30%'}}>
                  <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={this.okButton}
                    activeOpacity={0.7}>
                    <Text style={styles.TextStyle}> OK </Text>
                  </TouchableOpacity>

                  <View
                    style={{
                      width: 0.5,
                      height: '100%',
                      backgroundColor: '#fff',
                    }}
                  />

                  <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={() => {
                      this.cancelAlertBox(!this.state.Alert_Visibility);
                    }}
                    activeOpacity={0.7}>
                    <Text style={styles.TextStyle}> CANCEL </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#DAE0E2',
    marginTop:20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  formContainer: {
    marginTop: 15,
  },
  dateLabel: {
    fontSize: 20,
    //alignSelf:"center",
    width: 150,
  },
  header: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    paddingBottom: 50,
    textAlign: 'center',
    borderBottomColor: '#ffff',
  },
  textInput: {
    alignSelf: 'stretch',
    height: 40,
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: '#1769aa',
    paddingVertical: 15,
    borderRadius: 5,
    marginTop: 20,
    marginRight: 30,
    marginLeft: 30,
  },
  buttonText: {
    color: '#ffff',
    alignSelf: 'center',
  },
  dropdown: {
    color: '#fff',
  },
  MainAlertView: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1769aa',
    height: 200,
    width: '90%',
    borderColor: '#fff',
  },
  AlertTitle: {
    fontSize: 25,
    color: '#fff',
    textAlign: 'center',
    padding: 10,
    height: '28%',
  },
  AlertMessage: {
    fontSize: 22,
    color: '#fff',
    textAlign: 'center',
    textAlignVertical: 'center',
    padding: 10,
    height: '40%',
  },
  buttonStyle: {
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  TextStyle: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 22,
    marginTop: -5,
  },
});
