console.log("please hold while we create our 58109 words long wordlist");
var inquirer = require("inquirer");
var Word = require("./word.js");
var fs = require("fs");
var opn = require("opn");
fs.readFile("wordlist.txt", "utf-8",function(error, data) {
	if(error){
		throw error;
	}
	list=data.split(/\r?\n/);
	list.forEach(function(entry, index){
		list[index]=new Word(entry);
	})
	console.log("Thank you for your patience, our game can begin now");
	var active= list[Math.floor(Math.random()*list.length)];
	var lives=10;
	var usedLetters= [];
	console.log()
	game();
	function newGame(){
		active= list[Math.floor(Math.random()*list.length)];
		active.reset();
		lives=10;
		usedLetters= [];
	}
	function game(){
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
			if(/[a-z]/.test(playerGuess.guess)&&playerGuess.guess.length===1&&usedLetters.indexOf(playerGuess.guess)===-1){
				usedLetters.push(playerGuess.guess);
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
			if(active.hasWon()){
				console.log(active.displayWord());
				console.log("You Solved it");
				inquirer.prompt([
				{
					type:"list",
					message:"Which activity do you want me to do",
					choices:["Play Again", "Exit", "That's not a word"],
					name:"response",
				}
				]).then(function(response){
					switch(response.response)
					{
						case "Play Again":{
							newGame();
							game();
							break;
						}
						case "Exit":{
							return;
						}
						case "That's not a word":{
							opn("https://www.google.com/search?q="+active.displayWord().replace(/ /g,""),"_blank");
							inquirer.prompt([
							{
								type:"list",
								message:"Which activity do you want me to do",
								choices:["Play Again", "Exit"],
								name:"response",
							}
							]).then(function(response){
								switch(response.response)
								{
									case "Play Again":{
										newGame();
										game();
										break;
									}
									case "Exit":{
										return;
									}
								}
								})
							}
						}
					})
			}
			else if(lives===0){
				console.log("Oh Better luck Next Time");
				newGame();
				inquirer.prompt([
				{
					type:"list",
					message:"Which activity do you want me to do",
					choices:["Play Again", "Exit"],
					name:"response",
				}
				]).then(function(response){
					switch(response.response)
					{
						case "Play Again":{
							newGame();
							game();
							break;
						}
						case "Exit":{
							return;
						}
					}
				})
			}
			else{
				game();
			}
		})
	}
})