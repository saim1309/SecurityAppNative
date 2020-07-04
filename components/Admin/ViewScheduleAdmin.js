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
            fetch(global.hostUrl + '/shifts/', {
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


    getGuardNameById = (_id)=>{
        return(
            /** Fetching Guard Names */
            
            fetch(global.hostUrl + '/users/getName', {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    _id: _id
                })
            })
                .then((response) => response.json())
                .then((responseData) => {
                    console.log(responseData)
                    var data = responseData.map(function (item) {
                        return {
                          value: item.first_name + item.last_name
                        };
                    })
                })
                .catch((error) => console.log('Error : ', error))
        )
    }

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
                        <CardItem>
                            <View style={styles.userinfo}>
                                <Text>ID: {item._id}</Text>
                                <Text>Site ID: {item.site_name}</Text>
                                <Text>Shift Timing: {item.shift_slot}</Text>
                                <Text>Shift Date: {item.date}</Text>
                                <Text>Guard Id: {item.guard_id}</Text>
                                
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
    userinfo:{

    }
});