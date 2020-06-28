import React,{Component} from 'react';
import { Button, View, Text } from 'react-native';


export default class ClockInOut extends Component {
  render(){
    // const user_name = route.params.username;
    // const age = route.params.age;
    const params = this.props.route.params;
    const user_name = params.username
    const age = params.age;
    return (
      <View>
          <Text>ClockInOut Page {user_name} {age}</Text>
      </View>
    );
  }
}

  //export default ClockInOut