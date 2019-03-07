import Types from "../type";

export function onThemeChange(theme){
    return {type: Types.THEME_CHANGE, theme: theme}
}