var ticker = ['MSFT', '80', 'GOOG', '100', 'FB', '100.3', 'BABA', '120.23'];
var portfolio = ['MSFT', 'FB'];

//output: 
// MSFT,80,Y
// GOOG,100,N
// FB,100.3,Y
// BABA,120.23,Y

var tickerLookUp = {},
	portfolioLookUp = {},
	tlen = ticker.length, 
	plen = portfolio.length;

for (var i = 0; i < tlen; i++) {
	if(i % 2 === 0) {
		tickerLookUp[ticker[i]] = {name: ticker[i], price: ticker[i + 1]};
	}
}
//

for (var j = 0; j < plen; j++) {
	portfolioLookUp[portfolio[j]] = true;
}


for (var key in tickerLookUp) {
	console.log((tickerLookUp[key].name + ',' + tickerLookUp[key].price + ',') + (portfolioLookUp[key] && 'Y' || 'N'));
}




var arr = [6, 2, 3, 6, 3, 7, 7];
var lookUpTable ={}, 
	len = arr.length;
var output = [];
for (var i = 0; i < len; i++) {
	if (!lookUpTable[arr[i]]) {
		output.push(arr[i]);
		lookUpTable[arr[i]] = true; 
	}
}

console.log('output: ', output);
console.log('lookUpTable: ', lookUpTable);

