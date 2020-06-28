import * as React from 'react';
import { Button, View, Text ,Tab, StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
// import CreateSchedule from './components/CreateSchedule';
// import ClockInOut from './components/ClockInOut';
// import Reports from './components/Reports'
// import Panic from './components/Panic';
// import Flash from './components/Flash';
import AdminHome from './components/Home/AdminHome.js';
import RegisterUser from './components/Admin/RegisterUser';
// import ViewReports from './components/ViewReports';
// import ViewSchedule from './components/ViewSchedule';
// import UpdateUser from './components/UpdateUser'
// import Schedule from './components/Schedule'

const Stack = createStackNavigator();
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerStyle: {
          backgroundColor: '#192A56',
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
