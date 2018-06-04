
function World()
{
	this.cameraX = 0;
	this.cameraY = 0;
	this.selectedButton = null;
	this.toolBar = new Array();
	this.resetToolbar();
	this.creatures = new Array();
	this.cellLockedByCreatures = {};
	for(var i = 0; i  < stat.winCreatures.length; i++)
	{
		var x=  i % 10;
		var y = Math.floor(i/10);
		if(stat.worldGround[x + "x" + y] != undefined){
			this.creatures.push({"id":stat.winCreatures[i], "cellX":x, "cellY":y, "state":"idle", "previousX":x, "previousY":y, "displayX":x, "displayY":y, "tick":Math.random()*200});
			this.cellLockedByCreatures[x +"x" + y] = 1;
		}
	}
}

World.prototype.draw = function(canvas, rendering){
	var zoom = 1;
	if(isInsideCell(mouseCoord,  1, 1)){
		zoom = 3;
	}
	spriteCharacters.draw(stat.currentCharacter, rendering, 1, 1, zoom);
	var width = Math.floor(canvas.width / 64) - 1;
	var height = Math.floor(canvas.height / 64) - 3;
	
	for(var i = 0; i < this.toolBar.length && i < width - 2; i++){
		var idTile = this.toolBar[i].id;
		if(this.toolBar[i].type == "ground"){
			spriteGrounds.draw(idTile, rendering, 2 + i, 1, 1);
		} else {
			spriteItems.draw(idTile, rendering, 2 + i, 1, 1);
		}
		if(this.toolBar[i]===this.selectedButton){
			rendering.fillStyle = 'Green';
			rendering.font="20px Arial";
			rendering.fillText("X", 64 * (2+ i)+8, 64+16);
		}
	}
	
	for(var i = 0; i  < width; i++)
	{
		for(var j = 0; j  < height; j++)
		{
			var groundTileX = this.cameraX + i;
			var groundTileY = this.cameraY + j;
			if(stat.worldGround[groundTileX + "x" + groundTileY] != undefined){
				var idTile = stat.worldGround[groundTileX + "x" + groundTileY];
				spriteGrounds.draw(idTile, rendering, i + 1, j + 3, 1);
			}
			if(stat.worldItems[groundTileX + "x" + groundTileY] != undefined){
				var idTile = stat.worldItems[groundTileX + "x" + groundTileY];
				spriteItems.draw(idTile, rendering, i + 1, j + 3, 1);
			}
		}
	}
	for(var i = 0; i  < this.creatures.length; i++)
	{
		var c = this.creatures[i];
		var screenX = c.displayX + 1 - this.cameraX;
		var screenY = c.displayY + 3 - this.cameraY;
		if(screenX >= 1 && screenX <= 0+ width){
			if(screenY >= 3 && screenY <= 2 + height){
				spriteCharacters.draw(c.id, rendering, screenX, screenY);
			}
		}
	}
	
	spriteArrows.draw(0,rendering, 0, Math.floor(height/2) + 3);
	spriteArrows.draw(1,rendering, Math.floor(width/2)+1, 2);
	spriteArrows.draw(2,rendering, width +1, Math.floor(height/2) + 3);
	spriteArrows.draw(3,rendering, Math.floor(width/2)+1, height + 3);
	
}

World.prototype.click = function(canvasPoint){
	if(isInsideCell(canvasPoint,  1, 1))
	{
		currentApp = new MainMenu();
		soundNo.play();
		return;
	}
	var width = Math.floor(canvas.width / 64) - 1;
	var height = Math.floor(canvas.height / 64) - 3;
	
	for(var i = 0; i < this.toolBar.length && i < width - 2; i++){
		if(isInsideCell(canvasPoint, 2+ i, 1))
		{
			this.selectedButton = this.toolBar[i];
			soundNo.play();
			return;
		}
	}
	
	for(var i = 0; i  < width; i++)
	{
		for(var j = 0; j  < height; j++)
		{
			if(isInsideCell(canvasPoint, i + 1, j + 3))
			{
				if(!this.hasSelection()){
					soundYes.play();
					return;
				}
				var groundTileX = this.cameraX + i;
				var groundTileY = this.cameraY + j;
				if(!this.isAllowedToSetTileOn(groundTileX, groundTileY)){
					soundYes.play();
					return;
				}
				if(this.selectedButton.type == "ground"){
					stat.worldGround[groundTileX + "x" + groundTileY] = this.selectedButton.id;
					stat.groundTiles[this.selectedButton.id]--;
					if(stat.groundTiles[this.selectedButton.id] <= 0)
					{
						delete stat.groundTiles[this.selectedButton.id];
						this.resetToolbar();
					}
				} else {
					stat.worldItems[groundTileX + "x" + groundTileY] = this.selectedButton.id;
					stat.itemsTiles[this.selectedButton.id]--;
					if(stat.itemsTiles[this.selectedButton.id] <= 0)
					{
						delete stat.itemsTiles[this.selectedButton.id];
						this.resetToolbar();
					}
				}
				soundNo.play();
				SaveStat(stat);
				return;
			}
		}
	}
	if(isInsideCell(canvasPoint, 0, Math.floor(height/2) + 3)){
		soundNo.play();
		this.cameraX--;
	}
	if(isInsideCell(canvasPoint, Math.floor(width/2)+1, 2)){
		soundNo.play();
		this.cameraY--;
	}
	if(isInsideCell(canvasPoint,width +1, Math.floor(height/2) + 3)){
		soundNo.play();
		this.cameraX++;
	}
	if(isInsideCell(canvasPoint, Math.floor(width/2)+1, height + 3)){
		soundNo.play();
		this.cameraY++;
	}
}
World.prototype.tick = function(tickNumber){
	for(var i = 0; i  < this.creatures.length; i++)
	{
		var creature = this.creatures[i];
		this.tickCreature(creature, tickNumber);
	}
}
World.prototype.hasSelection = function(){
	if(this.selectedButton == null){
		return false;
	}
	if(this.selectedButton.type == "ground"){
		if(stat.groundTiles[this.selectedButton.id] != undefined && stat.groundTiles[this.selectedButton.id] > 0){
			return true;
		}
	} else {
		if(stat.itemsTiles[this.selectedButton.id] != undefined && stat.itemsTiles[this.selectedButton.id] > 0){
			return true;
		}
	}
	return false;
}
World.prototype.isAllowedToSetTileOn = function(groundTileX, groundTileY){
	if(this.selectedButton.type == "item"){
		return stat.worldGround[groundTileX + "x" + groundTileY] != undefined;
	}
	if(stat.worldGround[groundTileX + "x" + groundTileY] != undefined){
		return true;
	}
	///Assert a tile is near
	if(stat.worldGround[(groundTileX + 1)+ "x" + groundTileY] != undefined){
		return true;
	}
	if(stat.worldGround[groundTileX + "x" + (groundTileY-1)] != undefined){
		return true;
	}
	if(stat.worldGround[(groundTileX - 1)+ "x" + groundTileY] != undefined){
		return true;
	}
	if(stat.worldGround[groundTileX + "x" + (groundTileY+1)] != undefined){
		return true;
	}
	return false
}

