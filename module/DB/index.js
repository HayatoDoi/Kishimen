/**
 * データベース
 * File name : module/DB/index.js
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
class DB{
	constructor(){
		this.sesstions = {}; //sesstion格納用配列
	}

	/**
	 * セッションの作成
	 * @param None
	 * @return {String} settion
	 */
	newSession(){
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
	showAllSesstions(){
		console.log(this.sesstions);
	}
	set(s, k, v){
		this.sesstions[s][k] = v;
	}
	get(s, k){
		return this.sesstions[s][k];
	}
}
module.exports = DB;
