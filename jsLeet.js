function peek(array) {
	if(Object.prototype.toString.call(array) === '[object Array]') {
		var len = array.length;
		return array[len - 1];
	}
}

// In the first 16 terms of the binary Van der Corput sequence

// 0, 8, 4, 12, 2, 10, 6, 14, 1, 9, 5, 13, 3, 11, 7, 15
// a longest increasing subsequence is

// 0, 2, 6, 9, 13, 15.
// This subsequence has length six; the input sequence has no seven-member increasing subsequences. The longest increasing subsequence in this example is not unique: for instance,

// 0, 4, 6, 9, 11, 15 or 0, 4, 6, 9, 13, 15
// are other increasing subsequences of equal length in the same input sequence.
(function(){
	var arr = [0, 8, 4, 12, 2, 10, 6, 14, 1, 9, 5, 13, 3, 11, 7, 15];
	//LIS
	//0: 0
	//1: 0, 8
	//2: 4
	//3: 0, 8, 12
	//4: 2
	//5: 0, 8, 10
	//6: 4, 6
	//7: 0, 8, 12, 14


	findLongestIncreasingSubSeq(arr);

	function findLongestIncreasingSubSeq(a) {


		if(Object.prototype.toString.call(a) === '[object Array]' && a.length > 0) {
			var LIS = {},  
			len = a.length;

			LIS[0] = [];
			LIS[0].push(a[0]);


			for (var i = 1; i < len; i += 1) {
				console.log('constructing LIS[' + i + '] for ', a.slice(0, i + 1));
				LIS[i] = appendToMaxLIS(LIS, a, i, a[i])

			}

			console.log(LIS);
		}
	}

	function appendToMaxLIS(LIS, array, upToIndex, element) {
		var maxLISItem = [], 
		maxLISItemK = 0;

		for (var k = 0; k < upToIndex; k += 1) {
			console.log('----examining LIS[' + k + ']', LIS[k]);
			if(peek(LIS[k]) < element && LIS[k].length > maxLISItem.length) {
				console.log('--------candidate LIS[' + k + ']', LIS[k]);
				maxLISItem = LIS[k].slice(0);
			}
		}

		maxLISItem.push(element);
		console.log('----return maxLISItem', maxLISItem);
		return maxLISItem;
	}

}());


//Given an array of numbers, return array of products of all other numbers (no division)
//[a0, a1, a2, a3]
//[a1a2a3, a0a2a3, a0a1a3, a0a1a2]
// ===
//[1,      a0,     a0a1,   a0a1a2]
//[a1a2a3, a2a3,   a3,     1]

//[1234, 0234, 0134, 0124, 0123]
// ===
//[_1,   0,    01,   012,  0123]
//[1234, 234,  34,   4,      _1]
(function(){
	var array = [1, 2, 3, 4], len = array.length;;
	
	var arr1 = [], 
	arr2 = [], 
	result = [];;

	arr1[0] = 1,
	arr2[len - 1] = 1; 


	for (var i = 1; i < len; i += 1) {
		arr1[i] = arr1[i - 1] * array[i - 1];
		arr2[len - i - 1] = arr2[len - i] * array[len - i];
	}

	for (var j = 0; j < len; j += 1) {
		result[j] = arr1[j] * arr2[j];
	}

	console.log(array);
	console.log(arr1);
	console.log(arr2);
	console.log(result);


}());


//hash table
(function(){
	function HashTable() {
		this.hashes = {};
	}

	HashTable.prototype = {
		constructor: HashTable,

		put: function( key, value ) {
			console.log('put: key = ' + JSON.stringify( key ));
			this.hashes[ JSON.stringify( key ) ] = value;
		},

		get: function( key ) {
			return this.hashes[ JSON.stringify( key ) ];
		}
	};

	var myHash = new HashTable(),
	object1 = { '1': 'hello', '2': 'world' },
	object2 = { '1': 'world', '2': 'hello' };

	myHash.put(object1, "value1");
	myHash.put(object2, "value2");

	console.log(myHash.get(object1));
	console.log(myHash.get(object2));
}());