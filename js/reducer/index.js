import {combineReducers} from 'redux';
import themeReducer from './theme'
import {rootCom, RootNavigator} from '../navigator/AppNavigator'

const initNavState = RootNavigator.router.getStateForAction(RootNavigator.router.getActionForPathAndParams(rootCom));


const navReducer = (state = initNavState, action) => {
    const nextState = RootNavigator.router.getStateForAction(action, state);
    return nextState || state;
};


const index = combineReducers({
    nav: navReducer,
    theme: themeReducer
})

export default index;