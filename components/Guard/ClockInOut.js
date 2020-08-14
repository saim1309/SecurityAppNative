import React,{Component} from 'react';
import { Dropdown } from 'react-native-material-dropdown';
import { Button, View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import moment from 'moment'


const { width: Width } = Dimensions.get('window');
export default class ClockInOut extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedSiteName: '',
      siteNames: [],
    };
  }

  /**Calling API to update the clock in time */
  clockIn=()=>{
    console.log(new Date().toLocaleDateString('yyyy-MM-dd'))
    fetch(global.hostUrl+"/shifts/clockin", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        date:moment().format('yyyy-MM-DD'),
        site_name:this.state.selectedSiteName
      })
    }) 
    .then((response) => response.text())
    .then((responseData) => {
       console.log(responseData)
       alert(responseData)
    })
    .catch(error =>{
      console.log("Error : ",error)
      alert(error)
    } )
    
  }

  /*handling clock out functionality*/
  clockOut=()=>{
    /*fetch url for clock out api from node*/
    fetch(global.hostUrl+"/shifts/clockout", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      /*sending date and site name as parameter to api*/
      body: JSON.stringify({
        date:moment().format('yyyy-MM-DD'),
      })
    }) 
    /*collecting back response from api and converting in text*/
    .then((response) => response.text())
    .then((responseData) => {
       /*alerting back the response getting back from api*/
       alert(responseData)
    })
    /*handling error from api in catch block*/
    .catch(error =>{
      console.log("Error : ",error)
      alert(error)
    } )
    
  }
 
  /**Rendering of UI elements */

  render(){
    const params = this.props.route.params;
    const user_name = params.username
    const age = params.age;
    return (
      <View style={styles.container}>
        <TouchableOpacity style = {styles.Button} onPress={()=>{this.clockIn()}}>
          <Text style={styles.text}>Clock In</Text>
          </TouchableOpacity>
          <TouchableOpacity style = {styles.Button}  onPress={()=>{this.clockOut()}}>
            <Text style={styles.text}>Clock Out</Text>
          </TouchableOpacity>
        </View>
    );
  }
}

/**Styling */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DAE0E2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  siteDropdown:{
    flexDirection:'row',
    marginTop:80,
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
      marginTop:50,
      marginBottom:50
      
  },
  dateLabel: {
    fontSize: 20,
    //alignSelf:"center",
    width: 150,
    fontWeight:'bold',
    marginRight:0,
    
  },
  text:{
      alignSelf:"center",
      color: "#fff",
      fontSize:30,
      paddingHorizontal:10,
      paddingBottom:10
  },
  dropdown:{
    color:'#fff',
    fontSize:25,
    marginLeft:0,
  }
});
