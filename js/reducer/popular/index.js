import Types from '../../action/type';

const defaultState = {};
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
        case Types.POPULAR_REFRESH_SUCCESS:
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    items: action.items, // original data
                    projectModes: action.projectModes, // data need to be displayed
                    isLoading: false,
                    hideLoadingMore: false,
                    pageIndex: action.pageIndex
                }
            };
        case Types.POPULAR_REFRESH:
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    isLoading: true,
                    hideLoadingMore: true,
                }
            };
        case Types.POPULAR_REFRESH_FAIL:
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    isLoading: false
                }
            };
        case Types.POPULAR_LOAD_MORE_SUCCESS:
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    projectModes: action.projectModes,
                    hideLoadingMore: false,
                    pageIndex: action.pageIndex
                }
            };
        case Types.POPULAR_LOAD_MORE_FAIL:
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    hideLoadingMore: true,
                    pageIndex: action.pageIndex
                }
            };
        default:
            return state;
    }
}