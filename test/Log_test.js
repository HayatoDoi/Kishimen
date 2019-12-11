const Logger = require('module/Log');

let logger = new Logger('log/Kisimen/log.log', 'debug').logger;

logger.trace('trace trace');
logger.debug('debug debug');
logger.info('info info');
logger.warn('warn warn');
logger.error('error error');
logger.fatal('fatal');

