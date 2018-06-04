

function FightGame(level, wordToLearns)
{	
	this.level = level;
	this.wordToLearns = wordToLearns; 
	this.badGuyId = spriteCharacters.getRandomId();
	this.letters = this.getLetters(level == 1 ? stat.nbWin : stat.nbWin2);
	this.playerX = 2;
	this.badGuyX = 9;
	this.toolBar = this.letters;
	this.currentLetter = null;
	this.letterChangedDate = Date.now();
	this.lastError = Date.now() - 10000;
	this.currentLetterAudio = null;
}

FightGame.prototype.draw = function(canvas, rendering){
	rendering.font="22px Arial";
	for(var i = 0; i < this.toolBar.length; i++){
		if(!this.areButtonsOk()){
			rendering.fillStyle = 'gray';
		}else if(this.isOverToolbarLetter(mouseCoord, i)){
			rendering.fillStyle = 'blue';
		} else{
			rendering.fillStyle = 'green';
		}
		rendering.fillText(this.toolBar[i], 64 + i * 64, 64);
	}
	var zoom = 1;
	if(isInsideCell(mouseCoord,  this.playerX, 3)){
		zoom = 3;
	}
	spriteCharacters.draw(stat.currentCharacter, rendering, this.playerX, 3, zoom);
	zoom = 1;
	if(isInsideCell(mouseCoord,  this.badGuyX, 3)){
		zoom = 3;
	}
	spriteCharacters.draw(this.badGuyId, rendering, this.badGuyX, 3, zoom);
}

FightGame.prototype.click = function(canvasPoint){
	var clickedLetter = this.getClickedLetter(canvasPoint);
	if(clickedLetter != ""){
		if(clickedLetter ==this.currentLetter){
			this.badGuyX--;
			if(this.currentLetterAudio != null){
				this.currentLetterAudio.pause();
			}
			if(this.badGuyX <= this.playerX){
				soundWin.play();
				this.win();
			} else{
				soundYes.play();
				
				this.changeLetter();
				this.playSound(this.currentLetter);
			}
		} else {
			this.badGuyX++;
			if(this.badGuyX > this.playerX + 12){
				this.lose();
				soundLost.play();
			} else{
				soundNo.play();
				this.lastError = Date.now();
				this.playSound(this.currentLetter);
			}
		}
	}
	else if(isInsideCell(canvasPoint,  this.badGuyX, 3))
	{
		this.playSound(this.currentLetter);
	}
}
FightGame.prototype.tick = function(tickNumber){
	if(this.currentLetter == null){
		this.changeLetter();
		this.playSound(this.currentLetter);
	}
}

FightGame.prototype.getWordWithMinOccurance = function()
{
	var min = 99999999;
	var minWord = "";
	for(var i = 0; i < this.wordToLearns.length; i++){
		var word = this.wordToLearns[i];
		if(stat.wordOccurances[word] < min){
			min = stat.wordOccurances[word];
			minWord = word;
		}
	}
	return minWord;
}

FightGame.prototype.getLetters = function(lvlNumber)
{
	var totalPoint = 7;
	var selected = [];
	while(totalPoint > 0){
		var word = "" + this.wordToLearns[Math.floor(Math.random() * this.wordToLearns.length)];
		if(selected.length == 0){
			word = this.getWordWithMinOccurance();//Force to learn new word
		}		
		if(selected.indexOf(word) == -1){
			selected.push(word);
			var wordPoint = 1;
			if(stat.wordOccurances[word] < 3){
				wordPoint = 3;
			} else if(stat.wordOccurances[word] < 10){
				wordPoint = 2;
			} else if(stat.wordOccurances[word] < 20){
				wordPoint = 1.5;
			}
			totalPoint -= wordPoint;
			stat.wordOccurances[word]++;
		}
	}
	return selected;
}

FightGame.prototype.changeLetter = function(){
	var oldLetter = this.currentLetter ;
	while(this.currentLetter == oldLetter){
		this.currentLetter = this.letters[Math.floor(Math.random() * this.letters.length)];
	}
	
	this.letterSoundedCount = 0;
	this.letterChangedDate = Date.now();
}

FightGame.prototype.getClickedLetter = function (canvasPoint)
{
	if(!this.areButtonsOk()){
		return "";
	}
	for(var i = 0; i < this.toolBar.length; i++){
		if(this.isOverToolbarLetter(mouseCoord, i)){
			return this.toolBar[i];
		}
	}
	return "";
}

FightGame.prototype.win = function(){
	if(this.level == 1){
		stat.nbWin++;
	}
	if(this.level == 2){		
		stat.nbWin2++;
	}
	if(stat.winCreatures.indexOf(this.badGuyId) == -1){
		stat.winCreatures.push(this.badGuyId);
	}
	for(var i = 0; i < this.level * 2; i++){
	var groundId = spriteGrounds.getRandomId();
		if(stat.groundTiles[groundId] != undefined){
			stat.groundTiles[groundId] += 5;
		} else{
			stat.groundTiles[groundId] = 5;
		}
	}
	var itemId = spriteItems.getRandomId();
	if(stat.itemsTiles[itemId] != undefined){
		stat.itemsTiles[itemId] += 2;
	} else{
		stat.itemsTiles[itemId] = 2;
	}
	SaveStat(stat);
	currentApp = new MainMenu();
}
FightGame.prototype.lose = function(){
	currentApp = new MainMenu();
}


FightGame.prototype.playSound = function(word){
	var soundArray = soundLetterArrays[word];
	var version = Math.floor(Math.random() * soundArray.length);
	var sound = soundArray[version];
	this.currentLetterAudio = sound;
	sound.play();
}

FightGame.prototype.isOverToolbarLetter = function(canvasPoint, i){
	return isInside(canvasPoint, 64 + i * 64 - 20, 0, 64, 64);
}
FightGame.prototype.areButtonsOk = function(canvasPoint, i){
	if(Date.now() - this.letterChangedDate < 1000)
	{
		return false;
	}
	if(Date.now() - this.lastError < 3000)
	{
		return false;
	}
	return true;
}