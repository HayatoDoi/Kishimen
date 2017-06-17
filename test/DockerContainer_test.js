/**
 * DockerContainer用テストコード
 * File name : test/DockerContainer_test.js
 * Copyright (c) 2017, Hayato Doi
 * ------------------------------------------------
 * This software is released under the MIT License.
 * https://github.com/nikaidoumari/honeyweb/blob/master/LICENSE
 */

const DockerContainer = require('../module/DockerContainer');

let dockerContainer = new DockerContainer({
	name:'struts/s2_3_1',
	privatePort:8080,
	publicPort:8080,
});

dockerContainer.create()
.then(()=>{
	console.log('Success : Container create');
	dockerContainer.getInfo()
	.then((info)=>{
		console.log(info);
			dockerContainer.start()
			.then(()=>{
				console.log('Success : Container start');
			})
			.catch((error)=>{
				console.log(error);
			});
	});
})
.catch((error)=>{
	console.error(error);
});

