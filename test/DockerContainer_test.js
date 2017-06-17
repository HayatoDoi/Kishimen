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
	Name:'struts/s2_3_31',
	privatePort:80,
	publicPort:80,
});

dockerContainer.create()
.then(()=>{
	console.log('Success : Container create');
	dockerContainer.getInfo()
	.then((info)=>{
		console.log(info);
	});
})
.catch((error)=>{
	console.error(error);
});

