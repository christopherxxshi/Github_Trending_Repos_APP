import Types from "../type";
import DataStore from "../../expand/dao/DataStore";

export function onLoadPopularData(storeName, url) {
    return dispatch => {
        dispatch({type: Types.POPULAR_REFRESH, storeName: storeName});
        let dataStore = new DataStore();
        dataStore.fetchData(url) // Async action and data
            .then(data=>{
                handleData(dispatch, storeName, data);
            })
            .catch(error=>{
                console.log(error);
                dispatch({type: Types.LOAD_POPULAR_FAIL, error, storeName})
            })
    }

}

function handleData(dispatch, storeName, data){
    dispatch({
        type:Types.LOAD_POPULAR_SUCCESS,
        items: data&&data.data&&data.data.items,
        storeName
    })
}