import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';
import {createMaterialTopTabNavigator, createAppContainer} from 'react-navigation';
import NavigationUtil from "../navigator/NavigationUtil";
import NavigationBar from "../common/NavigationBar";
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons'

const THEME_COLOR = '#678';
type Props = {};
export default class MyPage extends Component<Props> {

    getRightButton() {
        return <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
                onPress={() => {
                }}
            >
                <View style={{padding: 5, marginRight: 8}}>
                    <Feather
                        name={'search'}
                        size={24}
                        style={{color: 'white'}}
                    />
                </View>

            </TouchableOpacity>
        </View>
    }

    getLeftButton(callBack) {
        return <TouchableOpacity
            style={{padding: 8, paddingLeft: 12}}
            onPress={callBack}>
            <Ionicons
                name={'ios-arrow-back'}
                size={26}
                style={{color: 'white'}}/>
        </TouchableOpacity>
    }

    render() {
        let statusBar = {
            backgroundColor: THEME_COLOR,
            barStyle: 'light-content',
        };
        let navigationBar =
            <NavigationBar
                title={'My Info'}
                statusBar={statusBar}
                style={{backgroundColor: THEME_COLOR}}
                rightButton={this.getRightButton()}
                leftButton={this.getLeftButton()}
            />;
        return (
            <View style={styles.container}>
                {navigationBar}
                <Text
                    onPress={() => {
                        NavigationUtil.goPage({navigation: this.props.navigation}, "DetailPage")
                    }}>
                    Jump to DetailPage
                </Text>
                <Button
                    title={"Fetch Demo"}
                    onPress={() => {
                        NavigationUtil.goPage({navigation: this.props.navigation}, "FetchDemoPage")
                    }}
                />
                <Button
                    title={"Data Store Demo"}
                    onPress={() => {
                        NavigationUtil.goPage({navigation: this.props.navigation}, "DataStoreDemoPage")
                    }}
                />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30
    }
});