var getWeekDay = (function(){
	console.log('initializing...');
	var weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']; 

	return function(n) {
		if (n >= 0 && n < 7) {
			return weekDays[n];
		}
	}

}());

console.log(getWeekDay(1));
console.log(getWeekDay(2));
console.log(getWeekDay(3));


function func(o) {
	o = null;
}

var x = [], 
obj = {a: 1, b: '2'};

func(x);
func(obj.a);

console.log(x);
console.log(obj);


//addf(3)(4) --> 7

function addf(x) {

	return function(y) {
		return x + y;
	}
}
var result = addf(3)(4);
console.log(result); 


//addf = applyf(add);
//addf(3)(4) --> 7
//applyf(mul)(5)(6) --> 30

function add (x, y) {
	return x + y;
}

function mul (x, y) {
	return x * y;
}

function applyf(fn) {

	return function(x) {
		return function(y) {
			return fn(x, y);
		}
	}
}

var addf = applyf(add);
console.log(addf(3)(4));
console.log(applyf(mul)(5)(6));


//Write a function that takes a 
//function and an argument, 
//and returns a function that can 
//supply a second argument
//add3 = curry(add, 3);
//add3(4) --> 7
//or, curry(mul, 5)(6)
function curry(fn, arg) {

	return function(arg2) {
		return fn(arg, arg2);
	}
}
var add3 = curry(add, 3);
console.log(add3(4));
console.log(curry(mul, 5)(6));

//Use all functions above to 
// //create inc function 
// var inc = addf(1);
// var inc = applyf(add)(1);
// var inc = curry(add, 1);


//Write methodize, a function 
//that converts a binary function 
//to a method. 
//Number.prototype.add = 
//	methodize(add);
//	(3).add(4) --> 7

function methodize(binaryFn) {
	return function(x) {
		return binaryFn(x, this);
	}
}

Number.prototype.add = methodize(add);
console.log((3).add(4));


//Write demethodize, a 
//function that convers a 
//method to a binary function. 
//demethodize(Number.prototype.add)(5, 6) //11
function demethodize(fn) {

	return function(x, y) {
		return fn.call(x, y);
	}
}

console.log(demethodize(Number.prototype.add)(5, 6));

//Write a function twice that 
//takes a binary functino and 
//returns a unary function that 
//passes its argument to the 
//binary function twice. 
var double = twice(add);
// double(11) //22
var square = twice(mul);
// square(11) //121

function twice(fn) {
	return function(x) {
		return fn(x, x);
	}
}

console.log(twice(add)(11));
console.log(twice(mul)(11));

//Write a function composeu 
//that takes two unary functions 
//and returns a unary function 
//that calls them both
// composeu(double, square)(3) //(3 + 3)^2 = 36
function composeu(fn1, fn2) {
	return function(x) {
		return fn2(fn1(x));
	}
}
console.log(composeu(double, square)(3)); //(3 + 3)^2 = 36


//Write a function composeb 
//that takes two binary functions 
//and returns a function that 
//calls them both. 
// function composeb(add, mul)(2, 3, 5) //25
function composeb(fn1, fn2) {
	return function(x, y, z) {
		return fn2(fn1(x, y), z); 
	}
}
console.log(composeb(add, mul)(2, 3, 5)); //25


//Write a function that allows 
//another function to only be 
//called once. 
// add_once = once(add);
// add_once(3, 4) //7
// add_once(3, 4) //throws
function once(fn) {

	return function() {
		var f = fn;
		fn = null;

		return f.apply(this, arguments);
	}
}

var add_once = once(add);
console.log(add_once(3, 4)); //7
// add_once(3, 4); //throws


//Write a factory function that 
//returns two functions that 
//implement an up/down counter. 
//counter = counterf(10); 
// counter.inc() //11
// counter.dec() //10
function counterf(x) {
	return {
		inc: function() {
			x += 1;
			return x;
		}, 
		dec: function() {
			x -= 1;
			return x;
		}
	}
}

var counter = counterf(10); 
console.log(counter.inc()); //11
console.log(counter.inc()); //12
console.log(counter.dec()); //11
console.log(counter.dec()); //10


//Make a revocable function that takes 
//a nice function, and returns a 
//revoke function that denies access 
//to the nice function, and an invoke 
//function that can invoke the nice 
//function until it is revoked
//temp = revocable(alert);
//temp.invoke(7); //alert 7
//temp.revoke();
//temp.invoke(8); //throws
function revocable(fn) {
	return {
		invoke: function() {
			var f = fn;
			return fn.apply(null, arguments);
		},
		revoke: function() {
			fn = null;
		} 
	}
}

var temp = revocable(alert);
temp.invoke(7); //alert 7
temp.revoke();
// temp.invoke(8); //throws

//Monads
function MONAD() {
	return function unit(value) {
		var monad = Object.create(null);
		monad.bind = function(func) {
			return func(value);
		}
		return monad;
	}
}

var unit = MONAD(); 
var monad = unit('Hello World');
monad.bind(alert);





