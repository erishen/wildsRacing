import _ from 'lodash';
import projectConfig from '../config/project';
import staticRouter from './static';
import reactRouter from './react';

var serverPrefix = projectConfig.serverPrefix;

export default function(app){
    app.use(serverPrefix + '/static', staticRouter);
    app.use(serverPrefix + '/react*', reactRouter);
};
