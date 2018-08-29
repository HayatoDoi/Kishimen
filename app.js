const httpProxy = require('http-proxy');
const http = require('http');
const cookie = require('cookie');
const requestIp = require('request-ip');
const server = http.createServer();
const proxy = httpProxy.createServer();
require('date-utils');
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
	req.sessionID = cookie.parse(c).Kishimen_id
	if(req.sessionID == undefined){
		req.sessionID = session.new();
		sysLogger.info('session start : ' + req.sessionID);
	}
	else{
		session.update(req.sessionID);
	}
	res.setHeader('Set-Cookie', [`Kishimen_id=${req.sessionID}; max-age=${60 * 30}`]);
	
	var _write = res.write;
	res.write = (data)=>{
		_write.call(res, data.toString());

		const remoteAddr = requestIp.getClientIp(req),
					timeLocal = getTimeLocal(),
					request = `${req.method} ${req.url} HTTP/${req.httpVersion}`,
					status = res.statusCode,
					bytesSent = Buffer.byteLength(data),
					referer = req.headers['referer'] || '',
					userAgent = req.headers['user-agent'] || '';
		let l = `${req.sessionID} ${remoteAddr} - - [${timeLocal}] "${request}" ${status} ${bytesSent} "${referer}" "${userAgent}"`;
		console.log(l);
	}

	proxy.web(req, res, {target : {host : 'localhost',port : '8080'}});
});

server.listen(9000, ()=>{
	sysLogger.info('server listen : http://localhost:9000');
});

function getTimeLocal(){
	const date = new Date();
	let offset = -date.getTimezoneOffset();
	offset = (offset>=0?'+':'-') + ('00' + parseInt(offset/60)).slice(-2)
						+ ('00' + offset%60).slice(-2);
	const timeLocal = `${date.toFormat('DD/MMM/YYYY:HH24:MI:SS')} ${offset}`;
	return timeLocal;
}
