'use strict';

/* Sample Request

curl -v  --request POST \
--header "x-api-key:xxxxxxxxxx" \
--header "Content-Type: application/json" \
--data '{"key1": "value1", "key2": "value2", "key3": "value3"}' \
https://xxx.execute-api.us-west-2.amazonaws.com/xxx/xxx

*/

console.log('Loading function');

var http = require ('http');

// リクエストの送信先
var HOST = "monimoniau.agile.kddi.com:8081";
var PATH = "/test";

exports.handler = function(event, context) {

    // API Gateway から受け取るったeventのbodyをJSONにパースする
    //var body = JSON.parse(event.body);

    // eventでJSON形式のデータを受け取る場合は、
    var body = event

    // パースしたりbodyからvalueを取り出して、
    // GETのパラメータに指定する

    console.log("value1 = " + body.key1);
    console.log("value2 = " + body.key2);
    console.log("value3 = " + body.key3);

    var url = "http://"+ HOST + PATH
                + "?key1=" + body.key1
                + "&key2=" + body.key2
                + "&key3=" + body.key3;

    // GETリクエストを送信する
    console.log("request : " + url);

    http.get(url, function(res) {

        console.log("Got response: " + res.statusCode);

        var response = {
          statusCode: res.statusCode,
          headers: res.header,
          body: res.body
        };
        context.done(null, response);

    }).on('error', function(e) {
        context.done('error', e);
    });
};
