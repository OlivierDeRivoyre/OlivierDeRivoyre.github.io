

function Screen(canvasLayer){
	this.canvasLayer = canvasLayer;
	this.renderingLayer = new Array();
	for(var i = 0; i < this.canvasLayer.length; i++){
		this.renderingLayer.push(this.canvasLayer[i].getContext('2d'));
	}
	this.worldTopLeft = {x:0, y:0};
	this.cellSize = 64;
	this.menuInitSize();
}
Screen.prototype.clear = function(){
	//http://stackoverflow.com/questions/2142535/how-to-clear-the-canvas-for-redrawing
	for(var i = 0; i < this.canvasLayer.length; i++){
		this.renderingLayer[i].clearRect(0, 0, this.canvasLayer[i].width, this.canvasLayer[i].height); 
	}
}
Screen.prototype.toCanvasCoord = function(worldCoord){
	var relativeCoord = {x:worldCoord.x - this.worldTopLeft.x, y: worldCoord.y - this.worldTopLeft.y};
	var canvasCoord = {x: relativeCoord.x * this.cellSize / 32, y: relativeCoord.y * this.cellSize / 32};
	return canvasCoord;
}

Screen.prototype.toWorldCoord = function(canvasCoord){
	var unzoomedCoord = {x: canvasCoord.x * 32 / this.cellSize, y: canvasCoord.y * 32 / this.cellSize};
	var worldCoord = {x:unzoomedCoord.x + this.worldTopLeft.x, y: unzoomedCoord.y + this.worldTopLeft.y};
	return worldCoord;
}

Screen.prototype.tryCenter = function(worldCoord){
	var nbCellWidth = this.canvasLayer[0].width / this.cellSize;
	var nbCellheigth = this.canvasLayer[0].height / this.cellSize;
	
	this.worldTopLeft = {x: worldCoord.x - nbCellWidth * 32/2, y: worldCoord.y - nbCellheigth * 32/2} ;
}

Screen.prototype.getWorldTopLeft = function(){
	return this.toWorldCoord({x:0, y:0});
}

Screen.prototype.getWorldDownRight = function(){
	return this.toWorldCoord({x:this.canvasLayer[0].width, y:this.canvasLayer[0].height});
}

Screen.prototype.drawTile = function(img, zIndex, worldCoord, tileCellCoord)
{
	var rendering = this.renderingLayer[zIndex];
	var canvasCoord = this.toCanvasCoord(worldCoord);
	rendering.drawImage(img, tileCellCoord.x*64, tileCellCoord.y*64, 64, 64, Math.floor(canvasCoord.x), Math.floor(canvasCoord.y), this.cellSize, this.cellSize);	
}
Screen.prototype.drawCell = function(img, zIndex, worldCoord, rotation, radarColor)
{
	var canvasCoord = this.toCanvasCoord(worldCoord);	
	
	var rendering = this.renderingLayer[zIndex];
	rendering.save();
	rendering.translate(canvasCoord.x, canvasCoord.y); 
	rendering.rotate(rotation + Math.PI / 2);
	rendering.drawImage(img, 0, 0, 64, 64, -this.cellSize/2, -this.cellSize/2, this.cellSize, this.cellSize);
	rendering.restore();
	
	if(radarColor != null){
		var xplot = this.getRadarCoordX(worldCoord);
		if(xplot != null){
			this.fillRect(zIndex, xplot, 6, 6, radarColor);
		}
		var yPlot = this.getRadarCoordY(worldCoord);
		if(yPlot != null){
			this.fillRect(zIndex, yPlot, 6, 6, radarColor);
		}
	}
}

Screen.prototype.getRadarCoordX = function(worldCoord)
{
	var topLeft = this.getWorldTopLeft();
	var downRight = this.getWorldDownRight();
	var center = {x: (topLeft.x + downRight.x) / 2, y: (topLeft.y + downRight.y) / 2};
	var xAxis;
	var centerCorectif = 1;
	if(worldCoord.x < topLeft.x)
	{
		xAxis = topLeft.x;
	} 
	else if(worldCoord.x > downRight.x)
	{
		xAxis = downRight.x;
		centerCorectif = -1;
	} else	{
		return null;
	}
	//  o
	//  |     |-------------|
	//  |_____|      .      |
	//        |-------------|
	//  w   xAxis  Center

	var radarYFromCenter = (worldCoord.y - center.y) * (topLeft.x - center.x) / (worldCoord.x - center.x);
	var radarYAbs = center.y + centerCorectif * radarYFromCenter;
	return {x: xAxis - 3, y:radarYAbs};
}

