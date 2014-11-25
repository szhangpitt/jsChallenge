Boolean.prototype.xor = function ( value ) { 
	return !!this !== !!value; 
};

console.log(false.xor(false));   // => true
