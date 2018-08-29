const httpProxy = require('http-proxy');
const http = require('http');
const cookie = require('cookie');
const server = http.createServer();
const proxy = httpProxy.createServer();
const Session = require('module/Session');
let session = new Session;
const Logger = require('module/Log');
let sysLogger = new Logger('log/Kisimen/log.log', 'debug').logger;
let accessLogger = new Logger('log/web/access.log', 'debug').logger;
session.endEventHandler = (sessionID)=>{
	sysLogger.info('session delete : ' + sessionID);
}

server.on('request',(req, res)=>{
	let c = req.headers.cookie || ""
	let sesstionID = cookie.parse(c).Kishimen_id
	if(sesstionID == undefined){
		sesstionID = session.new();
		sysLogger.info('session start : ' + sesstionID);
	}
	else{
		session.update(sesstionID);
	}
	res.setHeader('Set-Cookie', [`Kishimen_id=${sesstionID}; max-age=${60 * 30}`]);
	proxy.web(req, res, {target : {host : 'localhost',port : '8080'}});
});

server.listen(9000, ()=>{
	sysLogger.info('server listen : http://localhost:9000');
});

