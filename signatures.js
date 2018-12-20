module.exports = [
	{pattern_point: 'requestUrl',pattern_regexp:/\.\.\/\.\.\//, name:'directory-traversal'},
	{pattern_point: 'userAgent',pattern_regexp:/\(\)\{:;\}/, name:'shell-shock'},
];
