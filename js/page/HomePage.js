import React, { Component } from "react";
import {BackHandler} from 'react-native';
import {NavigationActions} from 'react-navigation';
import { Platform, StyleSheet, Text, View } from "react-native";


type Props = {};
import NavigationUtil from "../navigator/NavigationUtil";
import DynamicTabNavigator from "../navigator/DynamicTabNavigator";
import actions from "../action";
import {connect} from "react-redux";

class HomePage extends Component<Props> {
  componentDidMount(){
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
  }
  componentWillUnmount(){
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
  }
  onBackPress = () => {
    const {dispatch, nav} = this.props;
    if(nav.routes[1].index === 0){
      return false;
    }
    dispatch(NavigationActions.back());
    return true;
  };
  render() {
    NavigationUtil.navigation = this.props.navigation;
    return <DynamicTabNavigator />;
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
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});

const mapStateToProps = state => ({
  nav: state.nav
});

export default connect(mapStateToProps)(HomePage)

