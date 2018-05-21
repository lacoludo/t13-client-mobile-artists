import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppMainNavigator from './src/Navigation/AppMainNavigation'

export default class App extends React.Component {
  render() {
    return (
    <AppMainNavigator/>
    );
  }
}


//Hide this warning info ^^
console.disableYellowBox = true; 