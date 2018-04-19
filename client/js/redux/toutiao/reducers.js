/**
 * Created by lei_sun on 2018/4/19.
 */
import { combineReducers } from 'redux';
import _ from 'lodash';
import { GET_TOUTIAO_LIST_SUCCEEDED } from './constants';

const toutiao = (state = {}, action) => {
    switch (action.type) {
        case GET_TOUTIAO_LIST_SUCCEEDED:
            var newState = _.cloneDeep(state);
            newState.list = action.list;
            return newState;
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    toutiao
});

export default rootReducer;