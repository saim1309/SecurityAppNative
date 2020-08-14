import React from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, Platform,TextInput,ActivityIndicator} from 'react-native';
import {TouchableOpacity } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default class RegisterUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        newFirstName: "",
        newLastName: "",
        newEmail: "",
        newPassword: "",
        newConfirmPassword: "",
        newPhoneNumber: "",
        response:'',
        isLoading:true,
    }
  }

  /**Function to clear all the fields once the register is pressed */
  clearFields = (fname,lname,phoneNumber,email,password,confirmPassword) =>{
      this.refs[fname].setNativeProps({text: ''});
      this.refs[lname].setNativeProps({text: ''});
      this.refs[phoneNumber].setNativeProps({text: ''});
      this.refs[email].setNativeProps({text: ''});
      this.refs[password].setNativeProps({text: ''});
      this.refs[confirmPassword].setNativeProps({text: ''});
      this.state.newFirstName=''
      this.state.newLastName=''
      this.state.newEmail=''
      this.state.newPassword=''
      this.state.newConfirmPassword=''
      this.state.newPhoneNumber=''
  }

  /**Make isloading to false when the component is mounted */
  componentDidMount(){
    this.setState({isLoading:false})
  }

  /**Calling an api to register the guard details */
  UserRegistration=async()=>{
    await fetch(global.hostUrl+"/users/register", {
             method: "POST",
             headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json'
             },
             body: JSON.stringify({
                first_name:this.state.newFirstName,
                last_name :this.state.newLastName,
                email:this.state.newEmail.toLowerCase(),
                password:this.state.newPassword,
                phone:this.state.newPhoneNumber
             })
           }) 
           .then((response) => response.text())
           .then((responseData) => {
              console.log(responseData)
              this.setState({isLoading:false})
              this.setState({response:responseData})
              console.log("After setting the state")
           })
           .catch(error => {
             console.log("Error : ",error)
             this.setState({isLoading:false})
           })
  }

  /**Front-end validation for the input provided by the user */
  inputValidation = async(fname,lname,phoneNumber,email,password,confirmPassword) => {

      let regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      let regPhone = /^\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$/;

      if (this.state.newFirstName == "" || this.state.newLastName == "" || this.state.newEmail == "" || this.state.newPassword == "" || this.state.newConfirmPassword == "" || this.state.newPhoneNumber == "") {
        alert('Please completely fill out the form to register a guard');
      }
      else if(this.state.newFirstName.length<2 || this.state.newLastName.length<2){
        alert('Minimum 2 characters for both first and last name');
      }
      else if (this.state.newPassword != this.state.newConfirmPassword) {
        alert('both password should be same');
      }
      else if (regEmail.test(this.state.newEmail) === false) {
        alert('Email invalid');
      }
      else if (this.state.newPassword.length < 5) {
        alert('Password length should be min 5 characters')
      }
      else if(regPhone.test(this.state.newPhoneNumber) === false){
        console.log(this.state.newPhoneNumber)
        alert('Phone number invalid')
    }
    else {
      var formattedPhoneNumber = this.state.newPhoneNumber.replace(regPhone, "($1) $2-$3");
      console.log(formattedPhoneNumber);
      this.state.newPhoneNumber = formattedPhoneNumber;
      this.setState({isLoading:true})
      await this.UserRegistration();
      alert(this.state.response);
      this.clearFields('fname','lname','phoneNumber','email','password','confirmPassword');     
    }
  }

  /**UI elements  */
  render() {
    /**show the loading icon when the component is in loading state  */
    if(this.state.isLoading){
      return(
          <View style={styles.ActivityIndicatorContainer}>
              <ActivityIndicator size='large' color='##bc2b78'/>
          </View>
      )
  }
    return (
      <KeyboardAwareScrollView enableOnAndroid style={styles.container}>
        <View style={styles.formContainer}>
          <TextInput
              style={styles.textInput}
              placeholder="Enter First Name"
              ref={'fname'}
              autoCompleteType = "off"
              placeholderTextColor='#616C6F'
              onChangeText={(value) => this.setState({ newFirstName: value })}
          />
          <TextInput
              style={styles.textInput}
              placeholder="Enter Last Name"
              ref={'lname'}
              autoCompleteType = "off"
              placeholderTextColor='#616C6F'
              onChangeText={(value) => this.setState({ newLastName: value })}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Enter Phone number"
            placeholderTextColor='#616C6F'
            ref={'phoneNumber'}
            keyboardType = "number-pad"
            onChangeText={(value) => this.setState({ newPhoneNumber: value })}
          />
          <TextInput
              style={styles.textInput}
              placeholder="Enter Email"
              placeholderTextColor='#616C6F'
              ref={'email'}
              onChangeText={(value) => this.setState({ newEmail: value })}
          />
          <TextInput
              style={styles.textInput}
              secureTextEntry={true}
              placeholder="Enter Password (min 5 characters)"
              placeholderTextColor='#616C6F'
              ref={'password'}
              onChangeText={(value) => this.setState({ newPassword: value })}
          />
          <TextInput
              style={styles.textInput}
              secureTextEntry={true}
              placeholder="Confirm Password"
              placeholderTextColor='#616C6F'
              ref={'confirmPassword'}
              onChangeText={(value) => this.setState({ newConfirmPassword: value })}
          />
          <TouchableOpacity style={styles.loginButton} 
              onPress={() => this.inputValidation('fname','lname','phoneNumber','email','password','confirmPassword')}>
              <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

/**Styling */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DAE0E2',
    paddingLeft: 60,
    paddingRight: 60,
  },
  formContainer: {
    marginTop: 70,
  },
  textInput: {
    alignSelf: 'stretch',
    height: 40,
    borderBottomColor: '#000',
    borderBottomWidth: 2,
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: "#2475B0",
    paddingVertical: 15,
    borderRadius: 5,
    marginTop: 20,
    marginRight: 30,
    marginLeft: 30,
  },
  buttonText: {
    color: '#ffff',
    alignSelf: 'center'
  },
  ActivityIndicatorContainer:{
      justifyContent:"center",
      flex:1,
      alignItems:"center",

  }
});