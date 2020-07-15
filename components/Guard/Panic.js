import React,{Component} from 'react';
import { Button, View, Text,TouchableOpacity, StyleSheet, Image,Alert,BackHandler } from 'react-native';
import SendSMS from 'react-native-sms'
import Communications from 'react-native-communications';
//import { color } from 'react-native-reanimated';

export default class Panic extends React.Component{

  constructor(props) {
    super(props)
    this.state = {
        adminPhoneNumber: "",
        adminEmails:[]
    }
}

  componentDidMount(){
    //this.getAdminPhoneNumber();
    this.getAdminEmail();
  }

  getAdminEmail = ()=>{
    console.log('inside  phone number api');
    return (
      /** Fetching Admin Phone No */
      fetch(global.hostUrl + '/users/email', {
          method: 'POST',
      })
          .then((response) => response.json())
          .then((responseData) => {
              console.log(responseData)
              
              this.setState({
                //adminEmails: this.state.adminEmails.concat(responseData)
                adminEmails: responseData.email
              })
              console.log('checking email state',this.state.adminEmails)
          })
          .catch((error) => console.log('Error : ', error))
    )
  }

  getAdminPhoneNumber = () =>{
    console.log('inside  phone number api');
    return (
      /** Fetching Admin Phone No */
      fetch(global.hostUrl + '/users/phoneNumber', {
          method: 'POST',
      })
          .then((response) => response.json())
          .then((responseData) => {
              console.log(responseData)
              this.setState({
                adminPhoneNumber: respons     eData.phone
              })
              //console.log('checkig state',this.state.adminPhoneNumber)
          })
          .catch((error) => console.log('Error : ', error))
  )
  }

  render(){
    const params = this.props.route.params;
    const user_name = params.username
    return(
      <View style={styles.container}>
        <Text style = {styles.buttonText}>Hello {user_name}</Text>    
        <Text style = {styles.buttonText}>What do  want to do???</Text>
        <View style = {styles.imageButtonContainer}>
          <TouchableOpacity onPress={() => SendSMS.send({
            body: 'EMERGENCY!',
            recipients: [this.state.adminPhoneNumber],
            successTypes: ['sent', 'queued'],
            allowAndroidSendWithoutReadPermission: true
          },(completed, cancelled, error) => {
            console.log('SMS Callback: completed: ' + completed + ' cancelled: ' + cancelled + 'error: ' + error);
          }
          )}>
            <Image
                style={styles.image}
                source={require('../../assets/sms2.png')}
            />
            <Text style = {styles.buttonText}>SMS</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Communications.phonecall(this.state.adminPhoneNumber, true)}>
            <Image
                style={styles.image}
                source={require('../../assets/call.png')}
            />
            <Text style = {styles.buttonText}>CALL</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Communications.email([this.state.adminEmails],null,null,"EMERGENCY ALERT!!!","Thers is an emergency..please contact")}>
            <Image
                style={styles.image}
                source={require('../../assets/email1.png')}
            />
            <Text style = {styles.buttonText}>MAIL</Text>
          </TouchableOpacity>
        </View>
        
      </View>
    ); 
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DAE0E2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 150,
    height: 150,
    borderWidth:2,
    borderColor:'#000',
    borderRadius:10,
    marginBottom:10,
    marginTop: 20
    
  },
imageButtonContainer:{
  alignSelf: "center"
},
buttonText:{
  alignSelf:"center",
  color:"#192A56",
  fontWeight:"bold",
  fontSize:20,
  fontFamily:"sans-serif-condensed"
}
})

//export default Panic;
