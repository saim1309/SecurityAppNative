import React,{Component} from 'react';
import { StyleSheet, View, Text, TextInput, ActivityIndicator} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {Button} from 'native-base';
import ElevatedView from 'react-native-elevated-view'
import moment from 'moment'


export default class WriteReports extends Component {
  constructor(props){
    super(props);
    this.state={
      isLoading:false,
      subject:'',
      description:''
    };
  }

  SubmitPressed=async()=>{
    if(this.state.subject=='' || this.state.description==''){
      alert('Please completely fill out the form to submit the report.');
    }
    else{
      this.setState({isLoading:true})
      await fetch(global.hostUrl+"/reports/addReport", {
        method: "POST",
        headers: { 
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          date:moment().format('yyyy-MM-DD'), 
          subject:this.state.subject,
          description:this.state.description,
        })
      }) 
      .then((response) => response.text())
      .then((responseData) => {
         console.log(responseData)
         this.setState({isLoading:false})
         this.setState({response:responseData, subject:'',description:''})
         console.log("After setting the state")
         alert(responseData)
      })
      .catch(error => {
        console.log("Error : ",error)
        this.setState({isLoading:false})
      })
      
    }
    
  }
   render(){
    const params = this.props.route.params;
    const user_name = params.username
    if (this.state.isLoading) {
      return (
          <View style={styles.progress}>
              <ActivityIndicator size="large" color="#01CBC6" />
          </View>
      );
  }
  else{
    return (
      <View style={styles.container}>
      <ElevatedView
          elevation={10}
          style={styles.stayElevated}>
           <Text 
            style={styles.Subject}>Write a Subject
          </Text>
          <TextInput 
            style={styles.SubjectTextField}
            onChangeText={(value) => this.setState({ subject: value })}
            multiline={true}
            maxLength={50}
            fontSize={17}>

          </TextInput>
          <Text 
            style={styles.Subject}>Write a Brief Report
          </Text>
          <TextInput 
            style={styles.ReportTextField}
            onChangeText={(value) => this.setState({ description: value })}
            multiline={true}
            maxLength={100}
            fontSize={17}>
          </TextInput>
          <Button style={styles.Submit} full rounded success onPress={()=>{this.SubmitPressed()}}>
            <Text style={styles.SubmitText}>Submit</Text>
          </Button>
        </ElevatedView>
      </View>


    );
  }
   
   }
  }

  const styles=StyleSheet.create({

    container:{
      alignContent:"center",
      backgroundColor:'#93dffa'
    },
    Subject:{
      fontSize:18,
      marginTop:30,
      alignSelf:'center',
      fontWeight:'bold',
      color: '#535C68'
    },
    SubjectTextField:{
      marginLeft:30,
      marginRight:30,
      marginTop:15,
      borderWidth:2,
      height:50,
      textAlignVertical:'top',
      paddingLeft:10,
      paddingRight:10,
      paddingTop:10,
      elevation:5,
      borderColor:'#93dffa'

    },
    stayElevated: {
      //width: 100,
      //height: 100,
      marginTop: 50,
      marginLeft:20,
      marginRight:20,
      marginBottom:100,
      backgroundColor: 'white'
    },
    ReportTextField :{
      marginLeft:30,
      marginRight:30,
      marginTop:15,
      borderWidth:2,
      height:300,
      textAlignVertical:'top',
      paddingTop:10,
      paddingLeft:10,
      paddingRight:10,
      elevation:5,
      borderColor:'#93dffa'
    },
    Submit:{
      borderWidth:1,
      marginTop:20,
      borderRadius:5,
      alignSelf:"center",
      marginRight:10,
      marginBottom:20,
      width:100,
      backgroundColor:'#2475B0'
    },
    SubmitText:{
      color:'#fff'
    }

  });

//export default Reports