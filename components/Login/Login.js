import React, {Component} from 'react';
import { StyleSheet, Text, View,Image, ImageBackground, Dimensions, StatusBar, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import bgImage from '../../assets/background.png'
import logo from '../../assets/logo1.png'
//import Home from './Home.js';

const {width:Width} = Dimensions.get('window')

export default class Login extends Component {
    static navigationOptions={
        header:null
    }

    constructor(props){
        super(props);
        this.emailInput = React.createRef();
        this.state={
            username:'',
            password:'',
            showPass: true,
            press:false,
            isAdmin: false,
            user:{},
            userAuthenticated:false,
            isLoading:true,

        };
    }
    componentDidMount(){
        this.setState({isLoading:false})
    }
      userAuthentication=async(username,password)=>{
            console.log('*************in userAuthentication fn***********************')
            await fetch("http://192.168.137.1:1234/users/login", {
             method: "POST",
             headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json'
             },
             body: JSON.stringify({
               email: username,
               password: password,
             })
           })
           .then((response) => response.json())
           .then((responseData) => {
            this.setState({isLoading:false})
            if(responseData.message =="Incorrect Email or Password"){
                this.setState({userAuthenticated:false})
            }
            else{
                this.setState({user:responseData, userAuthenticated:true})
            }
           })
           .catch(error => {
               console.log("Caught Error: ",error);
               this.setState({isLoading:false})
        })
    }
    showPass = () =>{
        if(this.state.press === false){
            this.setState({showPass:false, press:true})
        }
        else{
            this.setState({showPass:true, press:false})
        }
    }
     validation=async() =>{
        const{
            username,password
        } = this.state
        if(username=='' || password=='')
        {
            this.setState({isLoading:false})
            alert('Username or password cannot be empty');
            return false;
        }
        else{
            await this.userAuthentication(username, password)
            if(this.state.userAuthenticated==true){
                return true
            }
            else{
                alert("Wrong email or password")
                return false
            }
        }
    }

    clearFields = (emailInput,passwordInput) =>{
        this.refs[emailInput].setNativeProps({text: ''});
        this.refs[passwordInput].setNativeProps({text: ''});
        this.state.email=''
        this.state.password=''
      }

    navigateToHome=async(emailInput,passwordInput)=>{
        this.setState({isLoading:true})
        console.log("in navigateToHome...will go in validation fn");
        
        if(await this.validation())
        {
            this.state.user.is_admin ? this.props.navigation.navigate("AdminHome",{username:this.state.user.first_name}) : this.props.navigation.navigate("Home",{username:this.state.user.first_name});
            this.clearFields('emailInput','passwordInput')
        }
    }
    render(){
        if(this.state.isLoading){
            return(
                <View style={styles.ActivityIndicatorContainer}>
                    <ActivityIndicator size='large' color='##bc2b78'/>
                </View>
            )
        }
        const { navigate } = this.props.navigation;  
        return (      
           <ImageBackground source={bgImage} style={styles.backgroundContainer}>    
                <View style={styles.mainView}>
                    <View style={styles.logoContainer}>
                        <Image
                            style={styles.logo}
                            source={logo}  
                        />
                        <Text style={styles.logoText}>SECURITY APP</Text>
                    </View>
                    <View style={styles.formContainer}>
                        <View style={styles.container}>
                        <StatusBar
                            barStyle="light-content"
                        />
                        <View>
                        <Icon
                            name={'ios-person'}
                            size={28}
                            color={'rgba(255,255,255,0.7)'}
                            style= {styles.inputIcon}
                        />
                        <TextInput
                            onChangeText={(value) => this.setState({username:value})}
                            placeholder={"Email"}
                            ref={'emailInput'}
                            placeholderTextColor = 'rgba(25,255,255,0.7)'
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                            onSubmitEditing= {()=> this.passwordInput.focus()}
                            style={styles.input}
                        />
                    </View>              
                    <View>
                        <Icon
                            name={'ios-lock'}
                            size={28}
                            color={'rgba(255,255,255,0.7)'}
                            style= {styles.inputIcon}
                        />
                        <TextInput
                            placeholder={"password"}
                            secureTextEntry= {this.state.showPass}
                            ref={'passwordInput'}
                            placeholderTextColor = 'rgba(25,255,255,0.7)'
                            onChangeText={(value) => this.setState({password:value})}
                            style={styles.input}
                        />
                        <TouchableOpacity style={styles.eyeBtn} onPress={this.showPass.bind(this)}>
                            <Icon
                                name={this.state.press == false ? 'ios-eye-off' : 'ios-eye' }
                                size={26}
                                color={'rgba(255,255,255,0.7)'}
                            />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.loginButtonContainer} onPress={()=>this.navigateToHome('emailInput','passwordInput')}>
                        <Text style={styles.loginButtonText}>LOGIN</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </ImageBackground>    
);
}      
}
const styles = StyleSheet.create({
    backgroundContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'  
    },
    mainView:{
       
    },
    logoContainer:{
        alignItems: "center",
        marginBottom:50,
        justifyContent: "center"
    },
    logo:{
        width:100,
        height:100
    },
    logoText:{
        color: "#FFF",
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 10,
        opacity: 0.6,
        fontSize : 20
    },
    formContainer:{
        width: Width -55,
        height:200,  
    },
    input:{
      height:40,
      backgroundColor: 'rgba(25,255,255,0.35)',
      marginBottom: 10,
      color: 'rgba(255,255,255,0.7)',
      paddingHorizontal:35
  },
  inputIcon:{
    position:'absolute',
    top:8,
    left:5
  },
  eyeBtn:{
    position:'absolute',
    right:10,
    top: 5
  },
  loginButtonContainer:{
    backgroundColor: "#2890b9",
    paddingVertical:15,
    borderRadius:5,
    marginTop:10
  },
  loginButtonText:{
      textAlign:"center",
      color: "#FFF",
      fontWeight: "bold"
  },
  ActivityIndicatorContainer:{
      justifyContent:"center",
      flex:1,
      alignItems:"center",

  }
  });

  //export default Login