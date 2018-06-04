 var img_gift = LoadImage('sprites/gift.png');


function AnimDamage(creature, damageValue, isCriticalStrike, damageType)
{
	this.isActive = true;
	this.tickNumber = 0;
	var angus = Math.random() * Math.PI / 2 + Math.PI / 2;
	this.position = {x: creature.position.x + 16 * Math.cos(angus),
					y: creature.position.y + 16 * Math.sin(angus)};
	this.damage = damageValue;
	this.isCriticalStrike = isCriticalStrike;
	this.color = 'yellow';
	if(isCriticalStrike){
		this.color = 'red';
	}
	if(damageType == DAMAGETYPE.POISON){
		this.color = 'green';
	}
	
}
AnimDamage.prototype.tick = function(world){
	this.tickNumber++;
	if(this.tickNumber > 15){
		this.isActive = false;
	}
	this.position.y -= 4;
}
AnimDamage.prototype.draw = function(screen){	
	var fontSize = 0;
	if(this.isCriticalStrike){
	 fontSize = 1;
	}
	screen.fillText(this.damage, 3, this.position, this.color, fontSize);
}

function AOE(world, sourceCreature, yieldDamage, coord, range, img){
	this.isActive = true;
	this.tickNumber = 0;
	this.world = world;
	this.sourceCreature = sourceCreature;
	this.yieldDamage = yieldDamage;
	this.range = range;
	this.coord = coord;
	this.img = img;
	var touchedCreatures = world.getCreaturesAt(coord, range, this.sourceCreature.team);
	for(var i = 0; i < touchedCreatures.length; i++){
		touchedCreatures[i].takeDamage(this.world, this.sourceCreature, this.yieldDamage, DAMAGETYPE.BASIC);
	}
}
AOE.prototype.tick = function(world){
	this.tickNumber++;	
	if(this.tickNumber > 10){
		this.range -= 3;
	}
	if(this.range <= 0){
		this.isActive = false;
	}
}
AOE.prototype.draw = function(screen){	
	screen.drawZoomedImage(this.img, 3, this.coord, this.range / 16, 0.7);
}

function RotateImage(overCreature, img, nbSeconds, rotSpeed, zIndex){
	this.isActive = true;
	this.tickNumber = 0;
	this.overCreature = overCreature;
	this.img = img;
	this.tickLimit = nbSeconds * 25;
	this.rotSpeed = rotSpeed;
	this.zIndex = zIndex;
}
RotateImage.prototype.tick = function(world){
	this.tickNumber++;	
	if(this.tickNumber > this.tickLimit){
		this.isActive = false;
	}
	
}
RotateImage.prototype.draw = function(screen){	
	var rotation = this.tickNumber * this.rotSpeed;
	screen.drawCell(this.img, this.zIndex, this.overCreature.position, rotation, null)
}

function DroppedLoot(coord, lootedObject){
	this.isActive = true;
	this.coord = coord;
	this.img = img_gift;
	this.tickNumber = 0;
	this.lootedObject = lootedObject;
}
DroppedLoot.prototype.tick = function(world){
	this.tickNumber++;	
	if(this.tickNumber > 15 && world.player.getPolarCoord(this.coord).distance < 32){
		this.isActive = false;
	}
}
DroppedLoot.prototype.draw = function(screen){	
	screen.drawCell(this.img, 1, this.coord, 0, null)
}

function NiceCreature(creature, img){
	this.creature = creature;
	this.img = img;
	this.tickNumber = -1;
	this.isActive = true;
}
NiceCreature.prototype.tick = function(world){
	if(this.tickNumber == -1){//start anim
		this.coord = this.creature.position;
		this.angus = this.creature.orientation;
	}	
	this.tickNumber++;
	if(this.tickNumber == 0){
		this.angus = Math.random() * 2 * Math.PI;
	}
	else if(this.tickNumber > 0){
		var speed = 3;
		this.coord = {x: this.coord.x + speed * Math.cos(this.angus),
				y: this.coord.y + speed * Math.sin(this.angus)};
	}
	if(this.tickNumber > 300){
		this.isActive = false;
	}
}
NiceCreature.prototype.draw = function(screen){	
	screen.drawCell(this.img, 2, this.coord, this.angus, null)
}







