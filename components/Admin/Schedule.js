import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import CreateSchedule from './CreateSchedule' 

export default class Schedule extends React.Component {
    render(){
      return (
        <View style={styles.container}>
          <TouchableOpacity style = {styles.Button} onPress={() => {this.props.navigation.navigate('CreateSchedule')}}>
            <Text style={styles.text}>Create Schedule</Text>
          </TouchableOpacity>
          <TouchableOpacity style = {styles.Button} onPress={() => {this.props.navigation.navigate('ViewScheduleAdmin')}}>
            <Text style={styles.text}>View Schedule</Text>
          </TouchableOpacity>
          <TouchableOpacity style = {styles.Button} onPress={() => {this.props.navigation.navigate('AddSite')}}>
            <Text style={styles.text}>Add Site</Text> 
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