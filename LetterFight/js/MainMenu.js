
var stat = InitStat();

function MainMenu()
{
}

MainMenu.prototype.draw = function(canvas, rendering){
	rendering.font="22px Arial";
	rendering.fillStyle = 'green';
	rendering.fillText("Hello " + stat.playerName, canvas.width /2, canvas.height *1/6);
	spriteCharacters.draw(stat.currentCharacter, rendering, 1, 1, 1);
	rendering.fillStyle = 'green';
	if(this.isOnButtonPlay(mouseCoord)){
		rendering.fillStyle = 'blue';
	}
	rendering.fillText("Play Letter", canvas.width /2, canvas.height *2/6);
	
	rendering.fillStyle = 'green';
	if(this.isOnButtonPlayWord(mouseCoord)){
		rendering.fillStyle = 'blue';
	}
	if(stat.winCreatures.length > 1){
		rendering.fillText("Play Word", canvas.width /2, canvas.height * 3 /6);
	}
	rendering.fillStyle = 'green';
	if(this.isOnButtonCreatures(mouseCoord)){
		rendering.fillStyle = 'blue';
	}
	if(stat.winCreatures.length > 1){
		rendering.fillText("Creatures", canvas.width /2, canvas.height * 4 /6);
	}
	
	rendering.fillStyle = 'green';
	if(this.isOnButtonWorld(mouseCoord)){
		rendering.fillStyle = 'blue';
	}
	if(stat.winCreatures.length > 1){
		rendering.fillText("World", canvas.width /2, canvas.height * 5 /6);
	}
	for(var i = 0; i < 26; i++)
	{
		var letter = String.fromCharCode(65 + i);
		rendering.fillStyle = 'gray';
		rendering.font="8px Arial";
		rendering.fillText(letter, 20 * i, canvas.height - 0);
	}
}
MainMenu.prototype.click = function(canvasPoint){
	if(this.isOnButtonPlay(canvasPoint))
	{
		soundNo.play();
		currentApp = new FightGame(1, ["S","T", "A","P","I", "O", "U", "L", "E", "M", "D", "N", "C", "B", "F", "H", "G", "Y"]);
	}
	if(this.isOnButtonPlayWord(mouseCoord)){
		soundNo.play();
		currentApp = new FightGame(2, wordNames);
	}
	if(this.isOnButtonCreatures(canvasPoint))
	{
		soundNo.play();
		currentApp = new CreaturesBag();
	}
	
	if(this.isOnButtonWorld(canvasPoint))
	{
		soundNo.play();
		currentApp = new World();
	}
	///Test
	if(canvasPoint.y >= canvas.height - 20 && canvasPoint.y < canvas.height)
	{
	  var i = Math.floor(canvasPoint.x / 20);
	  if(i < 26)
	  {
		var letter = String.fromCharCode(65 + i);
		var soundArray = soundLetterArrays[letter];
		var version = Math.floor(Math.random() * soundArray.length);
		var sound = soundArray[version];
		sound.play();
	  }
	}
}

MainMenu.prototype.tick = function(tickNumber){
}
function isInside(canvasPoint, rectX, rectY, width, height){
	if(canvasPoint.x >= rectX && canvasPoint.x < rectX + width){
		if(canvasPoint.y >= rectY && canvasPoint.y < rectY + height){
			return true;
		}
	}
	return false;
}
function isInsideCell(canvasPoint, i, j){
	return isInside(canvasPoint, i * 64 - 32, j * 64 - 32, 64, 64);
}
MainMenu.prototype.isOnButtonPlay = function(canvasPoint){
	return isInside(canvasPoint, canvas.width/2, canvas.height*2/6 - 30, 100, 30);
}
MainMenu.prototype.isOnButtonPlayWord = function(canvasPoint){
	return isInside(canvasPoint, canvas.width/2, canvas.height*3/6 - 30, 100, 30);
}
MainMenu.prototype.isOnButtonCreatures = function(canvasPoint){
	return isInside(canvasPoint, canvas.width/2, canvas.height*4/6 - 30, 100, 30);
}
MainMenu.prototype.isOnButtonWorld = function(canvasPoint){
	return isInside(canvasPoint, canvas.width/2, canvas.height*5/6 - 30, 100, 30);
}