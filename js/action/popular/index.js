import Types from "../type";
import DataStore, {FLAG_STORAGE} from "../../expand/dao/DataStore";
import {_projectModels, handleData} from '../ActionUtil';

export function onRefreshPopular(storeName, url, pageSize, favoriteDao) {
    return dispatch => {
        dispatch({type: Types.POPULAR_REFRESH, storeName: storeName});
        let dataStore = new DataStore();
        dataStore.fetchData(url, FLAG_STORAGE.flag_popular) // Async action and data
            .then(data => {
                handleData(Types.POPULAR_REFRESH_SUCCESS, dispatch, storeName, data, pageSize, favoriteDao);
            })
            .catch(error => {
                console.log(error);
                dispatch({type: Types.POPULAR_REFRESH_FAIL, storeName, error})
            })
    }

}

export function onLoadMorePopular(storeName, pageIndex, pageSize, dataArray = [],favoriteDao, callback) {
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
                    projectModels: dataArray
                })
            } else {
                let max = pageSize * pageIndex > dataArray.length ? dataArray.length : pageIndex * pageSize;
                _projectModels(dataArray.slice(0, max), favoriteDao, data => {
                    dispatch({
                        type: Types.POPULAR_LOAD_MORE_SUCCESS,
                        storeName,
                        pageIndex,
                        projectModels: data
                    })
                })
            }
        }, 500)
    }
}

export function onFlushPopularFavorite(storeName, pageIndex, pageSize, dataArray = [], favoriteDao) {
    return dispatch => {
        let max = pageSize * pageIndex > dataArray.length ? dataArray.length : pageSize * pageIndex;
        _projectModels(dataArray.slice(0, max), favoriteDao, data => {
            dispatch({
                type: Types.POPULAR_FLUSH_FAVORITE,
                storeName,
                pageIndex,
                projectModels: data,
            })
        })
    }
}