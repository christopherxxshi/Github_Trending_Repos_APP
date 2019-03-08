import Types from '../../action/type';

const defaultState = {
};
/**
 * popular:{
 *     java:{
 *         items:[],
 *         isLoading: false
 *     },
 *     ios:{
 *         items:[],
 *         isLoading: false
 *     }
 * }
 * @param state
 * @param action
 * @returns {{theme: ({comment: string, content: string, prop: string, tag: string, value: string}|*|onAction|theme|{tintColor, updateTime}|string)}}
 */
export default function onAction(state = defaultState, action) {
    switch (action.type) {
        case Types.LOAD_POPULAR_SUCCESS:
            return {
                ...state,
                [action.storeName]: {
                    ...[action.storeName],
                    items:action.items,
                    isLoading: false
                }
            };
        case Types.POPULAR_REFRESH:
            return {
                ...state,
                [action.storeName]: {
                    ...[action.storeName],
                    isLoading: true
                }
            };
        case Types.LOAD_POPULAR_FAIL:
            return {
                ...state,
                [action.storeName]: {
                    ...[action.storeName],
                    isLoading: false
                }
            };
        default:
            return state;
    }
}