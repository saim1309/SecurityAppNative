import React from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Dropdown } from 'react-native-material-dropdown';
import Modal from 'react-native-modal';

export default class UpdateUser extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            newName: "",
            newEmail: "",
            newpassword: "",
            newconfirmpassword: "",
            user: "default",
            Alert_Visibility: false
        }
    }

    myAlert = () => {
        console.log('inside myAlert')
        
        this.state.Alert_Visibility = true;
        //this.setState.Alert_Visibility = {Alert_Visibility:true}
        console.log(this.state.Alert_Visibility)
    }

    deleteValidation = () => {
        if (this.state.user !== "default") {
            //custom alert function
            myAlert();
            //send the name to Db using api getUserData and fetch record from db
            //pop up alert with delete and cancel
            //if delete pressed send another api deleteUserData to delete record from Db 
        }
    }

    inputValidation = () => {
        console.log("Name: ", this.state.newName);
        console.log("Email: ", this.state.newEmail);
        console.log("newpassword: ", this.state.newpassword);
        console.log("confirm password: ", this.state.newconfirmpassword);


        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (this.state.newName == "" || this.state.newEmail == "" || this.state.newpassword == "" || this.state.newconfirmpassword == "") {
            alert('all fields are mandatory');
        }
        else if (this.state.newpassword != this.state.newconfirmpassword) {
            alert('both password should be same');
        }
        else if (reg.test(this.state.newEmail) === false) {
            alert('Email invalid');
        }
        else if (this.state.newpassword.length < 5) {
            alert('Password length should be min 5 characters')
        }
        else {
            alert('register is pressed after successful validations');
        }

    }

    render() {
        let data = [{
            value: 'Zeefa'
        },
        { value: 'Saim' },
        {
            value: 'Suhail'
        }];
        return (
            <KeyboardAwareScrollView enableOnAndroid style={styles.container}>
                <View>
                    <Dropdown style={styles.dropdown}
                        label='Name'
                        data={data}
                        onChangeText={(value) => this.setState({ user: value })}
                    />
                    {/*call api getUserData to fetch data from db as soon as name is selected*/}
                    <Text>{this.state.user}</Text>
                </View>
                <View style={styles.formContainer}>
                    <Text style={{ color: "#fff", marginBottom: 10, fontWeight: "bold", fontSize: 20 }}>Details:</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Name"
                        onChangeText={(value) => this.setState({ newName: value })}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder="Email"
                        onChangeText={(value) => this.setState({ newEmail: value })}
                    />
                    <TextInput
                        style={styles.textInput}
                        secureTextEntry={true}
                        placeholder="Enter new password"
                        onChangeText={(value) => this.setState({ newpassword: value })}
                    />
                    <TextInput
                        style={styles.textInput}
                        secureTextEntry={true}
                        placeholder="Confirm new password"
                        onChangeText={(value) => this.setState({ newconfirmpassword: value })}
                    />
                    <TouchableOpacity style={styles.loginButton} onPress={() => this.inputValidation()}>
                        <Text style={styles.buttonText}>UPDATE</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.loginButton} onPress={() => this.myAlert()}>
                        <Text style={styles.buttonText}>DELETE</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <Modal
                        visible={this.state.Alert_Visibility}
                        transparent={true}
                        animationType={"fade"}
                        onRequestClose={() => { this.cancelAlertBox(!this.state.Alert_Visibility) }}
                    >
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

                            <View style={styles.MainAlertView}>

                                <Text style={styles.AlertTitle}>Custom Alert Dialog Box Title.</Text>
                                <View style={{ width: '100%', height: 0.5, backgroundColor: '#fff' }} />

                                <Text style={styles.AlertMessage}> Are You Sure ?? </Text>

                                <View style={{ width: '100%', height: 0.5, backgroundColor: '#fff' }} />

                                <View style={{ flexDirection: 'row', height: '30%' }}>
                                    <TouchableOpacity style={styles.buttonStyle} onPress={this.okButton} activeOpacity={0.7} >
                                        <Text style={styles.TextStyle}> OK </Text>
                                    </TouchableOpacity>

                                    <View style={{ width: 0.5, height: '100%', backgroundColor: '#fff' }} />

                                    <TouchableOpacity style={styles.buttonStyle} onPress={() => { this.cancelAlertBox(!this.state.Alert_Visibility) }} activeOpacity={0.7} >
                                        <Text style={styles.TextStyle}> CANCEL </Text>
                                    </TouchableOpacity>
                                </View>

                            </View>
                        </View>
                    </Modal>
                </View>
            </KeyboardAwareScrollView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#74B9FF',
        paddingLeft: 60,
        paddingRight: 60,
    },
    formContainer: {
        marginTop: 70,
    },
    header: {
        fontSize: 24,
        color: '#fff',
        fontWeight: 'bold',
        paddingBottom: 50,
        textAlign: "center",
        borderBottomColor: '#ffff',
    },
    textInput: {
        alignSelf: 'stretch',
        height: 40,
        borderBottomColor: '#ffff',
        borderBottomWidth: 1,
        marginBottom: 20,
    },
    loginButton: {
        backgroundColor: "#1769aa",
        paddingVertical: 15,
        borderRadius: 5,
        marginTop: 20,
        marginRight: 30,
        marginLeft: 30,
    },
    buttonText: {
        color: '#ffff',
        alignSelf: 'center'
    },
    dropdown: {
        color: '#fff',
    },
    MainAlertView: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#1769aa",
        height: 200,
        width: '90%',
        borderColor: '#fff',
    },
    AlertTitle: {
        fontSize: 25,
        color: "#fff",
        textAlign: 'center',
        padding: 10,
        height: '28%'
    },
    AlertMessage: {
        fontSize: 22,
        color: "#fff",
        textAlign: 'center',
        textAlignVertical: 'center',
        padding: 10,
        height: '40%'
    },
    buttonStyle: {
        width: '50%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    TextStyle: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 22,
        marginTop: -5
    }
});