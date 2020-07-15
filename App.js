import * as React from 'react';
import { Button, View, Text ,Tab, StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import CreateSchedule from './components/Admin/CreateSchedule';
import ClockInOut from './components/Guard/ClockInOut';
import WriteReport from './components/Guard/WriteReport'
import Panic from './components/Guard/Panic';
// import Flash from './components/Flash';
import AdminHome from './components/Home/AdminHome.js';
import RegisterUser from './components/Admin/RegisterUser';
import SecurityRecords from './components/Admin/SecurityRecords';
import Schedule from './components/Admin/Schedule';
import UpdateUser from './components/Admin/UpdateUser'
import GuardDetails from './components/Admin/GuardDetails'
import GuardSchedule from './components/Guard/GuardSchedule'
import ViewScheduleAdmin from './components/Admin/ViewScheduleAdmin'
import ViewReports from './components/Admin/ViewReports';
import ViewClockInOut from './components/Admin/ViewClockInOut';

const Stack = createStackNavigator();
console.disableYellowBox = true;
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerStyle: {
          backgroundColor: '#2475B0',
        },
        headerTintColor: '#fff',
        headerTitleAlign:'center',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
        <Stack.Screen name="Login" options={{headerShown:false}} component={Login} />
        <Stack.Screen name="Home" options={{headerShown:false}} component={Home} />
        <Stack.Screen name="AdminHome" options={{headerShown:false}} component={AdminHome} />
        <Stack.Screen name="RegisterUser" options={{ title: 'Register a Guard'}} component={RegisterUser}/>
        <Stack.Screen name="SecurityRecords" options={{ title: 'Security Records'}} component={SecurityRecords}/>
        <Stack.Screen name="Schedule" options={{ title: 'Schedule Page'}} component={Schedule}/>
        <Stack.Screen name="ViewScheduleAdmin" options={{ title: 'View Schedule Page'}} component={ViewScheduleAdmin}/>
        <Stack.Screen name="ViewClockInOut" options={{ title: 'ViewClockInOut'}} component={ViewClockInOut}/>
        <Stack.Screen name="ViewReports" options={{ title: 'ViewReports'}} component={ViewReports}/>
        <Stack.Screen name="UpdateUser" options={{ title: 'Update Guard Record'}} component={UpdateUser}/>
        <Stack.Screen name="GuardDetails" options={{ title: 'Guard Details'}} component={GuardDetails}/>
        <Stack.Screen name="ClockInOut" options={{ title: 'Enter Your Time'}} component={ClockInOut} />
        <Stack.Screen name="GuardSchedule" options={{ title: ' Guard Schedule'}} component={GuardSchedule}/>
        <Stack.Screen name="Panic" component={Panic} />
        <Stack.Screen name="WriteReport" component={WriteReport} />
        <Stack.Screen name="CreateSchedule" component={CreateSchedule} />

      </Stack.Navigator>
    </NavigationContainer>
  );  
}

const styles=StyleSheet.create({
  header:{
    alignSelf:'center',
  }
});
export default App;
