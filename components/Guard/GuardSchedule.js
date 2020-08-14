import React from "react";
import { StyleSheet, Text, View, FlatList, Image, ActivityIndicator } from "react-native";
import { Card, CardItem } from "native-base";


export default class ViewScheduleAdmin extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            dataSource: [],
            noShift:false
        }
    }

     /** Fetching schedule for the logged in guard*/
    getUserApi = () => {
        return (
           
            fetch(global.hostUrl + '/shifts/viewForUser', {
                method: 'GET',
            })
                .then((response) => response.json())
                .then((responseData) => {
                    console.log(responseData)
                    this.setState({
                        isLoading: false,
                        dataSource: this.state.dataSource.concat(responseData)
                         
                    })
                    console.log(responseData.length)
                    if(responseData.length==0){
                        console.log("Inside If")
                        this.setState({noShift:true})                   
                    }
                })
                .catch((error) => console.log('Error : ', error))
        )
    }   
    _keyExtractor = (datasource, index) => datasource._id;

    /**Calling function to fetch schedule on component mount */
    componentDidMount() {
        this.getUserApi();
    }

    render() {
        /*if it takes time to load data from api...it will show loading sign */
        if (this.state.isLoading) {
            return (
                <View style={styles.progress}>
                    <ActivityIndicator size="large" color="#01CBC6" />
                </View>
            );
        }
        /*if all data is loaded up from api then data will be displayed*/
        if(this.state.noShift){
            return(
                <View style={styles.container}>
                    <Text style={styles.NoShift}>You do not have any Shifts</Text>
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
                            <CardItem style={styles.eachItem}>
                                <View style={styles.userinfo}>
                                <Text style={styles.textStyles}>ID:                     {item._id}</Text>
                                    <Text style={styles.textStyles}>Site Name:      {item.site_name}</Text>
                                    <Text style={styles.textStyles}>Shift Timing:   {item.shift_slot}</Text>
                                    <Text style={styles.textStyles}>Shift Date:       {item.date}</Text>
                                    <Text style={styles.textStyles}>Assigned By:   {item.created_by}</Text>                            
                                </View>
                            </CardItem>
                        </Card>
                    )}
                />
            );

        }

        
    }
}

/**Styling */

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        // /backgroundColor: "#A4B0BD"
    },
    progress: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    NoShift:{
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
        fontFamily:'sans-serif',
        fontWeight:'bold',
        color:'#616C6F',
    }
});