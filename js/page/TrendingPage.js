import React, {Component} from 'react';
import {FlatList, StyleSheet, Text, View, ActivityIndicator, RefreshControl, DeviceInfo} from 'react-native';
import {createMaterialTopTabNavigator, createAppContainer} from 'react-navigation';
import NavigationUtil from "../navigator/NavigationUtil";
import Toast from 'react-native-easy-toast';
import {connect} from 'react-redux';
import actions from "../action/index";
import TrendingItem from '../common/TrendingItem';
import NavigationBar from '../common/NavigationBar';

const URL = "https://github.com/trending/";
const QUERY_STR = '?since=daily';
const THEME_COLOR = '#678';
const PAGE_SIZE = 10;

type Props = {};
export default class TrendingPage extends Component<Props> {
    constructor(props) {
        super(props);
        this.tabNames = ['All', "C", "C#", "PHP", "JavaScript"];
    }

    _genTabs() {
        const tabs = {};
        this.tabNames.forEach((item, index) => {
            tabs[`tab${index}`] = {
                screen: props => <TrendingTabPage {...props} tabLabel={item}/>,
                navigationOptions: {
                    title: item
                }
            }
        });
        return tabs;
    }

    render() {
        let statusBar = {
            backgroundColor: THEME_COLOR,
            barStyle: 'light-content',
        };
        let navigationBar = <NavigationBar
            title={'Trending'}
            statusBar={statusBar}
            style={{backgroundColor: THEME_COLOR}}
        />;
        const TabNavigator = createAppContainer(createMaterialTopTabNavigator(
            this._genTabs(), {
                tabBarOptions: {
                    tabStyle: styles.tabStyle,
                    upperCaseLabel: false,
                    scrollEnabled: true,
                    style: {
                        backgroundColor: '#678',
                        height: 30
                    },
                    indicatorStyle: styles.indicatorStyle,
                    labelStyle: styles.labelStyle
                }
            }
        ));
        return (
            <View style={{flex: 1, marginTop: DeviceInfo.isIPhoneX_deprecated ? 30 : 0}}>
                {navigationBar}
                <TabNavigator/>
            </View>
        );
    }
}

class TrendingTab extends Component<Props> {
    constructor(props) {
        super(props);
        const {tabLabel} = this.props;
        this.storeName = tabLabel;
    }

    componentDidMount() {
        this.loadData();
    }

    _store() {
        const {trending} = this.props;
        let store = trending[this.storeName];
        if (!store) {
            store = {
                items: [],
                isLoading: false,
                projectModes: [],
                hideLoadingMore: true,
            }
        }
        return store;
    }

    loadData(loadMore) {
        const {onRefreshTrending, onLoadMoreTrending} = this.props;
        const store = this._store();
        const url = this.genFetchUrl(this.storeName);
        if (loadMore) {
            onLoadMoreTrending(this.storeName, ++store.pageIndex, PAGE_SIZE, store.items, callback => {
                this.refs.toast.show('No more data')
            })
        } else {
            onRefreshTrending(this.storeName, url, PAGE_SIZE);
        }
    }

    genFetchUrl(key) {
        return URL + key + QUERY_STR;
    }

    renderItem(data) {
        const item = data.item;
        return <TrendingItem
            item={item}
            onSelect={() => {
            }
            }
        />
    }

    genIndicator() {
        return this._store().hideLoadingMore ? null :
            <View style={styles.indicatorContainer}>
                <ActivityIndicator
                    style={styles.indicator}
                />
                <Text>
                    Loading more...
                </Text>
            </View>
    }

    render() {
        let store = this._store();
        return (
            <View style={styles.container}>
                <FlatList
                    data={store.projectModes}
                    renderItem={data => this.renderItem(data)}
                    keyExtractor={item => "" + (item.id||item.fullName)}
                    refreshControl={
                        <RefreshControl
                            title={"Loading"}
                            titleColor={THEME_COLOR}
                            colors={[THEME_COLOR]}
                            refreshing={store.isLoading}
                            onRefresh={() => this.loadData()}
                            tintColor={THEME_COLOR}
                        />
                    }
                    ListFooterComponent={() => this.genIndicator()}
                    onEndReached={() => {
                        setTimeout(() => {
                            if (this.canLoadMore) {
                                this.loadData(true);
                                this.canLoadMore = false;
                            }
                        }, 100);
                    }}
                    onEndReachedThreshold={0.5}
                    onMomentumScrollBegin={() => {
                        this.canLoadMore = true;
                    }}
                />
                <Toast
                    ref={'toast'}
                    position={'center'}
                />
            </View>
        );
    }
}

const mapStateToProps = state => ({
    trending: state.trending
});
const mapDispatchToProps = dispatch => ({
    onRefreshTrending: (storeName, url, pageSize) => dispatch(actions.onRefreshTrending(storeName, url, pageSize)),
    onLoadMoreTrending: (storeName, pageIndex, pageSize, items, callback) => dispatch(actions.onLoadMoreTrending(storeName, pageIndex, pageSize, items, callback)),
});
const TrendingTabPage = connect(mapStateToProps, mapDispatchToProps)(TrendingTab);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabStyle: {
        padding: 0
    },
    indicatorStyle: {
        height: 2,
        backgroundColor: 'white'
    },
    labelStyle: {
        fontSize: 13,
        margin: 0,
    },
    indicatorContainer: {
        alignItems: 'center'
    },
    indicator: {
        color: 'red',
        margin: 10
    }
});
