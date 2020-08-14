import React, { Component } from 'react';
import { View, Text, Navigator, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ViewReports from './ViewReports';
import ViewClockInOut from './ViewClockInOut';
import GuardDetails from './GuardDetails'
import Icon from 'react-native-vector-icons/Ionicons'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'

/**For bottom navigator */
const Tab = createBottomTabNavigator();

/**Function to render elements to the screen */
function SecurityRecords() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Guard Details"
        component={GuardDetails}
        options={{
          tabBarIcon: ({ tintColor }) => (
            <Icons name='account-details' size={30} />
          )
        }}
      />
      <Tab.Screen
        name="View Reports"
        component={ViewReports}
        options={{
          tabBarIcon: ({ tintColor }) => (
            <Icons name='book' size={30} />
          )
        }}
      />

    </Tab.Navigator>
  );
}

export default SecurityRecords;