World.prototype.resetToolbar = function(){
	this.toolBar = new Array();
	for(var i = 0; i < 50; i++){
		if(stat.groundTiles[i] != undefined && stat.groundTiles[i] != 0){
			this.toolBar.push({"type":"ground", "id":i});
		}
	}
	for(var i = 0; i < 50; i++){
		if(stat.itemsTiles[i] != undefined && stat.itemsTiles[i] != 0){
			this.toolBar.push({"type":"item", "id":i});
		}
	}
}
World.prototype.tickCreature = function(creature, tickNumber){
	
	if(creature.state == "idle"){
		if(tickNumber > creature.tick){
			this.chooseActionForCreature(creature, tickNumber);
		}
		return;
	}
	if(tickNumber > creature.tick){
	
		delete this.cellLockedByCreatures[creature.previousX +"x" + creature.previousY];
		this.chooseActionForCreature(creature, tickNumber);
		return;
	}
	var progress = 1 - (creature.tick - tickNumber) / 80;//from 0 to 1
	creature.displayX = creature.previousX + progress * (creature.cellX - creature.previousX);
	creature.displayY = creature.previousY + progress * (creature.cellY - creature.previousY);
}

World.prototype.chooseActionForCreature = function(creature, tickNumber){
	var possibles = new Array();
	var x = creature.cellX;
	var y = creature.cellY;
	
	possibles.push({state:"idle", proba:1});
	this.addPossibleMoveCell(possibles, creature, "right", x+1, y);
	this.addPossibleMoveCell(possibles, creature, "up", x, y-1);
	this.addPossibleMoveCell(possibles, creature, "left", x-1, y);
	this.addPossibleMoveCell(possibles, creature, "down", x, y+1);
	
	var action = this.randomChoose(possibles);
	creature.state = action;
	if(action == "idle"){
		creature.tick = tickNumber + Math.random() * 200;
		return;
	}
	creature.previousX = creature.cellX;
	creature.previousY = creature.cellY;
	creature.tick = tickNumber + 80;
	if(action == "right"){
		creature.cellX++;
	}
	if(action == "up"){
		creature.cellY--;
	}
	if(action == "left"){
		creature.cellX--;
	}
	if(action == "down"){
		creature.cellY++;
	}
	this.cellLockedByCreatures[creature.cellX +"x" + creature.cellY] = 1;
}
World.prototype.addPossibleMoveCell = function(possibles, creature, action, x, y){
	if(this.cellLockedByCreatures[x+"x"+y] != undefined){
		return;
	}
	var previousCellCoef = (creature.previousX == x && creature.previousY == y)? 0.3 : 1;
	if(stat.worldGround[x+"x"+y] != undefined){
		if(stat.worldItems[x+"x"+y] != undefined){
			possibles.push({state:action, proba:1 * previousCellCoef});
		} else {
			possibles.push({state:action, proba:8 * previousCellCoef});
		}
	}
}

World.prototype.randomChoose = function(possibles){
	var total = 0;
	for(var i = 0; i < possibles.length; i++){
		total += possibles[i].proba;
	}
	var rand = Math.random() * total;
	for(var i = 0; i < possibles.length; i++){
		rand -= possibles[i].proba;
		if(rand <= 0){
			return possibles[i].state;
		}
	}
	return "idle";
}
