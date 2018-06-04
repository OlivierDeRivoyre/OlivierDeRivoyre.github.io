
function LoadImage(path){
	var img = new Image();
	img.src = path;
	return img;
}
function Sprite(fileName, spriteSize, nbSpriteInWidth, nbSpriteInHeight){
	this.img = LoadImage(fileName);
	this.spriteSize = spriteSize;
	this.nbSpriteInWidth = nbSpriteInWidth;
	this.nbSpriteInHeight = nbSpriteInHeight;
}
Sprite.prototype.getRandomId = function(){
	return Math.floor(Math.random() *  this.nbSpriteInWidth * this.nbSpriteInHeight);
}
Sprite.prototype.draw = function(id, rendering, x, y, zoom){
	if(zoom == undefined)
		zoom = 1;
	var idY = Math.floor(id / this.nbSpriteInWidth);
	var idX = Math.floor(id % this.nbSpriteInWidth);
	
	rendering.save();
	rendering.translate(x * 64, y * 64); 
	rendering.drawImage(this.img, idX * this.spriteSize, idY * this.spriteSize, this.spriteSize, this.spriteSize,
		-32 * zoom, -32 * zoom, 64 * zoom, 64 * zoom);
	rendering.restore();
}