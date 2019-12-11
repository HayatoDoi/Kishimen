const SignatureMatch = require('../module/SignatureMatch');
const sig = require('../signatures');

const signatureMatch = new SignatureMatch(sig);

let l = {"hackerID":"T6TLFDz2wSRzI45ULBtxxQMPVLofVDYOfAtnVeuG","remoteAddr":"::1","timeLocal":1545307763542,"requestMethod":"GET","requestUrl":"../../../../../../hoge.html","statusCode":404,"bytesSent":169,"referer":"","userAgent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10.13; rv:61.0) Gecko/20100101 Firefox/61.0"};
console.log(signatureMatch.match(l));
