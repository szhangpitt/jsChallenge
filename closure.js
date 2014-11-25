

// $(function(){
// 	console.log('docready');
// });

(function(){
	console.log('closure');
	
	function showName(firstName, lastName) {
		var nameIntro = 'Your name is ';

		function makeFullName() {
			return nameIntro + firstName + ' ' + lastName;
		}

		return makeFullName();
	}

	console.log(showName('Shaopeng', 'Zhang'));


})();

var result = ({
	name: (function(firstName, lastName){
		console.log('let me think of your name...');
		var fullName = firstName + ' ' + lastName;
		return fullName;

	}('Bill', 'Murry')), 

	age: 56, 

	init: function() {
		this.age -= 1;
		console.log('one year younger!');
		return this;
	}

}).init();

var nuclearSimulation = function() {
	var cacheKey = JSON.stringify(Array.prototype.slice.call(arguments)), 
	result;
	if(!nuclearSimulation[cacheKey]) {
		console.log('Umm...Let me think about it!');
		result = Array.prototype.join.call(arguments);
		nuclearSimulation[cacheKey] = result;
	}
	
	return nuclearSimulation[cacheKey];
}
console.log(nuclearSimulation('C', 'O2'));
console.log(nuclearSimulation('H', 'O2'));

console.log(nuclearSimulation('C', 'O2'));
console.log(nuclearSimulation);



console.log(result);

(function(){
	console.log('3rd closure');
});


var live = function() {
	console.log('You have to work hard...');
	console.log('You have to work harder...');
	live = function() {
		console.log('Then you can finally relax...');
	}
}

// live();
// live();

live.who = 'me';

var liveMe = live;

var myLife = {
	live: live
}

// live();
liveMe();
myLife.live();
live();



function celebrityIDCreator(theCelebrities) {
	var i;
	var uniqueID = 100;
	for (i = 0; i < theCelebrities.length; i++) {
		theCelebrities[i]["id"] = (function (j)  {
			return function(){
				return uniqueID + j;
			}
		}(i));
	}

	return theCelebrities;
}

var actionCelebs = [{name:"Stallone", id: 0}, {name:"Cruise", id: 0}, {name:"Willis", id:0}];

var createIdForActionCelebs = celebrityIDCreator(actionCelebs);

var stalloneID = createIdForActionCelebs [0];  

console.log(stalloneID.id()); // 103
console.log(stalloneID.id()); // 103


function celebrityName(firstName) {
	var nameIntro = "This celebrity is ";
    // this inner function has access to the outer function's variables, including the parameter​
    function lastName (theLastName) {
    	return nameIntro + firstName + " " + theLastName;
    }
    return lastName;
}

var mjName = celebrityName("Michael"); // At this juncture, the celebrityName outer function has returned.​

// The closure (lastName) is called here after the outer function has returned above​
// Yet, the closure still has access to the outer function's variables and parameter​
console.log(mjName ("Jackson")); // This celebrity is Michael Jackson 
