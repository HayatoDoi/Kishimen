var accessLog = [];
var drawChartData = {};
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
	switch ( xhr.readyState ) {
		case 0:
			// 未初期化状態.
			console.log( 'uninitialized!' );
			break;
		case 1: // データ送信中.
			console.log( 'loading...' );
			break;
		case 2: // 応答待ち.
			console.log( 'loaded.' );
			break;
		case 3: // データ受信中.
			console.log( 'interactive... '+xhr.responseText.length+' bytes.' );
			break;
		case 4: // データ受信完了.
			if( xhr.status == 200 || xhr.status == 304 ) {
				// var data = xhr.responseText; // responseXML もあり
				for(i in xhr.responseText.split(/\r\n|\r|\n/)){
					var d = xhr.responseText.split(/\r\n|\r|\n/)[i];
					if(d == '') break;
					var dObj = JSON.parse(d);
					// console.log(dObj);
					accessLog.push(dObj);
				}
				// console.log( 'COMPLETE! :\n'+data );S
				drawChartData = constData(accessLog);
				drawCanvas();
				drawTable();
			} else {
				console.log( 'Failed. HttpStatus: '+xhr.statusText );
			}
			break;
	}
};
xhr.open("GET","/assets/access.log");
xhr.send();

function drawCanvas(){
	var color = Chart.helpers.color;
	var canvasData = {};
	canvasData.labels = [];
	canvasData.datasets = [{
		backgroundColor: color(window.chartColors.blue).alpha(0.5).rgbString(),
		borderColor: window.chartColors.blue,
		data:[]
	}];
	for(key in drawChartData){
		canvasData.labels.push(key.substring(0, 5));
		canvasData.datasets[0].data.push(drawChartData[key]);
	}
	canvasData.datasets[0].data.push(0);
	var ctx = document.getElementById('canvas').getContext('2d');
	window.myBar = new Chart(ctx, {
		type: "bar",
		data: canvasData,
		options: {
			responsive: false,
			legend: {
				position: 'top',
				display:false,
			},
			onClick:(e, el)=>{
				if (! el || el.length === 0) return;
				var label = el[0]._model.label;
				selectHoackerID(label);
				clearTable();
				drawTable(label);
			}
		}
	});
}

function selectHoackerID(hackerID){
	var color = Chart.helpers.color;
	var canvasData = {};
	canvasData.labels = [];
	canvasData.datasets = [{
		backgroundColor: [],
		borderColor: [],
		data:[]
	}];
	for(key in drawChartData){
		canvasData.labels.push(key.substring(0, 5));
		canvasData.datasets[0].data.push(drawChartData[key]);
		canvasData.datasets[0].backgroundColor.push(
			(key.substring(0,5) === hackerID)
				?color(window.chartColors.red).alpha(0.5).rgbString()
				:color(window.chartColors.blue).alpha(0.5).rgbString()
		);
		canvasData.datasets[0].borderColor.push(
			(key.substring(0,5) === hackerID)
				?color(window.chartColors.red)
				:color(window.chartColors.blue)
		);
	}
	canvasData.datasets[0].data.push(0);

	window.myBar.data = canvasData;
	window.myBar.update();
}

function constData(data){
	var r = {};
	for(var i = 0; i < data.length; i++){
		var d = data[i];
		r[d['hackerID']] == undefined ? r[d['hackerID']] = 1 : r[d['hackerID']]++;
	}
	return r;
}

function compare(a, b) {
	// Use toUpperCase() to ignore character casing
	const genreA = a.timeLocal;
	const genreB = b.timeLocal;

	let comparison = 0;
	if (genreA > genreB) {
		comparison = 1;
	} else if (genreA < genreB) {
		comparison = -1;
	}
	return comparison;
}

function drawTable(hackerID){
	var table = document.getElementById('table');
	for(i in accessLog){
		var al = accessLog[i];
		if(al.hackerID.substring(0, 5) === hackerID || hackerID == undefined){
			console.log(al);
			var tr = document.createElement('tr');
			var tdHackerID = document.createElement('td');
			var tdRemoteAddr = document.createElement('td');
			var tdTime = document.createElement('td');
			var tdRequestMethod = document.createElement('td');
			var tdRequestUrl = document.createElement('td');
			var tdStatusCode = document.createElement('td');
			var tdBytesSent = document.createElement('td');
			var tdUserAgent = document.createElement('td');
			tdHackerID.textContent = al.hackerID;
			tdRemoteAddr.textContent = al.remoteAddr;
			tdTime.textContent = al.timeLocal;
			tdRequestMethod.textContent = al.requestMethod;
			tdRequestUrl.textContent = al.requestUrl;
			tdStatusCode.textContent = al.statusCode;
			tdBytesSent.textContent = al.bytesSent;
			tdUserAgent.textContent = al.userAgent;
			tr.appendChild(tdHackerID);
			tr.appendChild(tdRemoteAddr);
			tr.appendChild(tdTime);
			tr.appendChild(tdRequestMethod);
			tr.appendChild(tdRequestUrl);
			tr.appendChild(tdStatusCode);
			tr.appendChild(tdBytesSent);
			tr.appendChild(tdUserAgent);
			table.appendChild(tr);
		}
	}
}
function clearTable(callback){
	var table = document.getElementById('table');
	while(table.children.length != 1){
		table.removeChild(table.childNodes.item(1));
	}
	if(callback){
		callback();
	}
}
