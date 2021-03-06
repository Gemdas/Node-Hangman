var Letter=require("./letter.js");
Word = function (word) {
	this.board=word.split("");
	
	this.board.forEach(function(alpha, index, board) {
		board[index]=new Letter(alpha);
	});
	this.play =function(guess) {
		var isCorrect = false;
		for (var i = 0; i < this.board.length; i++) {
			if(!this.board[i].isSolved&&this.board[i].guess(guess))
				isCorrect=true;
		}
		return isCorrect;
	}
	this.displayWord= function(){
		var output='';
		this.board.forEach(function(letter){
			output+=letter.display();
		})
		return output;
	}
	this.hasWon=function(){
		for (var i = 0; i < this.board.length; i++) {
			if(!this.board[i].isSolved){
				return false;
			}
		}
		return true;
	}
	this.reset=function(){
		this.board.forEach(function(letter){
			letter.isSolved=false;
		})
	}
}
module.exports = Word;