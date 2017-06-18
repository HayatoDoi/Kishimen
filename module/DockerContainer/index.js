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
	 * then  : @param None
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
					if( res.statusCode === 201 ){
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
					}
					else if( res.statusCode === 101 ){
						reject('DockerContainer.create() 101 : Logs returned as a stream');
					}
					else if( res.statusCode === 404 ){
						reject('DockerContainer.create() 404 : No such container');
					}
					else if( res.statusCode === 500 ){
						reject('DockerContainer.create() 500 : Server error');
					}
					else {
						reject('DockerContainer.create() ??? : ??? error');
					}
					
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
	 * コンテナの起動
	 * then  : @param None
	 * catch : @param {String} error
	 */
	start(){
		return new Promise((resolve, reject)=>{
			try{
				let opt = {
					socketPath : '/var/run/docker.sock',
					path : '/v1.29/containers/' + this.containerInfo.id + '/start',
					method : 'POST',
					headers : {
						'Content-Type' : 'application/json',
					},
				};
				//console.log(JSON.stringify(opt));
				let req = http.request(opt, (res)=>{
					//console.log('STATUS: ' + res.statusCode);
					if( res.statusCode === 204 ){
						//すべての処理が正常に行われた.
						resolve();
					}
					else if( res.statusCode === 304 ){
						reject('DockerContainer.start() 304 : Container already started');
					}
					else if( res.statusCode === 404 ){
						reject('DockerContainer.start() 404 : No such container');
					}
					else if( res.statusCode === 500 ){
						reject('DockerContainer.start() 500 : Server error');
					}
					else {
						reject('DockerContainer.start() ??? : ??? error');
					}
				});
				req.on('error', (e)=>{
					reject(e.message);
				});
				req.end();
			}
			catch(e){
				reject(e);
			}
		});
	}

	/**
	 * コンテナの停止
	 * then  : @param None
	 * catch : @param {String} error
	 */
	stop(){
		return new Promise((resolve, reject)=>{
			try{
				let opt = {
					socketPath : '/var/run/docker.sock',
					path : '/v1.29/containers/' + this.containerInfo.id + '/stop',
					method : 'POST',
					headers : {
						'Content-Type' : 'application/json',
					},
				};
				//console.log(JSON.stringify(opt));
				let req = http.request(opt, (res)=>{
					//console.log('STATUS: ' + res.statusCode);
					if( res.statusCode === 204 ){
						//すべての処理が正常に行われた.
						resolve();
					}
					else if( res.statusCode === 304 ){
						reject('DockerContainer.stop() 304 : Container already stopped');
					}
					else if( res.statusCode === 404 ){
						reject('DockerContainer.stop() 404 : No such container');
					}
					else if( res.statusCode === 500 ){
						reject('DockerContainer.stop() 500 : Server error');
					}
					else {
						reject('DockerContainer.stop() ??? : ??? error');
					}
				});
				req.on('error', (e)=>{
					reject(e.message);
				});
				req.end();
			}
			catch(e){
				reject(e);
			}
		});
	}

	/**
	 * コンテナの削除
	 * then  : @param None
	 * catch : @param {String} error
	 */
	remove(){
		return new Promise((resolve, reject)=>{
			try{
				let opt = {
					socketPath : '/var/run/docker.sock',
					path : '/v1.29/containers/' + this.containerInfo.id,
					method : 'DELETE',
					headers : {
						'Content-Type' : 'application/json',
					},
				};
				//console.log(JSON.stringify(opt));
				let req = http.request(opt, (res)=>{
					//console.log('STATUS: ' + res.statusCode);
					if( res.statusCode === 204 ){
						//すべての処理が正常に行われた.
						resolve();
					}
					else if( res.statusCode === 400 ){
						reject('DockerContainer.remove() 400 : Bad parameter');
					}
					else if( res.statusCode === 404 ){
						reject('DockerContainer.remove() 404 : No such container');
					}
					else if( res.statusCode === 409 ){
						reject('DockerContainer.remove() 409 : Conflict');
					}
					else if( res.statusCode === 500 ){
						reject('DockerContainer.remove() 500 : Server error');
					}
					else {
						reject('DockerContainer.remove() ??? : ??? error');
					}
				});
				req.on('error', (e)=>{
					reject(e.message);
				});
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
	 * catch : @param None
	 */
	getInfo(){
		return new Promise((resolve, reject)=>{
			resolve(this.containerInfo);
		});
	}
}

module.exports = DockerContainer;
