import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';
import {Card, CardItem} from 'native-base';

export default class ViewReports extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: [],
      noShift: false,
    };
  }

  getUserApi = () => {
    return (
      /** Fetching Guard Names */
      fetch(global.hostUrl + '/reports/viewReport', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          site_name: 'Costco',
        }),
      })
        .then((response) => response.json())
        .then((responseData) => {
          console.log(responseData);
          this.setState({
            isLoading: false,
            dataSource: this.state.dataSource.concat(responseData),
          });
          if (responseData.length == 0) {
            console.log('Inside If');
            this.setState({noShift: true});
          }
        })
        .catch((error) => console.log('Error : ', error))
    );
  };
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
    if (this.state.noShift) {
      return (
        <View style={styles.container}>
          <Text style={styles.NoShift}>You have not created any Shifts</Text>
        </View>
      );
    } else {
      return (
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
          <FlatList
            data={this.state.dataSource}
            keyExtractor={this._keyExtractor}
            renderItem={({item}) => (
              <Card>
                <CardItem style={styles.eachItem}>
                  <View style={styles.userInfo}>
                    <Text style={styles.textStyles}>Site Name:      {item.site_name}</Text>
                    <Text style={styles.textStyles}>Shift Timing:   {item.shift_slot}</Text>
                    <Text style={styles.textStyles}>Shift Date:       {item.shift_date}</Text>
                    <Text style={styles.textStyles}>Guard Name:   {item.guard_name}</Text>
                    <Text style={styles.textStyles}>Report Subject:   {item.report_subject}</Text>
                    <Text style={styles.textStyles}>Report Description:   {item.report_description}</Text>
                  </View>
                </CardItem>
              </Card>
            )}
          />
        </View>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfo: {
    color: '#DAE0E2',
  },
  NoShift: {
    flex: 1,
    fontSize: 24,
    position: 'absolute',
    marginLeft: 40,
    fontFamily: 'Times New Roman',
  },
  eachItem: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#1287A5',
  },
  textStyles: {
    fontSize: 17,
    fontFamily: 'Arial',
    fontWeight: 'bold',
    color: '#616C6F',
  },
});
