import React, { Component } from 'react';
import {View, Text, Navigator, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ViewReports from './ViewReports';
import ViewClockInOut from './ViewClockInOut';
import GuardDetails from './GuardDetails'
import Icon from 'react-native-vector-icons/Ionicons'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'


const Tab = createBottomTabNavigator();

function SecurityRecords() {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="View Reports" 
        component={ViewReports}
        options={{ 
        tabBarIcon: ({tintColor}) => (
          <Icons name='book' size={25} />
        )
        }}  
      />
      <Tab.Screen 
        name="View Clock In/Out" 
        component={ViewClockInOut}
        options={{ 
        tabBarIcon: ({tintColor}) => (
          <Icon name='ios-time' size={25} />
        )
        }}  
      />
      <Tab.Screen 
        name="Guard Details" 
        component={GuardDetails}
        options={{ 
        tabBarIcon: ({tintColor}) => (
          <Icons name='account-details' size={25} />
        )
        }}  
      />
    </Tab.Navigator>
  );
}

export default SecurityRecords;