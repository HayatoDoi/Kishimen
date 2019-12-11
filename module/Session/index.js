/**
 * データベース
 * File name : module/Session/index.js
 * Copyright (c) 2018, Hayato Doi
 * ------------------------------------------------
 * This software is released under the MIT License.
 * https://github.com/nikaidoumari/honeyweb/blob/master/LICENSE
 */


/* *
 * { sesstion_key(string) : {
 *   timerID : id
 * },
 * }
 * */
class Session{
	constructor(){
		this.__sesstions = {}; //sesstion格納用配列
		this.__sessionEndTime = 5 * 1000;//sec
	}

	/**
	 * セッションの作成
	 * @param None
	 * @return {String} settion
	 */
	new(){
		// 生成する文字列の長さ
		const str_len = 40;
		// 生成する文字列に含める文字セット
		const c = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
		const cl = c.length;
		let sessionID = "";
		for(let i=0; i<str_len; i++){
			sessionID += c[Math.floor(Math.random()*cl)];
		}
		//make session
		this.__sesstions[sessionID] = {};
		//start session timer
		let timerID = setTimeout(()=>{
			this.delete(sessionID);
		},this.__sessionEndTime);
		this.set(sessionID, 'timerID', timerID);
		return sessionID;
	}
	// debuug only
	showAll(){
		return this.__sesstions;
	}
	set(s, k, v){
		this.__sesstions[s][k] = v;
	}
	get(s, k){
		return this.__sesstions[s][k];
	}
	update(sessionID){
		clearTimeout(this.get(sessionID, 'timerID'));
		let timerID = setTimeout(()=>{
			this.delete(sessionID);
		},this.__sessionEndTime);
		this.set(sessionID, 'timerID', timerID);
	}
	delete(sessionID){
		delete this.__sesstions[sessionID];
		if(this.endEventHandler != undefined){
			this.endEventHandler(sessionID);
		}
	}
}
module.exports = Session;
