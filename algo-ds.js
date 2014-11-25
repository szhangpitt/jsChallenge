//You have 2 Lists of colors. 
//implement a function that print the 
//colors in the second list by their 
//order in the first. 
//ignore other colors. 
//print duplicates. 

(function(){
	var color1 = ['red', 'purple', 'black', 'blue', 'white', 'red', 'blue', 'green'], 
	color2 = ['red', 'white', 'purple', 'olive'], 
	len1 = color1.length, 
	len2 = color2.length;
	
	var checkList = {};

	for (var i = 0; i < len1; i += 1) {
		if(!checkList[color1[i]]) {
			checkList[color1[i]] = {existing: true};	
		}
		else {
			checkList[color1[i]].duplicate = true;
		}
	}

	for (var j = 0; j < len2; j += 1) {
		if (checkList[color2[j]] && checkList[color2[j]].existing) {
			console.log(color2[j]);
			if (checkList[color2[j]].duplicate) {
				console.log(color2[j] + ' has duplicates in color1');
			}
		}
	}


}());

// 1. Function to detect a Palindrome.
(function(){
	var str = 'ababbaba';
	var str2 = 'aba';
	var str3 = 'ab';
	
	function isPalindrome1(testString) {
		return testString.split('').reverse().join('') === testString;
	}

	function isPalindrome2(testString) {
		var len = testString.length;

		// 1, 2, 3, 4   //0 - 3, 1 - 2
		// 1, 2, 3, 4, 5, 6, 7  //0 - 6, 1 - 5, 2 - 4, 3 - 3
		for (var i = 0; i < len / 2; i += 1) {
			console.log('checking char at ' + i);
			var mirrori = len - 1 - i;
			if (testString[i] !== testString[mirrori]) {
				return false;
			}
		}

		return true;
	}

	console.log(isPalindrome1(str));
	console.log(isPalindrome2(str2));


}());

Array.prototype.peek = function() {
	var len = this.length;
	if(len > 0){
		return this[len - 1];			
	}
	return false;
}

console.log([1, 2, 3, 4].peek());

// 2. Function to return the minimum splits in order to make a string collection of Palindrome
(function(){
	// aba|abba|aba|aba
	var string = 'abaabbaabaaba';
	console.log(detectMinPalindromes(string));


	function detectMinPalindromes(testString) {

		var len = string.length, 
		lookAhead, 
		palindromeSlices = [], 
		checkString, 
		i, j;

		for(i = 0; i < len; i += 1) {
			for (j = i + 1; j < len; j += 1) {
				checkString = string.substring(i, j + 1);
				console.log('check: ' + checkString + 'i: ' + i + ' j: ' + j);
				if(isPalindrome(checkString)) {
					palindromeSlices.push(checkString);
					console.log(palindromeSlices.peek());
					i = j ;
					break;
				}
			}

		}

		return palindromeSlices;
	}

	function isPalindrome(testString) {
		var len = testString.length;

		// 1, 2, 3, 4   //0 - 3, 1 - 2
		// 1, 2, 3, 4, 5, 6, 7  //0 - 6, 1 - 5, 2 - 4, 3 - 3
		for (var i = 0; i < len / 2; i += 1) {
			// console.log('checking char at ' + i);
			var mirrori = len - 1 - i;
			if (testString[i] !== testString[mirrori]) {
				return false;
			}
		}

		return true;
	}

}());



//Design a cache that holds stock prices up to certain time (for ex. 1 hour) 
//then go fetch from the API (stock exchange).
// (function(){
// 	var cache = (function(){
// 		var stockPrice;

// 		var factory = ({			
// 					updatePrice: function(price) {
// 						stockPrice = price;
// 					},

// 					getPrice: function() {
// 						return stockPrice;
// 					}, 

// 					fetchAPI: function() {
// 						console.log('go get the price...');
// 						setTimeout(function() {
// 							stockPrice = 100 * Math.random();
// 							console.log('price is ' + stockPrice);						
// 						}, 200);
// 					}, 

// 					init: function() {
// 						this.fetchAPI();
// 						setInterval(this.fetchAPI, 1000);

// 						return this;
// 					}
// 				}).init();

// 		return factory;
// 	}());

// 	setInterval(function(){
// 		// console.log('user query:---------' + cache.getPrice() + '------------');
// 	}, 5000)


// }());


//How to rebalance a search tree (binary tree)
(function(){
	var n4 = {value: 4, left: null, right: null},
	n7 = {value: 7, left: null, right: null},
	n13 = {value: 13, left: null, right: null},

	n1 = {value: 1, left: null, right: null},
	n6 = {value: 6, left: n4, right: n7},
	n14 = {value: 14, left: n13, right: null},

	n3 = {value: 3, left: n1, right: n6},
	n10 = {value: 10, left: null, right: n14},

	n8 = {value: 8, left: n3, right: n10};

	var tree = n8;


	console.log(insert(5, tree));

	var orderedQueue = [];
	traverse(tree, 0, function(node){
		orderedQueue.push(node.value);
	});
	console.log('callback: ', orderedQueue);
	
	function insert(value, tree) {
		var newNode = {value: value, left: null, right: null}; 
		var node = tree, 
		parent, 
		n = 0;

		do {
			parent = node;
			console.log('checking node ', node);

			if (value < node.value) {				
				// if (node.left) {
					node = node.left;
				// }
			}
			else if (value > node.value) {
				// if (node.right) {
					node = node.right;
				// }
			}
			else {
				console.log('value existing on ', node);
				return false;
			}

			n += 1;
		} while(node && n < 100);
		
		if(value < parent.value) {
			parent.left = newNode;
		}
		else {
			parent.right = newNode;
		}

		return tree;
	}

	//order = -1 (pre), 0(in), 1(post)
	
	function traverse(node, order, callback) {
		if(node) {
			if(order === 0) {
				traverse(node.left, order, callback);
			callback(node);
				console.log('traverse0: ' + node.value);				
				traverse(node.right, order, callback);				
			}
			else if(order === -1) {
			callback(node);
				console.log(node.value);
				traverse(node.left, order, callback);
				traverse(node.right, order, callback);				
			}
			else if(order === 1) {
				traverse(node.left, order, callback);
				traverse(node.right, order, callback);				
			callback(node);
				console.log(node.value);				
			}
			return;
		}
		else {
			return;
		}
	}

	

}());





//Given a large array of integers 
//return the length of the longest increasing 
//(non-necessarily-adjacent) subsequence.
//[1, 2, 4, -3, 4, -1, 5, -10];
(function(){
	var arr = [0, 8, 4, 12, 2, 10, 6, 14, 1, 9, 5, 13, 3, 11, 7, 15];

	console.log(longestIncreasingSub(arr));

	function longestIncreasingSub(a) {
		var len = a.length, 
			tempLargest = [], 
			thisRound = [],
			largestLen = 0, 
			counter = 0;

		for (var i = 0; i < len /*&& len - 1 - i + 1 > tempLargest.length*/; i += 1) {			
			thisRound = [];
			thisRound.push(a[i]);
			
			for (var j = i + 1; j < len; j += 1) {
				
				if(a[j] > thisRound.peek()) {
					thisRound.push(a[j]);
				}

				counter += 1;
			}

			if(thisRound.length > tempLargest.length) {
				console.log(tempLargest);
				tempLargest = thisRound;				
			}
		}

		console.log(counter);
		return tempLargest;
	}

}());
