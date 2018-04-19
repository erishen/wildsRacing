/**
 * Created by lei_sun on 2018/4/19.
 */
import React, { Component } from 'react';
import rootReducer from './reducers'
import * as sagas from './sagas';
import commonStore from '../common/store';
import _ from '../../lib/lodash.min';
import moment from '../../lib/moment-with-locales.min';
import { Panel, Label } from 'react-bootstrap';

const store = commonStore.createStoreWithMiddleware(rootReducer);

export default class Toutiao extends Component<{}> {
    constructor(props){
        super(props);
        this.state = store.getState();

        let factoryAction = sagas;
        const sagaMiddleware = commonStore.sagaMiddleware;
        sagaMiddleware.run(sagas.mySaga);
        this.action = commonStore.createAction(factoryAction, store.dispatch);
    }

    componentWillMount() {
        console.log('state', this.state);
    }

    componentDidMount() {
        this.unsubscribe = store.subscribe(() => {
            this.setState(store.getState());
        });

        this.action.getToutiaoList();
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    getListData(data){
        moment.locale('zh-cn');

        let content = [];
        _.each(data, (item, index)=>{
            //console.log(item, index);
            let label = item.label;
            let abstract = item.abstract;

            if(abstract != '' && !label){
                let title = item.title;
                let media_name = item.media_name;
                let comment_count = item.comment_count;
                let publish_time = moment(item.publish_time*1000).fromNow();
                let article_url = item.article_url;

                content.push(
                    <div key={"toutiao" + index}>
                        <Panel>
                            <Panel.Heading><a href={article_url} target="_blank">{title}</a></Panel.Heading>
                            <Panel.Body>
                                {abstract}
                                <Label>{media_name}</Label>&nbsp;
                                <Label>评论数{comment_count}</Label>&nbsp;
                                <Label>{publish_time}</Label>
                            </Panel.Body>
                        </Panel>
                    </div>
                );
            }
        });
        return content;
    }

    render() {
        let { toutiao } = this.state;
        let list = toutiao.list;
        console.log(list);

        let content = null;

        if(list && list.data){
            content = this.getListData(list.data);
        }

        return (
            <div class="toutiao-area">{content}</div>
        );
    }
}