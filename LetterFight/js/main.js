var isDebug = true;

var canvas;
var mouseCoord ={x:0, y:0};
var rendering;
var currentApp;

var spriteCharacters = new Sprite('images/characters.png', 96, 31, 20);
var spriteGrounds = new Sprite('images/grounds.png', 32, 2, 7);
var spriteItems = new Sprite('images/items.png', 32, 5, 2);
var spriteArrows = new Sprite('images/arrows.png', 32, 4, 1);

var wordNames = ["bag", "bed", "bin", "camp", "can", "cat", "deck", 
	"dog", "dot", "drink",  "eight", "five", "four", "fox", "frog", 
	"go", "got", "hat", "hello", "hen", "him", "his", "jump", "kick",
	"leg", "man", "mug", "neck", "nine", "not", "one", "pen",
	"pig", "sad", "seven", "six", "sun", "tap", "ten", "three", "two",
	"wait", "zero"];

var soundLetterArrays = {};
for(var i = 0; i < 26; i++){
	var letter = String.fromCharCode(65 + i);
	var array = new Array();
	for(var v = 1; v <= 3; v++){
		var audio = new Audio("sounds/"+ letter + v + ".ogg");
		array.push(audio);
	}
	soundLetterArrays[letter] = array;
}
for(var i = 0; i < wordNames.length; i++){
	var array = new Array();
	var audio = new Audio("sounds/words/"+ wordNames[i] + ".ogg");
	array.push(audio);
	soundLetterArrays[wordNames[i]] = array;
}
var soundYes = new Audio("sounds/smb_coin.ogg");
var soundNo = new Audio("sounds/smb_kick.ogg");
var soundWin = new Audio("sounds/smb_stage_clear.ogg");
var soundLost = new Audio("sounds/smb_gameover.ogg");


window.onload = function() {
	

	var canvasWidth = window.innerWidth-5;
	var canvasHeight = window.innerHeight-5;
	canvas = document.getElementById('layer');	
	canvas.width  = canvasWidth; 
	canvas.height = canvasHeight; 
	canvas.onclick = mouseDown;
	canvas.onmousemove = mouseMove;
	rendering = this.canvas.getContext('2d');
	
	currentApp = new MainMenu();
	//Init stat.wordOccurances
	for(var i = 0; i < 26; i++){
		var letter = String.fromCharCode(65 + i);
		if(stat.wordOccurances[letter] == undefined){
			stat.wordOccurances[letter] = 0;
		}
	}
	for(var i = 0; i < wordNames.length; i++){
		if(stat.wordOccurances[wordNames[i]] == undefined){
			stat.wordOccurances[wordNames[i]] = 0;
		}
	}
	
	//Main loop:
	setInterval(function() {
		if(currentApp != null){
			if(currentApp._tickNumber_ != undefined){
				currentApp._tickNumber_++;
			} else {
			currentApp._tickNumber_ = 0;
			}
			currentApp.tick(currentApp._tickNumber_);
			rendering.clearRect(0, 0, this.canvas.width, this.canvas.height);
			currentApp.draw(canvas, rendering);
		}

	}, 40);

	
}

function getRelativeCoord(mouseEvent){
    var mouseX, mouseY; 
	mouseX = mouseEvent.clientX - canvas.offsetLeft + document.body.scrollLeft + document.documentElement.scrollLeft;;
	mouseY = mouseEvent.clientY - canvas.offsetTop + document.body.scrollTop + document.documentElement.scrollTop;;
    return {x:mouseX, y:mouseY};
}

function mouseDown(e) 
{ 
    var canvasPoint = getRelativeCoord(e);
	currentApp.click(canvasPoint);
} 
function mouseMove(e) 
{ 
    var canvasPoint = getRelativeCoord(e);
	mouseCoord = canvasPoint;
}