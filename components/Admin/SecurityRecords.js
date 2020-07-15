import React,{Component} from 'react';
import { Button, View, Text, StyleSheet, TouchableOpacity } from 'react-native';


export default class SecurityRecords extends Component {
   render(){   
    return (
      <View style={styles.container}>
          <TouchableOpacity style = {styles.Button} onPress={() => {this.props.navigation.navigate('GuardDetails')}}>
            <Text style={styles.text}>Guards Details</Text>
          </TouchableOpacity>
          <TouchableOpacity style = {styles.Button} onPress={() => {this.props.navigation.navigate('ViewReports')}}>
            <Text style={styles.text}>View Reports</Text>
          </TouchableOpacity>
          <TouchableOpacity style = {styles.Button} onPress={() => {this.props.navigation.navigate('ViewClockInOut')}}>
            <Text style={styles.text}>Check Clock In/Out</Text>
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
    backgroundColor:"#DAE0E2"
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
      marginBottom:40
      
  },
  text:{
      alignSelf:"center",
      color: "#fff",
      fontSize:30,
      paddingHorizontal:10,
      paddingBottom:10
  }
});

//export default Reports