Screen.prototype.getRadarCoordY = function(worldCoord)
{
	var topLeft = this.getWorldTopLeft();
	var downRight = this.getWorldDownRight();
	var center = {x: (topLeft.x + downRight.x) / 2, y: (topLeft.y + downRight.y) / 2};
	var yAxis;
	var centerCorectif = 1;
	if(worldCoord.y < topLeft.y)
	{
		yAxis = topLeft.y;
	} 
	else if(worldCoord.y > downRight.y)
	{
		yAxis = downRight.y;
		centerCorectif = -1;
	} else	{
		return null;
	}
	//  o
	//  |     |-------------|
	//  |_____|      .      |
	//        |-------------|
	//  w   xAxis  Center

	var radarXFromCenter = (worldCoord.x - center.x) * (topLeft.y - center.y) / (worldCoord.y - center.y);
	var radarXAbs = center.x + centerCorectif * radarXFromCenter;
	return {x: radarXAbs, y:yAxis - 3};
}

Screen.prototype.fillText = function(text, zIndex, worldCoord, color, fontSize)
{
	var canvasCoord = this.toCanvasCoord(worldCoord);	
	var rendering = this.renderingLayer[zIndex];
	
	rendering.fillStyle = color;
	switch(fontSize){
		case 0 : rendering.font="16px Arial"; break;
		case 1 : rendering.font="20px Arial"; break;
		case 2 : rendering.font="24px Arial"; break;
	}
	rendering.fillText(text,canvasCoord.x, canvasCoord.y);
}
Screen.prototype.fillRect = function(zIndex, worldCoord, width, height, color)
{
	var rendering = this.renderingLayer[zIndex];
	var canvasCoord = this.toCanvasCoord(worldCoord);
	var zoomedWidth = width * this.cellSize / 32;
	var zoomedHeight = height * this.cellSize / 32;
	
	rendering.fillStyle = color;	
	rendering.fillRect(canvasCoord.x, canvasCoord.y, zoomedWidth, zoomedHeight);
}

Screen.prototype.drawZoomedImage = function(img, zIndex, worldCoord, zoom, alpha)
{
	var rendering = this.renderingLayer[zIndex];
	
	var canvasCoord = this.toCanvasCoord(worldCoord);
	rendering.save();
	rendering.translate(canvasCoord.x, canvasCoord.y); 
	//to test: 
	rendering.globalAlpha = alpha;
	rendering.drawImage(img, 0, 0, 64, 64,
		-this.cellSize * zoom/2 , -this.cellSize * zoom/2 , this.cellSize * zoom, this.cellSize * zoom);
	rendering.restore();
}



/******************************  Menu 600x600  *******************************************************/

Screen.prototype.menuInitSize = function()
{
	var screenWidth = this.canvasLayer[0].width;
	var screenHeight = this.canvasLayer[0].height;
	this.menuZoom = 1;
	if(screenWidth > 2 * this.menuZoom * 600){
		this.menuZoom = 2;//deep dpi screen
	}
	if(screenWidth < this.menuZoom * 600){
		this.menuZoom = screenWidth / 600;
	}
	if(screenHeight < this.menuZoom * 600){
		this.menuZoom = screenHeight / 600;
	}
	this.menuTopLeft = {x: (screenWidth - this.menuZoom * 600) / 2,
						y: (screenHeight - this.menuZoom * 600) / 2};
}

Screen.prototype.menuCoordToScreen = function(menuCoord)
{
	return {x: this.menuTopLeft.x + menuCoord.x * this.menuZoom,
			y: this.menuTopLeft.y + menuCoord.y * this.menuZoom};
}

Screen.prototype.screenCoordToMenu = function(screenCoord)
{
	var menuCoord = {x: (screenCoord.x - this.menuTopLeft.x) / this.menuZoom,
			y: (screenCoord.y - this.menuTopLeft.y) / this.menuZoom};
	if(menuCoord.x >= 0 && menuCoord.x < 600 &&
		menuCoord.y >= 0 && menuCoord.y < 600){
			return menuCoord;
	}
	return {x: -1, y : -1};//out of bound
}

Screen.prototype.menuDrawImage = function(img, menuCoord, width, height)
{
	var rendering = this.renderingLayer[this.renderingLayer.length - 1];
	var screenCoord = this.menuCoordToScreen(menuCoord);
	
	rendering.drawImage(img, 0, 0, 64, 64,
		screenCoord.x , screenCoord.y , width * this.menuZoom, height * this.menuZoom);
}
Screen.prototype.menuFillRect = function(menuCoord, width, height, color)
{
	var rendering = this.renderingLayer[this.renderingLayer.length - 1];
	var screenCoord = this.menuCoordToScreen(menuCoord);
	
	rendering.fillStyle = color;	
	rendering.fillRect(screenCoord.x, screenCoord.y, width* this.menuZoom, height* this.menuZoom);
} 
Screen.prototype.menuStrokeRect = function(menuCoord, width, height, color)
{
	var rendering = this.renderingLayer[this.renderingLayer.length - 1];
	var screenCoord = this.menuCoordToScreen(menuCoord);
	
	rendering.strokeStyle  = color;	
	rendering.strokeRect(screenCoord.x, screenCoord.y, width* this.menuZoom, height* this.menuZoom);
} 

