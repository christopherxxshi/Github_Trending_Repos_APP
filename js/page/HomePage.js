import React, {Component} from "react";
import {View} from 'react-native';
import {NavigationActions} from 'react-navigation';
import BackPressComponent from "../common/BackPressComponent"
import CustomTheme from '../page/CustomTheme';
import actions from "../action";

type Props = {};
import NavigationUtil from "../navigator/NavigationUtil";
import DynamicTabNavigator from "../navigator/DynamicTabNavigator";
import {connect} from "react-redux";

class HomePage extends Component<Props> {
    constructor(props) {
        super(props);
        this.backPress = new BackPressComponent({backPress: this.onBackPress()});
    }

    componentDidMount() {
        this.backPress.componentDidMount();
    }

    componentWillUnmount() {
        this.backPress.componentWillUnmount();
    }

    renderCustomThemeView() {
        const {customThemeViewVisible, onShowCustomThemeView} = this.props;
        return (<CustomTheme
            visible={customThemeViewVisible}
            {...this.props}
            onClose={() => onShowCustomThemeView(false)}
        />)
    }
    onBackPress = () => {
        const {dispatch, nav} = this.props;
        if (nav.routes[1].index === 0) {
            return false;
        }
        dispatch(NavigationActions.back());
        return true;
    };

    render() {
        NavigationUtil.navigation = this.props.navigation;
        return <View style={{flex: 1}}>
            <DynamicTabNavigator/>
            {this.renderCustomThemeView()}
        </View>;
    }
}

const mapStateToProps = state => ({
    nav: state.nav,
    customThemeViewVisible: state.theme.customThemeViewVisible,
});

const mapDispatchToProps = dispatch => ({
    onShowCustomThemeView: (show) => dispatch(actions.onShowCustomThemeView(show)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

