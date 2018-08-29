/**
 * ログ保存
 * File name : module/Log/index.js
 * Copyright (c) 2018, Hayato Doi
 * ------------------------------------------------
 * This software is released under the MIT License.
 * https://github.com/HayatoDoi/Kishimen/blob/master/LICENSE
 */

module.exports = class Logger {
	constructor(filename, level = 'error'){
		const log4js = require('log4js');
		log4js.configure({
			appenders:{
				file:{type:'file', filename:filename},
				console:{type:'console'}
				},
			categories:{default:{appenders:['file', 'console'], level:level}}
			});
		this.logger = log4js.getLogger('Kishimen');
	}
}
