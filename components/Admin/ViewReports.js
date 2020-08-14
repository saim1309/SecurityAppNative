import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import {Card, CardItem, Button} from 'native-base';

const { width: Width } = Dimensions.get('window');

export default class ViewReports extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      dataSource: [],
      siteNames: [],
      selectedSiteName:"",
      fetchReportButtonClicked:false,
      noReport: false,
      
    };
  }

  /**API to fetch the site names for the drop down */
  getSiteNamesApi = () =>{
    /**fetching site names */
    fetch(global.hostUrl + '/sites/', {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((responseData) => {
        //console.log(responseData)
        var data = responseData.map(function (item) {
          return {
            value: item.site_name,
          };
        });
        console.log(data);

        this.setState({ siteNames: data });
      })
      .catch((error) => console.log('Error : ', error));
  }

  /**Fetching reports for a selected site */
  getReportsApi = () => {
    return (
      /** Fetching Reports */
      this.setState({isLoading:true, dataSource:[]}),
      console.log('selected site:',this.state.selectedSiteName),
      fetch(global.hostUrl + '/reports/viewReport', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          site_name: this.state.selectedSiteName,
        }),
      })
        .then((response) => response.json())
        .then((responseData) => {
          console.log(responseData);
          this.setState({
            fetchReportButtonClicked:true,
            isLoading: false,
            dataSource: this.state.dataSource.concat(responseData),
         });
          if (responseData.length == 0) {
            console.log('no data fetched by API');
            this.setState({noReport: true});
          }
        })
        
        .catch((error) => console.log('Error : ', error))
    );
  };
  _keyExtractor = (datasource, index) => datasource._id;

  /**Calling method to fill the drop down menu for site on component mount */
  componentDidMount() {
    this.getSiteNamesApi();
  }

  /**If there is no site name selected */
  ListEmpty=()=>{
    if(this.state.selectedSiteName==""){
      return (
        <View style={styles.container}>
          <Text style={styles.noReport}>Select a site to view report</Text>
        </View>
      );
    }
    /**If the api returns no report for a site */
    else if(this.state.fetchReportButtonClicked==true){
      return (
        <View style={styles.container}>
          <Text style={styles.noReport}>No Reports for this site</Text>
        </View>
      );
    }
    else{
      return (
        <View style={styles.container}>
        </View>
      );
    }
  }

  render() {
    /**if it takes time to load data from api...it will show loading sign*/
    if (this.state.isLoading) {
      return (
        <View style={styles.progress}>
          <ActivityIndicator size="large" color="#01CBC6" />
        </View>
      );
    }
  
    /**if all data is loaded up from api then data will be displayed*/
     else {
      return (
        <View style={styles.container}>
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
              margin: 20,
              paddingLeft:10
              
            }}
            rippleCentered={true}
            placeholder='Select Site'
            placeholderTextColor='#fff'
            style = {{color: '#fff'}} //for changed text color
            //backgroundColor = '#0ABDE3'
            inputContainerStyle={{ borderBottomColor: 'transparent' }}
            data={this.state.siteNames}
            valueExtractor={({ value }) => value}
            defaultValue={this.state.selectedSiteName}
            onChangeText={(value) => {
              this.setState({ selectedSiteName: value });
            }}
          />
          <Button success style = {styles.fetchReportBtn} onPress={this.getReportsApi}>
            <Text style = {styles.fetchReportTxt}> Fetch Report </Text>
          </Button>
          <FlatList
            data={this.state.dataSource}
            keyExtractor={this._keyExtractor}
            renderItem={({item}) => (
              <Card>
                <CardItem style={styles.eachItem}>
                  <View style={styles.userInfo}>
                    <Text style={styles.textStyles}>ID:                        {item.Id}</Text>  
                    <Text style={styles.textStyles}>Site Name:              {item.site_name}</Text>
                    <Text style={styles.textStyles}>Shift Timing:           {item.shift_slot}</Text>
                    <Text style={styles.textStyles} >Shift Date:               {item.shift_date}</Text>
                    <Text style={styles.textStyles}>Guard Name:           {item.guard_name}</Text>
                    <Text style={styles.textStyles}>Report Subject:       {item.report_subject}</Text>
                    <Text style={styles.textStyles}>Report Description: {item.report_description}</Text>
                  </View>
                </CardItem>
              </Card>
            )}
            ListEmptyComponent={this.ListEmpty}
          />
        </View>
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
  },
  fetchReportBtn:{
    alignSelf: "center",
    marginHorizontal: 30,
    paddingHorizontal: 20
  },
  fetchReportTxt:{
    color:"#fff",
    fontWeight:"bold",
    fontSize:18 
  },
  progress: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfo: {
    color: '#DAE0E2',
  },
  noReport: {
    flex: 1,
    fontSize: 24,
    marginTop:150,
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
