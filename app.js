const httpProxy = require('http-proxy');
const http = require('http');

const server = http.createServer();
const proxy = httpProxy.createServer();
const DB = require('./module/DB');
let db = new DB;

server.on('request',(req, res)=>{

	//if(req.headers['cookie'] != undefined){
	//	const cookie = req.headers['cookie'];
	//	console.log(cookie);
	//}
	console.log(req.getHeader);
	//初回アクセス
	const sesstion_id = db.newSession();
	res.setHeader('Set-Cookie',  [`Kishimen_id=${sesstion_id}`]);
	proxy.web(req, res, {target : {host : 'localhost',port : '8080'}});
});
server.listen(9000, ()=>{
	console.log('server listen...');
});
