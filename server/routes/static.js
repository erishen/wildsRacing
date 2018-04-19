/**
 * Created by lei_sun on 2017/12/1.
 */
import express from 'express';
import path from 'path';
import fs from 'fs';
import version from '../config/version';
import systemService from '../service/system';
import util from '../helper/util';
import projectConfig from '../config/project';

var router = express.Router();
var isDev = process.env.NODE_ENV !== 'production';

var firstUpper = function(str){
    return util.firstUpperCase(str);
};

var renderWrite = function(req, res, route, callback){
    res.render(route, {
        version: version,
        serverPrefix: projectConfig.serverPrefix,
        ip: systemService.getIPAdress()
    }, function(err, html){
        if(!err){
            var filename = '';
            if(route.indexOf('/') != -1){
                var routeArr = route.split('/');
                filename = firstUpper(routeArr[0]) + firstUpper(routeArr[1]);
            }
            else {
                filename = firstUpper(route);
            }

            //console.log('filename: ', filename);
            if(filename != ''){
                fs.writeFile(path.join(__dirname, '../../public') + '/' + filename + '.html', html, 'utf8', (err) => {
                    if (!err) {
                        console.log('The file ' + filename + '.html has been saved!');
                        return callback && callback(true);
                    }
                    else {
                        console.log('filename_err1: ', err);
                        return callback && callback(false);
                    }
                });
            }
            else {
                return callback && callback(false);
            }
        }
        else {
            console.log('filename_err2: ', err);
            return callback && callback(false);
        }
    });
};

var renderWriteLoop = function(req, res, routeIndex, routeArray, resultArray, callback){
    if(resultArray == undefined)
        resultArray = [];

    if(routeArray && routeArray.length > 0){
        var routeArrayLen = routeArray.length;
        if(routeIndex >= 0 && routeIndex < routeArrayLen){
            var route = routeArray[routeIndex];
            renderWrite(req, res, route, function(flag){
                //console.log('renderWriteLoop', route, flag);
                resultArray.push({ route: route, flag: flag });
                routeIndex++;
                return renderWriteLoop(req, res, routeIndex, routeArray, resultArray, callback);
            });
        }
        else {
            return callback && callback(resultArray);
        }
    }
    else {
        return callback && callback(resultArray);
    }
};

router.get('/', function(req, res) {
    if(!isDev) {
        var resultArray = [];
        var routeArray = ['react'];
        renderWriteLoop(req, res, 0, routeArray, resultArray, function(result){
            res.send(result);
        });
    }
    else {
        res.send('Should use production');
    }
});

export default router;