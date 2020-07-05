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
  componentDidMount() {
    /**fetching site names */
    fetch(global.hostUrl + '/sites/', {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData)
        var data = responseData.map(function (item) {
          return {
            value: item.site_name,
          };
        });
        console.log(data);

        this.setState({ siteNames: data });
      })
      .catch((error) => console.log('Error : ', error));
    }

  render(){
    const params = this.props.route.params;
    const user_name = params.username
    const age = params.age;
    return (
      <View style={styles.container}>
        <View>
          <Dropdown
            style= {styles.dropdown}
            dropdownOffset={{ top: 10, left: 20 }}
            dropdownMargins={{ min: 10, max: 50 }}
            containerStyle={{
              borderWidth: 2,
              borderColor: 'black',
              borderRadius: 5,
              width: Width * 0.9,
              height: 50,
              paddingRight: 10,
              backgroundColor:'#008CBA',
              marginBottom: 20,
              paddingLeft:100
              
            }}
            rippleCentered={true}
            placeholder='Select Site'
            placeholderTextColor='#fff'
            inputContainerStyle={{ borderBottomColor: 'transparent' }}
            data={this.state.siteNames}
            valueExtractor={({ value }) => value}
            onChangeText={(value) => {
              this.setState({ selectedSiteName: value });
            }}
          />
        </View>
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
