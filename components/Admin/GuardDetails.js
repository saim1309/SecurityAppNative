import React,{Component} from 'react';
import { Button, View, Text, FlatList, ActivityIndicator,StyleSheet } from 'react-native';
import { Card, CardItem } from "native-base";


export default class GuardDetails extends Component {
   
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            dataSource: [],
            noGuard:false
        }
    }
    
    /**Calling the function on component mount */
    componentDidMount(){
        this.getGuardDetails();
    }

    /**Function to fetch all the details of the guard using api */
    getGuardDetails = ()=>{
        console.log('inside  guard details api');
        return (
          /** Fetching Admin Phone No */
          fetch(global.hostUrl + '/users/guards', {
              method: 'POST',
          })
            .then((response) => response.json())
            .then((responseData) => {
                console.log(responseData)
                this.setState({
                isLoading: false,
                dataSource: this.state.dataSource.concat(responseData)
                })
                if(responseData.length==0){
                    console.log("Inside If")
                    this.setState({noGuard:true})                   
                }
            })
            .catch((error) => console.log('Error : ', error))
        )
      }
      _keyExtractor = (datasource, index) => datasource._id;
    
    render(){   
        //if it takes time to load data from api...it will show loading sign 
        if (this.state.isLoading) {
            return (
                <View style={styles.progress}>
                    <ActivityIndicator size="large" color="#01CBC6" />
                </View>
            );
        }
        //if all data is loaded up from api then data will be displayed
        if(this.state.noGuard){
            return(
                <View style={styles.container}>
                    <Text style={styles.NoShift}>No Guards Added!</Text>
                </View> 
            )
        }
        else{
            return (
                <FlatList
                    data={this.state.dataSource}
                    keyExtractor={this._keyExtractor}
                    renderItem={({ item }) => (
                        <Card>
                            <CardItem style={styles.eachItem} >
                                <View style={styles.userInfo}>
                                    <Text style={styles.textStyles}>First Name:     {item.first_name}</Text>
                                    <Text style={styles.textStyles}>Last Name:      {item.last_name}</Text>
                                    <Text style={styles.textStyles}>Email:                {item.email}</Text>
                                    <Text style={styles.textStyles}>Phone:              {item.phone}</Text>
                                </View>
                            </CardItem>
                        </Card>
                    )}
                />
            );
        }
   }
  }



  const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    progress: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    userInfo:{
        color:'#DAE0E2',
    },
    noGuard:{
        flex: 1,
        fontSize:24,
        position:"absolute",
        marginLeft:40,
        fontFamily:"Times New Roman"
    },
    eachItem:{
        borderWidth:2,
        borderRadius:10,
        borderColor:'#1287A5'
    },
    textStyles:{
        fontSize:17,
        fontFamily:'Arial',
        fontWeight:'bold',
        color:'#616C6F',
    }
    
});