import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import NavigationUtil from "../navigator/NavigationUtil";
import SplashScreen from 'react-native-splash-screen'

 
type Props = {};
export default class WelcomePage extends Component<Props> {
  componentDidMount() {
    this.timer = setTimeout(() => {
      SplashScreen.hide();
      NavigationUtil.resetToHomePage({
        navigation: this.props.navigation
      })
    }, 200);
  }
  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>WelcomePage</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  }
});
