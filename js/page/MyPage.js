import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';
import {connect} from "react-redux";
import {createMaterialTopTabNavigator, createAppContainer} from 'react-navigation';
import NavigationUtil from "../navigator/NavigationUtil";
import NavigationBar from "../common/NavigationBar";
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons'
import {MORE_MENU} from "../common/MORE_MENU";
import GlobalStyles from "../res/styles/GlobalStyles";
import ViewUtil from "../util/ViewUtils";
import {FLAG_LANGUAGE} from "../expand/dao/LanguageDao";

const THEME_COLOR = '#678';
type Props = {};

class MyPage extends Component<Props> {


    onClick(menu) {
        let RouteName, params = {};
        switch (menu) {
            case MORE_MENU.Tutorial:
                RouteName = 'WebViewPage';
                params.title = 'Tutorial';
                params.url = 'https://github.com/christopherxxshi/Github_Trending_Repos_APP';
                break;
            case MORE_MENU.Sort_Key:
                RouteName = 'SortKeyPage';
                params.flag = FLAG_LANGUAGE.flag_key;
                break;
            case MORE_MENU.Sort_Language:
                RouteName = 'SortKeyPage';
                params.flag = FLAG_LANGUAGE.flag_language;
                break;
            case MORE_MENU.Custom_Key:
            case MORE_MENU.Custom_Language:
            case MORE_MENU.Remove_Key:
                RouteName = 'CustomKeyPage';
                RouteName = 'CustomKeyPage';
                params.isRemoveKey = menu === MORE_MENU.Remove_Key;
                params.flag = menu !== MORE_MENU.Custom_Language ? FLAG_LANGUAGE.flag_key : FLAG_LANGUAGE.flag_language;
                break;
            case MORE_MENU.About:
                RouteName = 'AboutPage';
                break;
            case MORE_MENU.About_Author:
                RouteName = 'AboutMePage';
                break;
        }
        if (RouteName) {
            NavigationUtil.goPage(params, RouteName);
        }
    }

    getItem(menu) {
        return ViewUtil.getMenuItem(() => this.onClick(menu), menu, THEME_COLOR);
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
            />;
        return (
            <View style={GlobalStyles.root_container}>
                {navigationBar}
                <ScrollView>
                    <TouchableOpacity
                        style={styles.item}
                        onPress={() => this.onClick(MORE_MENU.About)}
                    >
                        <View style={styles.about_left}>
                            <Ionicons
                                name={MORE_MENU.About.icon}
                                size={40}
                                style={{
                                    marginRight: 10,
                                    color: THEME_COLOR
                                }}
                            />
                            <Text>GitHub Popular</Text>
                        </View>
                        <Ionicons
                            name={'ios-arrow-forward'}
                            size={16}
                            style={{
                                marginRight: 10,
                                alignSelf: 'center',
                                color: THEME_COLOR,
                            }}/>
                    </TouchableOpacity>
                    <View style={GlobalStyles.line}/>
                    {this.getItem(MORE_MENU.Tutorial)}
                    {/*Customize Trending*/}
                    <Text style={styles.groupTitle}>Customize Trending</Text>
                    {/*Customize Language*/}
                    {this.getItem(MORE_MENU.Custom_Language)}
                    {/*Sort Language*/}
                    <View style={GlobalStyles.line}/>
                    {this.getItem(MORE_MENU.Sort_Language)}

                    {/*Customize Popular*/}
                    <Text style={styles.groupTitle}>Customize Popular</Text>
                    {/*Custom Key*/}
                    {this.getItem(MORE_MENU.Custom_Key)}
                    {/*Sort Key*/}
                    <View style={GlobalStyles.line}/>
                    {this.getItem(MORE_MENU.Sort_Key)}
                    {/*Remove Key*/}
                    <View style={GlobalStyles.line}/>
                    {this.getItem(MORE_MENU.Remove_Key)}

                    {/*Settings*/}
                    <Text style={styles.groupTitle}>Settings</Text>
                    {/*Custom Theme*/}
                    {this.getItem(MORE_MENU.Custom_Theme)}
                    {/*About Author*/}
                    <View style={GlobalStyles.line}/>
                    {this.getItem(MORE_MENU.About_Author)}
                    <View style={GlobalStyles.line}/>
                    {/*Feedback*/}
                    {this.getItem(MORE_MENU.Feedback)}
                </ScrollView>
            </View>
        );
    }
}


const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    onThemeChange: (theme) => dispatch(onThemeChange(theme)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyPage);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30
    },
    about_left: {
        alignItems: 'center',
        flexDirection: 'row'
    },
    item: {
        backgroundColor: 'white',
        padding: 10,
        height: 90,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    groupTitle: {
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 5,
        fontSize: 12,
        color: 'gray'
    }
});
