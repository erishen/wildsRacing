/**
 * Created by lei_sun on 2017/11/6.
 */
import React, { Component } from 'react';
import rootReducer from './reducers'
import * as actions from './actions';
import commonStore from '../common/store';

const store = commonStore.createStoreWithMiddleware(rootReducer);

export default class Test extends Component<{}> {
    constructor(props){
        super(props);
        this.state = store.getState();
        this.action = commonStore.createAction(actions, store.dispatch);
    }

    componentWillMount() {
        console.log('state', this.state);
    }

    componentDidMount() {
        this.unsubscribe = store.subscribe(() => {
            this.setState(store.getState());
        });
        this.action.initPageInfo();
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        let { pageNum } = this.state;

        return (
            <div className="test">
                <div>{pageNum}</div>
                <div className="row">
                    <button onClick={()=>this.action.addPageNum()}> + </button>
                    <button onClick={()=>this.action.subtractPageNum()}> - </button>
                </div>
            </div>
        );
    }
}