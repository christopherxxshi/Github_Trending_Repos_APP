import React, {Component} from 'react';
import {StyleSheet, ScrollView, View, Alert} from 'react-native';
import {connect} from 'react-redux';
import actions from '../action/index'
import NavigationUtil from '../navigator/NavigationUtil'
import NavigationBar from '../common/NavigationBar';
import FavoriteDao from "../expand/dao/FavoriteDao";

import BackPressComponent from "../common/BackPressComponent";
import ViewUtil from "../util/ViewUtils";
import CheckBox from 'react-native-check-box'
import Ionicons from 'react-native-vector-icons/Ionicons'
import LanguageDao, {FLAG_LANGUAGE} from "../expand/dao/LanguageDao";
import ArrayUtil from "../util/ArrayUtil";


const THEME_COLOR = '#678';
type Props = {};

class CustomKeyPage extends Component<Props> {
    constructor(props) {
        super(props);
        this.params = this.props.navigation.state.params;
        this.backPress = new BackPressComponent({backPress: (e) => this.onBackPress(e)});
        this.changeValues = [];
        this.isRemoveKey = !!this.params.isRemoveKey;
        this.languageDao = new LanguageDao(this.params.flag);
        this.state = {
            keys: []
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.keys !== CustomKeyPage._keys(nextProps, null, prevState)) {
            return {
                keys: CustomKeyPage._keys(nextProps, null, prevState),
            }
        }
        return null;
    }

    componentDidMount() {
        this.backPress.componentDidMount();
        if (CustomKeyPage._keys(this.props).length === 0) {
            let {onLoadLanguage} = this.props;
            onLoadLanguage(this.params.flag);
        }
        this.setState({
            keys: CustomKeyPage._keys(this.props),
        })
    }

    componentWillUnmount() {
        this.backPress.componentWillUnmount();
    }

    static _keys(props, original, state) {
        const {flag, isRemoveKey} = props.navigation.state.params;
        let key = flag === FLAG_LANGUAGE.flag_key ? "keys" : "languages";
        if (isRemoveKey && !original) {
            return state && state.keys && state.keys.length !== 0 && state.keys || props.language[key].map(val => {
                return {
                    ...val,
                    checked: false
                };
            });
        } else {
            return props.language[key];
        }
    }

    onBackPress(e) {
        this.onBack();
        return true;
    }

    onSave() {
        if (this.changeValues.length === 0) {
            NavigationUtil.goBack(this.props.navigation);
            return;
        }
        let keys;
        if (this.isRemoveKey) {
            for (let i = 0, l = this.changeValues.length; i < l; i++) {
                ArrayUtil.remove(keys = CustomKeyPage._keys(this.props, true), this.changeValues[i], "name");
            }
        }
        //update local data
        this.languageDao.save(keys || this.state.keys);
        const {onLoadLanguage} = this.props;
        // update store
        onLoadLanguage(this.params.flag);
        NavigationUtil.goBack(this.props.navigation);
    }

    renderView() {
        let dataArray = this.state.keys;
        if (!dataArray || dataArray.length === 0) return;
        let len = dataArray.length;
        let views = [];
        for (let i = 0, l = len; i < l; i += 2) {
            views.push(
                <View keys={i}>
                    <View style={styles.item}>
                        {this.renderCheckBox(dataArray[i], i)}
                        {i + 1 < len && this.renderCheckBox(dataArray[i + 1], i + 1)}
                    </View>
                    <View style={styles.line}/>
                </View>
            )
        }
        return views;
    }

    onClick(data, index) {
        data.checked = !data.checked;
        ArrayUtil.updateArray(this.changeValues, data);
        this.state.keys[index] = data;
        this.setState({
            keys: this.state.keys
        })
    }

    onBack() {
        if (this.changeValues.length > 0) {
            Alert.alert('Alert', 'Save settings？',
                [
                    {
                        text: 'No', onPress: () => {
                            NavigationUtil.goBack(this.props.navigation)
                        }
                    }, {
                    text: 'Yes', onPress: () => {
                        this.onSave();
                    }
                }
                ])
        } else {
            NavigationUtil.goBack(this.props.navigation)
        }
    }

    _checkedImage(checked) {
        const {theme} = this.params;
        return <Ionicons
            name={checked ? 'ios-checkbox' : 'md-square-outline'}
            size={20}
            style={{
                color: THEME_COLOR,
            }}/>
    }

    renderCheckBox(data, index) {
        return <CheckBox
            style={{flex: 1, padding: 10}}
            onClick={() => this.onClick(data, index)}
            isChecked={data.checked}
            leftText={data.name}
            checkedImage={this._checkedImage(true)}
            unCheckedImage={this._checkedImage(false)}
        />
    }

    render() {
        let title = this.isRemoveKey ? 'remove key' : 'customize';
        title = this.params.flag === FLAG_LANGUAGE.flag_language ? 'Customize language' : title;
        let rightButtonTitle = this.isRemoveKey ? 'remove' : 'save';
        let navigationBar = <NavigationBar
            title={title}
            leftButton={ViewUtil.getLeftBackButton(() => this.onBack())}
            style={{backgroundColor: THEME_COLOR}}
            rightButton={ViewUtil.getRightButton(rightButtonTitle, () => this.onSave())}
        />;
        return <View style={styles.container}>
            {navigationBar}
            <ScrollView>
                {this.renderView()}
            </ScrollView>
        </View>
    }
}

const mapPopularStateToProps = state => ({
    language: state.language,
});
const mapPopularDispatchToProps = dispatch => ({
    onLoadLanguage: (flag) => dispatch(actions.onLoadLanguage(flag))
});

export default connect(mapPopularStateToProps, mapPopularDispatchToProps)(CustomKeyPage);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        flexDirection: 'row',
    },
    line: {
        flex: 1,
        height: 0.3,
        backgroundColor: 'darkgray',
    }
});