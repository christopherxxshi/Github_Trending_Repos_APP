import Types from "../type";
import DataStore from "../../expand/dao/DataStore";

export function onRefreshPopular(storeName, url, pageSize) {
    return dispatch => {
        dispatch({type: Types.POPULAR_REFRESH, storeName: storeName});
        let dataStore = new DataStore();
        dataStore.fetchData(url) // Async action and data
            .then(data => {
                handleData(dispatch, storeName, data, pageSize);
            })
            .catch(error => {
                console.log(error);
                dispatch({type: Types.POPULAR_REFRESH_FAIL, storeName, error})
            })
    }

}

export function onLoadMorePopular(storeName, pageIndex, pageSize, dataArray = [], callback) {
    return dispatch => {
        setTimeout(() => {
            if ((pageIndex - 1) * pageSize >= dataArray.length) {
                if (typeof callback === "function") {
                    callback("No more data")
                }
                dispatch({
                    type: Types.POPULAR_LOAD_MORE_FAIL,
                    error: 'No more data',
                    storeName: storeName,
                    pageIndex: --pageIndex,
                    projectModes: dataArray
                })
            } else {
                let max = pageSize * pageIndex > dataArray.length ? dataArray.length : pageIndex * pageSize;
                dispatch({
                    type: Types.POPULAR_LOAD_MORE_SUCCESS,
                    storeName,
                    pageIndex,
                    projectModes: dataArray.slice(0, max)
                })
            }
        }, 500)
    }
}

function handleData(dispatch, storeName, data, pageSize) {
    let fixItems = [];
    if (data && data.data && data.data.items) {
        fixItems = data.data.items;
    }
    dispatch({
        type: Types.POPULAR_REFRESH_SUCCESS,
        items: fixItems,
        projectModes: pageSize > fixItems.length ? fixItems : fixItems.slice(0, pageSize),
        storeName,
        pageIndex: 1
    })
}