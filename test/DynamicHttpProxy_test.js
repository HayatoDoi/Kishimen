/**
 * リバースプロキシ用テストコード
 * File name : test/DynamicHttpProxy_test.js
 * Copyright (c) 2017, Hayato Doi
 * ------------------------------------------------
 * This software is released under the MIT License.
 * https://github.com/nikaidoumari/honeyweb/blob/master/LICENSE
 */
const httpProxy = require('http-proxy');
const http = require('http');

const server = http.createServer();
const proxy = httpProxy.createServer();

let tid;
server.on('request',(req, res)=>{
	//初回アクセス
	proxy.web(req, res, {target : {host : 'localhost',port : '8080'}});
	clearTimeout(tid);
	tid = setTimeout(function() {
		console.log('Time Out');
	}, 10000);//10s
	console.log(req.headers.kishimen);
	// console.log("k");
});
server.listen(9000);
