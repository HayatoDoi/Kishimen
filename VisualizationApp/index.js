const express = require('express');
const path = require('path');

module.exports = function main(){
	const HTTP_PORT = '5001';

	const app = express();

	app.set('view engine', 'pug');
	app.set('views', path.join(__dirname, './views'));
	app.use('/assets/', express.static(path.join(__dirname, './assets')));

	app.get('/', function(req, res){
		res.render('index', {
			title: 'Kishimen -- ',
		});
	});

	app.listen(HTTP_PORT);
}

