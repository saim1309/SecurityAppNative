//import Torch from 'react-native-torch';
import React, { Component } from 'react';
import {View, Text, Tab, Navigator, StyleSheet, Image, TouchableOpacity } from 'react-native';
import {Button} from 'native-base';

export default class AdminHome extends Component {
    
    constructor(props) {
        super(props);
        this.state = { 
            responseData:'',     
           
        };
    }

    UserLogout=async()=>{
        await fetch("http://192.168.0.16:1234/users/logout", {
             method: "DELETE"
           }) 
           .then((response) => response.text())
           .then((responseData) => {
             console.log(responseData)
             this.setState({response:responseData})
           })
           .catch(error => console.log("Error : ",error))
           this.props.navigation.navigate('Login')
    }

    render() {
        const params = this.props.route.params;
        const user_name = params.username
        return (
            <View style={styles.container}>
                <Button style={styles.SignOut} full rounded success onPress={()=>{this.UserLogout()}}>
                    <Text style={styles.signOutText} >Sign Out</Text>
                </Button>
                {<Text style={styles.welcome}>Welcome {user_name}</Text>}
                <View style={styles.gridContainer}>
                    <View style={styles.rowContainer}>
                        <View style={styles.CenterItem}>
                            <TouchableOpacity onPress={() => { this.props.navigation.navigate('RegisterUser', { username: user_name, age: 16 }) }}>
                                <Image
                                    style={styles.image}
                                    source={require('../../assets/registerUser.png')}
                                />
                                <Text style={styles.iconTitle}>Register Guard</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                    <View style={styles.rowContainer}>
                        <View style={styles.LeftItem}>
                            <TouchableOpacity /*onPress={() => { this.props.navigation.navigate('Schedule') }}*/>
                                <Image
                                    style={styles.image}
                                    source={require('../../assets/createSchedule.jpg')}
                                />
                                <Text style={styles.iconTitle}>Schedules</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.RightItem}>
                            <TouchableOpacity /*onPress={() => {this.props.navigation.navigate("ViewReports")}}*/>
                                <Image
                                    style={styles.image}
                                    source={require('../../assets/viewReports.png')}
                                />
                                <Text style={styles.iconTitle}>Security Records</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                    
                </View>
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
    gridContainer: {
        flex: 1,
        margin: 5,
        marginTop:25,
    },
    SignOut:{
        borderWidth:1,
        marginTop:20,
        borderRadius:5,
        backgroundColor: '#0a2f91',
        alignSelf:"flex-end",
        marginRight:10,
        width:70,
    },
    signOutText:{
        color:'#fff',
        fontWeight:'bold',
        alignSelf:'center',
        justifyContent:'center',
        alignContent:'center',
    },
    welcome:{
        fontSize:24,
        borderBottomWidth:1,
        marginTop:20,
        fontWeight:'bold'
    },
    rowContainer: {
        flexDirection: "row",
        marginTop:40,
    },
    image: {
        width: 150,
        height: 150,
        borderWidth:2,
        borderColor:'#000',
        borderRadius:10,
    },
    LeftItem:{
        marginLeft:0,
    },
    CenterItem:{
        alignSelf:"center",
        justifyContent:"center",
        alignItems:"center",
        marginLeft: 100

    },
    RightItem:{
        marginLeft:40,
    },
    bottomRowContainer:{
        flexDirection: "row",
        marginTop:100,
        marginBottom:0,
        alignSelf:'center'
    },
    iconTitle:{
        alignSelf:"center",
        color:'#000',
        fontWeight:'bold',
        fontSize: 15
    }
});

  //export default Home