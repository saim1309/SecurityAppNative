import React,{Component} from 'react';
import { StyleSheet, View, Text, TextInput} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {Button} from 'native-base';


export default class WriteReports extends Component {

  constructor(props){
    super(props);
    this.state={
    };
  }

  SubmitPressed=()=>{
    alert('Report Submitted Successfully');
  }
   render(){
    const params = this.props.route.params;
    const user_name = params.username
    return (
      <View style={styles.container}>
          <Text 
            style={styles.Subject}>Write a Subject
          </Text>
          <TextInput 
            style={styles.SubjectTextField}>
          </TextInput>
          <Text 
            style={styles.Subject}>Write a Brief Report
          </Text>
          <TextInput 
            style={styles.ReportTextField}>
          </TextInput>
          <Button style={styles.Submit} full rounded success onPress={()=>{this.SubmitPressed()}}>
            <Text>Submit</Text>
          </Button>
      </View>


    );
   }
  }

  const styles=StyleSheet.create({

    container:{
      alignContent:"center",
    },
    Subject:{
      fontSize:24,
      marginTop:50,
      fontWeight:'bold',
    },
    SubjectTextField:{
      marginRight:5,
      marginLeft:5,
      borderWidth:2,
      height:50,
      textAlignVertical:'top',
      padding:5,
    },
    ReportTextField  :{
      marginRight:5,
      marginLeft:5,
      borderWidth:2,
      height:300,
      fontWeight:'bold',
      textAlignVertical:'top',
      padding:5,
    },
    Submit:{
      borderWidth:1,
      marginTop:20,
      borderRadius:5,
      alignSelf:"center",
      marginRight:10,
      width:100,
    }

  });

//export default Reports