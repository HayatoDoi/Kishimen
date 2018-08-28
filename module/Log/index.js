/**
 * ログ保存
 * File name : module/Log/index.js
 * Copyright (c) 2018, Hayato Doi
 * ------------------------------------------------
 * This software is released under the MIT License.
 * https://github.com/HayatoDoi/Kishimen/blob/master/LICENSE
 */

module.exports = class Logger {
	constructor(filename){
		const log4js = require('log4js');
		// log4js.configure({
		// 	appenders: { cheese: { type: 'file', filename: filename } },
		// 	categories: { default: { appenders: ['Kishimen'], level: 'error' } }
		// });
		//this.echo = log4js.getLogger('request');
		this.echo = log4js.getLogger();
		//this.echo.level = 'debug';
	}
}
