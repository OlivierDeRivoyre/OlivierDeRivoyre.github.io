

function CreaturesBag()
{

}

CreaturesBag.prototype.draw = function(canvas, rendering){
	var zoom = 1;
	if(isInsideCell(mouseCoord,  1, 1)){
		zoom = 3;
	}
	spriteCharacters.draw(stat.currentCharacter, rendering, 1, 1, zoom);
	var width = Math.floor(canvas.width / 64) - 2;
	for(var i = 0; i  < stat.winCreatures.length; i++)
	{
		var id = stat.winCreatures[i];
		var x= 1 + i % width;
		var y = 3 + Math.floor(i/width);
		zoom = 1;
		if(isInsideCell(mouseCoord,  x, y)){
			zoom = 3;
		}
		spriteCharacters.draw(id, rendering, x, y, zoom);
	}
}
CreaturesBag.prototype.click = function(canvasPoint){
	if(isInsideCell(canvasPoint,  1, 1))
	{
		currentApp = new MainMenu();
		soundNo.play();
		return;
	}
	var width = Math.floor(canvas.width / 64) - 2;
	for(var i = 0; i  < stat.winCreatures.length; i++)
	{
		var id = stat.winCreatures[i];
		var x= 1 + i % width;
		var y = 3 + Math.floor(i/width);
		if(isInsideCell(canvasPoint, x, y))
		{			
			stat.currentCharacter = id;
			SaveStat(stat);
			currentApp = new MainMenu();
			soundNo.play();
			return;
		}
	}
}
CreaturesBag.prototype.tick = function(tickNumber){
	
}

