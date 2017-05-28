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
var HOST = "monimoniau.agile.kddi.com";
var PATH = "/test";
var PORT = 8081;

exports.handler = function(event, context) {

    // API Gateway から受け取るったeventのbodyをJSONにパースする
    // eventでJSON形式のデータを受け取る場合は、コメントアウトする
    var body = JSON.parse(event.body);

    // eventでJSON形式のデータを受け取る場合は、コメントアウトを外す
    // var body = event;

    // パースしたりbodyからvalueを取り出して、
    // POSTのbodyに指定JSONを作成する
    console.log("value1 = " + body.key1);
    console.log("value2 = " + body.key2);
    console.log("value3 = " + body.key3);

    var postData = {
    "key1": body.key1,
    "key2": body.key2,
    "key3": body.key3
    };

    // POSTのリクエストを作成する
    var postDataStr = JSON.stringify(postData);
    var options = {
        host: HOST,
        port: PORT,
        path: PATH,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': postDataStr.length
        }
    };

    // POSTリクエストを送信する
    var req = http.request(options, function(res) {

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

    req.write(postDataStr);
    req.end();
};
