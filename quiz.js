'use strict';

function User(name, email) {
	this.name = name || 'This guy is lazy. He didn\'t leave a name'; 
	this.email = email|| 'This guy is lazy. He didn\'t leave an email'; 
	this.quizScores = [];
	this.currentScore = 0;
}

User.prototype = {
	constructor: User, 
	
	saveScore: function(score) {
		var s = parseInt(score);

		if(isNaN(s)) {
			return false;
		}
		else {
			this.quizScores.push(s);
			return this.quizScores;
		}
	},

	showNameAndScores: function() {
		return this.name + '\'s score is: ' + (this.quizScores.length ? this.quizScores.join(', ') : 'no scores yet'); 
	}, 

	changeEmail: function(newEmail) {
		//TODO: validate email format first
		return this.email  = newEmail;
	}
}

// var bill = new User('bill', 'szhangpitt@gmail.com');
// bill.changeEmail('shaopeng.us@gmail.com');
// bill.saveScore('abc');
// bill.saveScore(45);
// bill.saveScore(90);
// console.log(bill.showNameAndScores());
// console.log(bill.constructor);

function inheritPrototype(childObject, parentObject) {
	var copyOfParent = Object.create(parentObject.prototype);

	copyOfParent.constructor = childObject;

	childObject.prototype = copyOfParent;

}

function Question(question, choices, correctAnswer) {
	this.question = question || 'ERR_NO_QUESTION';
	this.choices = choices || [];
	this.correctAnswer = correctAnswer || -1; 
	this.userAnswer = -1;

	var date = new Date();

	var QUIZ_CREATED_DATE = date.toLocaleDateString();

	this.getQuizDate = function() {
		return QUIZ_CREATED_DATE;
	}

	console.log('Question created on: ' + QUIZ_CREATED_DATE);
}

Question.prototype = {
	constructor: Question, 

	getCorrectAnswer: function() {
		return this.correctAnswer;
	},

	getUserAnswer: function() {
		return this.userAnswer;
	}, 

	displayQuestion: function() {
		console.log('Question: ' + this.question + '\r\n');
		this.choices.forEach(function(c, i, a) {
			console.log((i + 1 + '. ') + c);
		});
	}
}

function MultipleChoiceQuestion(question, choices, correctAnswer) {
	Question.call(this, question, choices, correctAnswer);
}

inheritPrototype(MultipleChoiceQuestion, Question);

function DragAndDropQuestion(question, choices, correctAnswer) {
	Question.call(this, question, choices, correctAnswer);
}

inheritPrototype(DragAndDropQuestion, Question);

DragAndDropQuestion.prototype.displayQuestion = function(){
	console.log('Question (please drag and drop): ' + this.question + '\r\n');
	this.choices.forEach(function(c, i, a) {
		console.log((i + 1 + '. ') + c);
	});
}

//
var allQuestions = [
	new MultipleChoiceQuestion("Who is Prime Minister of England?", ["Obama", "Blair", "Brown", "Cameron"], 3), 
	new MultipleChoiceQuestion("What is the Capital of Brazil?", ["São Paulo", "Rio de Janeiro", "Brasília"], 2),
	new DragAndDropQuestion("Drag the correct City to the world map.", ["Washington, DC", "Rio de Janeiro", "Stockholm"], 0)
];

allQuestions.forEach(function(q, index, array){
	q.displayQuestion();
});




//com.siemens.ct.sye.uid --> 
var MYAPP = {
	namespace: function(nsString) {
		var parts = nsString.split('.'), 
			plen = parts.length,
			namespaceObj = {};

		if(plen === 0) {
			return window;
		}

		else {
			var currentNode = namespaceObj;
			
			// currentNode[parts[0]] = { };

			//if (plen >= 1) {
				for (var i = 0; i < plen; i++) {
					currentNode[parts[i]] = { };
					currentNode = currentNode[parts[i]]
				}
			// }
			
		}

		return namespaceObj;
	}
}

console.log(MYAPP.namespace('com.siemens.ct.sye.uid')); 





