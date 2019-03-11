import Types from '../../action/type';
import ThemeFactory, {ThemeFlags} from "../../res/styles/ThemeFactory";

const defaultState = {
    theme: ThemeFactory.createTheme(ThemeFlags.Default),
    onShowCustomThemeView: false,
};

export default function onAction(state = defaultState, action) {
    switch (action.type) {
        case Types.THEME_CHANGE:
            return {...state, theme: action.theme};
        case Types.SHOW_THEME_VIEW:
            return {
                ...state,
                customThemeViewVisible: action.customThemeViewVisible,
            };
        default:
            return state;
    }
}