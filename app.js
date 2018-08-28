const httpProxy = require('http-proxy');
const http = require('http');
const cookie = require('cookie');
const server = http.createServer();
const proxy = httpProxy.createServer();
const DB = require('module/DB');
let db = new DB;

server.on('request',(req, res)=>{
	let c = req.headers.cookie || ""
	let sesstion_id = cookie.parse(c).Kishimen_id || db.newSession();
	console.log(sesstion_id);//dubug
	res.setHeader('Set-Cookie', [`Kishimen_id=${sesstion_id}; max-age=${60 * 30}`]);
	proxy.web(req, res, {target : {host : 'localhost',port : '8080'}});
});

server.listen(9000, ()=>{
	console.log('server listen...');
});

