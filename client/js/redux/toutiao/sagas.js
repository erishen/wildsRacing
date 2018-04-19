/**
 * Created by lei_sun on 2018/4/19.
 */
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import toutiaoService from '../../services/toutiaoService';
import {
    GET_TOUTIAO_LIST, GET_TOUTIAO_LIST_SUCCEEDED, GET_TOUTIAO_LIST_FAILED
} from './constants';

function* getToutiaoListSaga(action) {
    try {
        const toutiaoList = yield call(toutiaoService.searchToutiaoList);
        yield put({ type: GET_TOUTIAO_LIST_SUCCEEDED, list: toutiaoList });
    } catch (e) {
        yield put({ type: GET_TOUTIAO_LIST_FAILED, message: e.message });
    }
}

export const getToutiaoList = (params) => {
    return { type: GET_TOUTIAO_LIST, ...params};
};

export function* mySaga() {
    yield takeLatest(GET_TOUTIAO_LIST, getToutiaoListSaga);
}