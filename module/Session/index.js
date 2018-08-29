/**
 * データベース
 * File name : module/Session/index.js
 * Copyright (c) 2018, Hayato Doi
 * ------------------------------------------------
 * This software is released under the MIT License.
 * https://github.com/nikaidoumari/honeyweb/blob/master/LICENSE
 */


/* *
 * { sesstion_key : string,
 *   container_id : string
 * }
 * */
class Session{
	constructor(logger){
		this.sesstions = {}; //sesstion格納用配列
		this.logger = logger
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
		let r = "";
		for(let i=0; i<str_len; i++){
			r += c[Math.floor(Math.random()*cl)];
		}
		this.sesstions[r] = {};
		return r;
	}
	// debuug only
	showAll(){
		console.log(this.sesstions);
	}
	set(s, k, v){
		this.sesstions[s][k] = v;
	}
	get(s, k){
		return this.sesstions[s][k];
	}
}
module.exports = Session;
