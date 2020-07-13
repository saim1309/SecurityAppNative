import React from "react";
import { StyleSheet, Text, View, FlatList, Image, ActivityIndicator } from "react-native";
import { Card, CardItem } from "native-base";


export default class ViewScheduleAdmin extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            dataSource: []
        }
    }

    getUserApi = () => {
        return (
            /** Fetching Guard Names */
            fetch(global.hostUrl + '/shifts/viewAll', {
                method: 'GET',
            })
                .then((response) => response.json())
                .then((responseData) => {
                    console.log(responseData)
                    this.setState({
                        isLoading: false,
                        dataSource: this.state.dataSource.concat(responseData)
                    })
                })
                .catch((error) => console.log('Error : ', error))
        )
    }   
    _keyExtractor = (datasource, index) => datasource._id;

    componentDidMount() {
        this.getUserApi();
    }

    render() {
        //if it takes time to load data from api...it will show loading sign 
        if (this.state.isLoading) {
            return (
                <View style={styles.progress}>
                    <ActivityIndicator size="large" color="#01CBC6" />
                </View>
            );
        }
        //if all data is loaded up from api then data will be displayed
        return (
            <FlatList
                data={this.state.dataSource}
                keyExtractor={this._keyExtractor}
                renderItem={({ item }) => (
                    <Card>
                        <CardItem style={styles.eachItem} >
                            <View style={styles.userInfo}>
                                <Text style={styles.textStyles}>ID:                     {item._id}</Text>
                                <Text style={styles.textStyles}>Site Name:      {item.site_name}</Text>
                                <Text style={styles.textStyles}>Shift Timing:   {item.shift_slot}</Text>
                                <Text style={styles.textStyles}>Shift Date:       {item.date}</Text>
                                <Text style={styles.textStyles}>Guard Name:   {item.guard_name}</Text>
                                <Text style={styles.textStyles}>Assigned By:   {item.created_by}</Text>
                                
                            </View>
                        </CardItem>
                    </Card>
                )}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#A4B0BD"
    },
    progress: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    userInfo:{
        color:'#DAE0E2',
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