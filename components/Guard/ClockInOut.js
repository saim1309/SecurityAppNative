import React,{Component} from 'react';
import { Button, View, Text, StyleSheet, TouchableOpacity } from 'react-native';


export default class ClockInOut extends Component {

  clockIn=()=>{
    var time = Date.now.toString('dd/MM/yyyy HH:mm:ss')
    alert('user clocked in at '+time)
  }
  render(){
    // const user_name = route.params.username;
    // const age = route.params.age;
    const params = this.props.route.params;
    const user_name = params.username
    const age = params.age;
    return (
      <View style={styles.container}>
          <TouchableOpacity style = {styles.Button} onPress={()=>{this.clockIn()}}>
            <Text style={styles.text}>Clock In</Text>
          </TouchableOpacity>
          <TouchableOpacity style = {styles.Button}>
            <Text style={styles.text}>Clock Out</Text>
          </TouchableOpacity>
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
    backgroundColor:"#A4B0BD"
  },
  Button:{
      alignSelf: "center",
      borderColor: "#000",
      borderWidth:2,
      color: "#841584",
      borderRadius :12,
      backgroundColor:"#008CBA",
      width:350 ,
      height : 60,
      marginTop:30,
      marginBottom:120
      
  },
  text:{
      alignSelf:"center",
      color: "#fff",
      fontSize:30,
      paddingHorizontal:10,
      paddingBottom:10
  }
});

  //export default ClockInOut