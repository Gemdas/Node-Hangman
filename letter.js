Letter=function (letter) {
	this.letter=letter;
	this.isSolved=false;
	this.guess= function(guess){
		if(this.letter===guess){
			this.isSolved=true;
			return true;
		}
		return false;
	}
	this.display=function(){
		if(this.isSolved){
			return this.letter+' ';
		}
		return "_ ";
	}
}
module.exports = Letter;