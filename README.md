# AWS Lambda Sample RequestTransfer

## 概要

Lambdaで受信したデータを別のホストへ転送する

## Lambda関数の動作

1. Lambda関数が受け取ったjson形式のeventをパースする
2. パースしたデータを元にHTTPリクエスト(GET or POST)を作成する
3. HTTPリクエストを送信する

## 準備

### Lambda

1. 設計図で「microservice-http-endpoint(nodejs)」でを選択する
2. トリガーで「API Gateway」を選択する
3. 関数を設定する

### API Gateway

1. API GatewayでAPI/ 使用プラン/APIキーなどを設定する
