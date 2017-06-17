/**
 * DockerContainer関係のクラス
 * File name : module/DockerContainer.js
 * Copyright (c) 2017, Hayato Doi
 * ------------------------------------------------
 * This software is released under the MIT License.
 * https://github.com/nikaidoumari/honeyweb/blob/master/LICENSE
 */

'use strict';
const http = require('http');

class DockerContainer{
	constructor(obj){
		this.containerInfo = {};
		this.containerInfo.name = obj.name;
		this.containerInfo.id = null;
		this.containerInfo.privatePort = obj.privatePort;
		this.containerInfo.publicPort = obj.publicPort;
	}

	/**
	 * コンテナの作成
	 * then  : @param {}
	 * catch : @param {String} error
	 */
	create(){
		return new Promise((resolve, reject)=>{
			try{
				let postJson = {};
				postJson['Image'] = this.containerInfo.name;
				postJson['HostConfig'] = {};
				postJson['HostConfig']['PortBindings'] = {};
				postJson['HostConfig']['PortBindings'][this.containerInfo.privatePort + '/tcp'] = [
					{ HostPort: String(this.containerInfo.publicPort) }
				];
				//console.log(JSON.stringify(postJson));
				let opt = {
					socketPath : '/var/run/docker.sock',
					path : '/v1.29/containers/create',
					method : 'POST',
					headers : {
						'Content-Type' : 'application/json',
						'Content-Length': JSON.stringify(postJson).length,
					},
				};
				let req = http.request(opt, (res)=>{
					//console.log('STATUS: ' + res.statusCode);
					if( res.statusCode < 200 || res.statusCode > 299){
						reject('Status Code is not 200-299');
					}
					res.setEncoding('utf8');
					res.on('data', (chunk)=>{
						//console.log('BODY: ' + chunk);
						let reqJson = JSON.parse(chunk);
						if(reqJson['Id'] == undefined){
							reject('DockerAPI error : ' + chunk);
						}
						this.containerInfo.id = reqJson['Id'];
						//すべての処理が正常に行われた.
						resolve();
					});
				});
				req.on('error', (e)=>{
					reject(e.message);
				});
				// Jsonデータの書き込み
				req.write(JSON.stringify(postJson));
				req.end();
			}
			catch(e){
				reject(e);
			}
		});
	}

	/**
	 * コンテナ情報の表示
	 * then  : @param {Object} info
	 * catch : なし
	 */
	getInfo(){
		return new Promise((resolve, reject)=>{
			resolve(this.containerInfo);
		});
	}
}

module.exports = DockerContainer;
