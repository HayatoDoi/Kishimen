const httpProxy = require('http-proxy');
const http = require('http');
const cookie = require('cookie');
const server = http.createServer();
const proxy = httpProxy.createServer();
const Session = require('module/Session');
let session = new Session;
const Logger = require('module/Log');
let logger = new Logger('log/Kisimen/log.log', 'debug').logger;

server.on('request',(req, res)=>{
	let c = req.headers.cookie || ""
	let sesstion_id = cookie.parse(c).Kishimen_id
	if(sesstion_id == undefined){
		sesstion_id = session.new();
		logger.info('session start : ' + sesstion_id);
	}
	res.setHeader('Set-Cookie', [`Kishimen_id=${sesstion_id}; max-age=${60 * 30}`]);
	proxy.web(req, res, {target : {host : 'localhost',port : '8080'}});
});

server.listen(9000, ()=>{
	logger.info('server listen : http://localhost:9000');
});

