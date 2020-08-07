import React, { Component } from 'react'
import { Text, TouchableOpacity, View, StyleSheet, ActivityIndicator } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';

export default class AddSite extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            newSiteName: "",
            newSiteAddress: "",
            response:"",
            isLoading: false
        }
    }

    clearFields = (siteName,siteAddress) =>{
        this.refs[siteName].setNativeProps({text: ''});
        this.refs[siteAddress].setNativeProps({text: ''});
    }

    addNewSite = async() => {
        return (
            /** Fetching Guard Names */
            this.setState({isLoading:true}),
            fetch(global.hostUrl + '/sites/addSite', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    site_name: this.state.newSiteName,
                    site_address: this.state.newSiteAddress
                }),
            })
                .then((response) => response.text())
                .then((responseData) => {
                    console.log(responseData)
                    this.setState({
                        isLoading: false,
                        response:responseData
                    })
                })
                .catch(error => {
                    console.log("Error : ",error)
                    this.setState({isLoading:false})
                  })
        )

    }

    addSiteClicked = async() => {
        console.log("Name: ", this.state.newSiteName);
        console.log("Address: ", this.state.newSiteAddress);
        console.log("Response: ", this.state.response);
        if (this.state.newSiteName == "" || this.state.newSiteAddress == "") {
            alert('Please completely fill out the fields to add a site');
        }
        else {
            
            await this.addNewSite();
            alert(this.state.response);
            this.clearFields('siteName','siteAddress');  
        }
    }

    render() {
        if(this.state.isLoading){
            return(
                <View style={styles.ActivityIndicatorContainer}>
                    <ActivityIndicator size='large' color='##bc2b78'/>
                </View>
            )
        }
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Site Name"
                    ref={'siteName'}
                    onChangeText={(value) => this.setState({ newSiteName: value })}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="Site Address"
                    ref={'siteAddress'}
                    onChangeText={(value) => this.setState({ newSiteAddress: value })}
                />
                <TouchableOpacity style={styles.addButton} onPress={() => this.addSiteClicked()}>
                    <Text style={styles.buttonText}>Add Site</Text>
                </TouchableOpacity>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#DAE0E2',
        paddingLeft: 60,
        paddingRight: 60,
        justifyContent: 'center',
        alignContent: "center"

    },
    textInput: {
        alignSelf: 'stretch',
        height: 40,
        borderBottomColor: '#fff',
        borderBottomWidth: 1,
        marginBottom: 20,
        borderBottomColor:'black'
    },
    addButton: {
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
    ActivityIndicatorContainer:{
        justifyContent:"center",
        flex:1,
        alignItems:"center",
    }
})

