import React,{Component} from 'react';
import { Button, View, Text,TouchableOpacity, StyleSheet, Image,Alert,BackHandler } from 'react-native';
import Communications from 'react-native-communications';
//import { color } from 'react-native-reanimated';

export default class Panic extends React.Component{

//   componentDidMount() {
//     this.backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
//         return this.props.navigation.navigate("Home");
//     });
// }

// componentWillUnmount() {
//     this.backHandler.remove();
// }

  render(){
    const params = this.props.route.params;
    const user_name = params.username
    return(
      <View style={styles.container}>
        <Text style = {styles.buttonText}>Hello {user_name}</Text>    
        <Text style = {styles.buttonText}>What do you want to do???</Text>
        <View style = {styles.imageButtonContainer}>
          <TouchableOpacity onPress={() => Communications.textWithoutEncoding('5483337140',"There is an emergency..please contact")}>
            <Image
                style={styles.image}
                source={require('../../assets/sms2.png')}
            />
            <Text style = {styles.buttonText}>SMS</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Communications.phonecall('5483337140', true)}>
            <Image
                style={styles.image}
                source={require('../../assets/call.png')}
            />
            <Text style = {styles.buttonText}>CALL</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Communications.email("saimahmad1234@gmail.com",null,null,"EMERGENCY ALERT!!!","Thers is an emergency..please contact")}>
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
    backgroundColor: '#A4B0BD',
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
