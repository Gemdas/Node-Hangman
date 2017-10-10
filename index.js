var inquirer = require("inquirer");
var word = require("./word.js");
var fs = require("fs");
console.log("please hold while we create our 58109 words long wordlist")
fs.readFile("wordlist.txt", "utf-8",function(error, data) {
	if(error){
		throw error;
	}
	list=data.split(/\r?\n/);
	list.forEach(function(entry, index){
		list[index]=new word(entry);
	})
	console.log("Thank you for your patience, our game can begin now");
	var active= list[Math.floor(Math.random()*list.length)];
	var lives=10;
	console.log()
	game();
	function game(){
		if(active.hasWon()){
			console.log("You Solved it");
			active= list[Math.floor(Math.random()*list.length)];
			lives=10;
		}
		if(lives===0)
		{
			console.log("Oh Better luck Next Time");
			active= list[Math.floor(Math.random()*list.length)];
			lives=10;
		}
		console.log("");
		console.log(active.displayWord());
		console.log("");
		inquirer.prompt([
			{
				type:"input",
				message:"What's you Guess? ",
				name:"guess",
			}
		]).then(function(playerGuess){
			if(/[a-z]/.test(playerGuess.guess)&&playerGuess.guess.length===1){
				console.log(playerGuess.guess.indexOf(/^[a-z]+$/))
				if(active.play(playerGuess.guess)){
					console.log("CORRECT!");
				}
				else{
					lives--;
					console.log("INCORRECT, you have "+lives+" lives left");
				}
			}
			else{
				console.log("please input valid inputs (single lowercase letters)");
			}
			game();
		})
	}
})