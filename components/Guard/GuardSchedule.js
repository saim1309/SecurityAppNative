import React, { Component } from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import {Dropdown} from 'react-native-material-dropdown';


export default class GuardSchedule extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    const params = this.props.route.params;
    const user_name = params.username
    return (
     <View style={StyleSheet.dropdown}>
         <Text>View Schedule {user_name}</Text>
     </View>
   );
  }
}

const style = StyleSheet.create({
  dropdown:{
    width:10,
    color:'red'
  },
})