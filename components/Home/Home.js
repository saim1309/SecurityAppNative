//import Torch from 'react-native-torch';
import React, { Component } from 'react';
import {View, Text, Tab, Navigator, StyleSheet, Image, TouchableOpacity,Alert,BackHandler} from 'react-native';
import {Button} from 'native-base';
//import { withNavigationFocus } from 'react-navigation';
//import { useIsFocused } from '@react-navigation/native';

 //import Panic from './Panic'

 export default class Home extends Component { 
    constructor(props) {
        super(props);
        this.state = {
            isTorchOn: false,  
            responseData:'',     
        };
        console.log("In constructor")
    }

    componentDidMount() {
        console.log("In home")
        this.backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
            Alert.alert("Logout", "Are you sure you want to logout?", [{ text: "Cancel", onPress: () => {}, style: "cancel" }, { text: "Logout", onPress: () => this.UserLogout() }], { cancelable: false });
            return true;
        });
    }
    componentDidAppear(){
        console.log("In component did appear")
        this.backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
            Alert.alert("Logout", "Are you sure you want to logout?", [{ text: "Cancel", onPress: () => {}, style: "cancel" }, { text: "Logout", onPress: () => this.UserLogout() }], { cancelable: false });
            return true;
        });
    }
    componentWillUnmount() {
        console.log("Home unmount")
        this.backHandler.remove();
    }
    UserLogout=async()=>{
        await fetch(global.hostUrl+"/users/logout", {
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
    navigateToNextScreen=(screenName,user_name)=>{
        this.componentWillUnmount()
        this.props.navigation.navigate(screenName, { username: user_name})
    }

    

    render() {
        const params = this.props.route.params;
        const user_name = params.username
        const isFocussed = this.props.navigation.isFocused()?console.log("focussed"):console.log('notfocussed');
        return (
            <View style={styles.container}>
             <Button style={styles.SignOut} full rounded success onPress={()=>{this.UserLogout()}}>
                    <Text style={styles.signOutText} >Sign Out</Text>
                </Button>
                <Text style={styles.welcome}>Hello {user_name}</Text>
                <View style={styles.gridContainer}>
                    <View style={styles.rowContainer}>
                        <View style={styles.LeftItem}>
                            <TouchableOpacity onPress={() => { this.props.navigation.navigate('ClockInOut', { username: user_name, age: 16 }) } }>
                                <Image
                                    style={styles.image}
                                    source={require('../../assets/timeClock.png')}
                                />
                                <Text style={styles.iconTitle}>Time Clock</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.RightItem}>
                            <TouchableOpacity onPress={() => { this.props.navigation.navigate('GuardSchedule', { username: user_name}) }}>
                                <Image
                                    style={styles.image}
                                    source={require('../../assets/createSchedule.jpg')}
                                />
                                <Text style={styles.iconTitle}>Schedule</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.bottomRowContainer}>
                        <View style={styles.LeftItem}>
                            <TouchableOpacity onPress={() => {this.navigateToNextScreen('Panic',user_name)}}>
                                <Image
                                    style={styles.image}
                                    source={require('../../assets/panic.png')}
                                />
                                <Text style={styles.iconTitle}>Panic Button</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.RightItem}>
                            <TouchableOpacity onPress={() => { this.props.navigation.navigate('WriteReport', { username: user_name }) }}>
                                <Image
                                    style={styles.image}
                                    source={require('../../assets/reports.png')}
                                />
                                <Text style={styles.iconTitle}>Reports and logs</Text>
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
    RightItem:{
        marginLeft:40,
    },
    bottomRowContainer:{
        flexDirection: "row",
        marginTop:100,
        marginBottom:0,
    },
    iconTitle:{
        alignSelf:"center",
        color:'#000',
        fontWeight:'bold',
        fontSize: 15
    }
});
