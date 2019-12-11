const httpProxy = require('http-proxy');
const http = require('http');
const cookie = require('cookie');
const requestIp = require('request-ip');
const VisualizationApp = require('VisualizationApp');
const fs = require('fs');
const server = http.createServer();
const proxy = httpProxy.createServer();
require('date-utils');
const Session = require('module/Session');
let session = new Session;
const Logger = require('module/Log');
let sysLogger = new Logger('log/Kisimen/log.log', 'debug').logger;
session.endEventHandler = (sessionID)=>{
	sysLogger.info('session delete : ' + sessionID);
}
const SignatureMatch = require('module/SignatureMatch');
const signatures = require('signatures');
const signatureMatch = new SignatureMatch(signatures);

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

		let l = {
			hackerID : req.sessionID,
			remoteAddr : requestIp.getClientIp(req),
			hackMethod : '',
			// timeLocal : getTimeLocal(),
			timeLocal : Date.now(),
			requestMethod : req.method,
			requestUrl : req.url,
			statusCode : res.statusCode,
			bytesSent : Buffer.byteLength(data),
			referer : req.headers['referer'] || '',
			userAgent : req.headers['user-agent'] || '',
		};
		l.hackMethod = signatureMatch.match(l) || '';
		appendFile('log/web/access.log', JSON.stringify(l) + '\n');
	}

	proxy.web(req, res, {target : {host : 'localhost',port : '8080'}});
});

server.listen(9000, ()=>{
	sysLogger.info('server listen : http://localhost:9000');
});

VisualizationApp();

function getTimeLocal(){
	const date = new Date();
	let offset = -date.getTimezoneOffset();
	offset = (offset>=0?'+':'-') + ('00' + parseInt(offset/60)).slice(-2)
						+ ('00' + offset%60).slice(-2);
	const timeLocal = `${date.toFormat('DD/MMM/YYYY:HH24:MI:SS')} ${offset}`;
	return timeLocal;
}

function appendFile(path, data) {
	fs.appendFile(path, data, function (err) {
		if (err) {
			throw err;
		}
	});
}

