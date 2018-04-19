/**
 * Created by lei_sun on 2018/4/19.
 */
import $ from '../lib/jquery-3.2.1.min';
import _ from '../lib/lodash.min';

var serviceObj = {};

var ajaxPost = function(url, data, sucCallback, errCallback){
    $.ajax({
        type: "POST",
        dataType: 'json',
        url: url,
        data: JSON.stringify(data),
        success: function (result) {
            return sucCallback && sucCallback(result);
        },
        error: function (err) {
            console.log('ajaxPost_err', err);
            return errCallback && errCallback(err);
        }
    });
};

serviceObj.searchToutiaoList = function() {
    return new Promise((resolve, reject)=>{
        var currentTime = (new Date()).getTime() / 1000;

        var params = {
            tag: '__all__',
            ac: 'wap',
            count: 20,
            format: 'json_raw',
            as: 'A1651A1D18B02B4',
            cp: '5AD880A2CB347E1',
            max_behot_time: 1524100553,
            _signature: 'D3nTcwAAVabzADkPK7cm6w9502',
            i: 1524100553
        };

        var params2 = {
            tag: '__all__',
            ac: 'wap',
            count: 20,
            format: 'json_raw',
            as: 'A1D5FACDD8E5628',
            cp: '5AD86526E2B88E1',
            max_behot_time: currentTime, // 1524127259
            _signature: '89WH3gAAqRcPrG2iFd7l9.PVh8',
            i: currentTime
        };

        var url = 'https://m.toutiao.com/list/?';

        _.forEach(params2, (value, key)=>{
            url += key + '=' + value + '&';
        });

        url = url.substring(0, url.length - 1);
        return ajaxPost(url, {}, resolve, reject);
    });
};

export default serviceObj;