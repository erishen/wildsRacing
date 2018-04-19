/**
 * Created by lei_sun on 2018/1/12.
 */
import './index.less';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Test from '../../js/redux/test';
import LazyLoad from '../../js/redux/test/lazyload';
import Bootstrap from '../../js/redux/test/bootstrap';
import Toutiao from '../../js/redux/toutiao';

if(document.getElementById('app') != null){
    ReactDOM.render(
        <BrowserRouter basename="/react">
            <Switch>
                <Route exact path="/" component={Test} />
                <Route path="/test" component={Test} />
                <Route path="/lazyload" component={LazyLoad} />
                <Route path="/bootstrap" component={Bootstrap} />
                <Route path="/toutiao" component={Toutiao} />
            </Switch>
        </BrowserRouter>,
        document.getElementById('app')
    );
}