import React, { Component } from 'react';
import {View, Text, Navigator, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ViewReports from './ViewReports';
import ViewClockInOut from './ViewClockInOut';
import Icon from 'react-native-vector-icons/Ionicons'


const Tab = createBottomTabNavigator();

function SecurityRecords() {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="View Reports" 
        component={ViewReports}
        options={{ 
        tabBarIcon: ({tintColor}) => (
          <Icon name='ios-reader-sharp' size={25} />
        )
      }}  />
      <Tab.Screen name="View Clock In/Out" options={{ tabBarlabel: 'View Clock In/Out'}} component={ViewClockInOut} />
    </Tab.Navigator>
  );
}

export default SecurityRecords;