function Tilset(tileSetImage){
	this.image = tileSetImage;
	this.imageCellWidth = 2;//this.image.width / 64;
	this.imageCellHeight = 4//;this.image.height / 64;
	this.createRandomSet();
}

Tilset.prototype.createRandomSet = function(){
	var tile10_10 = new Array();
	for(var i = 0; i < 100; i ++){
		tile10_10.push(
			{x:Math.floor(Math.random() * this.imageCellWidth),
			y:Math.floor(Math.random() * this.imageCellHeight)});
	}
	this.tile10_10 = tile10_10;
}

Tilset.prototype.drawBackground = function(screen){
	var worldTopLeft = screen.getWorldTopLeft();
	var worldDownRight = screen.getWorldDownRight();
	var xCellStart = Math.floor(worldTopLeft.x / 32) - 1;
	var yCellStart = Math.floor(worldTopLeft.y / 32) - 1;
	var xCellEnd = Math.floor(worldDownRight.x / 32) + 1;
	var yCellEnd = Math.floor(worldDownRight.y / 32) + 1;
	for(var i = xCellStart; i < xCellEnd; i++){
		for(var j = yCellStart; j < yCellEnd; j++){
			var tileCoord = this.tile10_10[(Math.abs(j) * 41 + Math.abs(i) * (Math.abs(j)+1)) //try to avoid repetition
			% this.tile10_10.length]
			screen.drawTile(this.image, 0,
				{x: i * 32, y: j * 32},
				tileCoord);
		}
	}
}