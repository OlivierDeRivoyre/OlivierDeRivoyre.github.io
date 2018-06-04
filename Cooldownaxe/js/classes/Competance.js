var img_noneIcon = LoadImage('sprites/none.png');
var img_pickIcon = LoadImage('sprites/pickicon.png');
var img_arrowIcon = LoadImage('sprites/arrowicon.png');
var img_multiarrowIcon = LoadImage('sprites/multiarrowicon.png');
var img_fireballIcon = LoadImage('sprites/fireballicon.png');
var img_fireball = LoadImage('sprites/fireball.png');
var img_iceballIcon = LoadImage('sprites/iceballicon.png');
var img_iceball = LoadImage( 'sprites/iceball.png');
var img_zina = LoadImage('sprites/zina.png');
var img_zinaIcon = LoadImage('sprites/zinaicon.png');
var img_tower = LoadImage('sprites/tower.png');
var img_towerIcon = LoadImage('sprites/towericon.png');
var img_icetower = LoadImage('sprites/icetower.png');
var img_icetowerIcon = LoadImage('sprites/icetowericon.png');
var img_heal = LoadImage('sprites/heal.png');
var img_healIcon = LoadImage('sprites/healicon.png');

var COMPETANCECTORS = {
	PICK : function() { return new Pick();},
	ARROW : function() { return new Arrow();},
	MULTIARROW : function() { return new MultiArrow();},
	FIREBALL : function() { return new Fireball();},
	ICEBALL : function() { return new Iceball();},
	PETZINA : function() { return new PetZina();},
	ICETOWER : function() { return new IceTower();},
	HEAL : function() { return new Heal();},
};
var COMPETANCEMANAGERS = {
	NONE : function() { return new CompetanceManager(null, img_noneIcon, 
		0, 10000, 0, 0, false, false, []);},
	PICK : function() { return new CompetanceManager(COMPETANCECTORS.PICK, img_pickIcon, 
		1.5, 0, 100, 50, false, false, []);},
	ARROW : function() { return new CompetanceManager(COMPETANCECTORS.ARROW, img_arrowIcon, 
		7, 0, 25, 300, false, false, [
			{code:"POISON", icon:icon_poisonBuff}
		]);},
	MULTIARROW : function() { return new CompetanceManager(COMPETANCECTORS.MULTIARROW, img_multiarrowIcon, 
		10, 15, 100, 180, false, false, []);},
	FIREBALL : function() { return new CompetanceManager(COMPETANCECTORS.FIREBALL, img_fireballIcon, 
		4, 45, 100, 80, false, false, []);},
	ICEBALL : function() { return new CompetanceManager(COMPETANCECTORS.ICEBALL, img_iceballIcon, 
		5, 10, 90, 150, false, false, []);},
	PETZINA : function() { return new CompetanceManager(COMPETANCECTORS.PETZINA, img_zinaIcon, 
		5, 0, 50, -1, false, false, []);},
	ICETOWER : function() { return new CompetanceManager(COMPETANCECTORS.ICETOWER, img_icetowerIcon, 
		5, 0, 50, -1, false, false, []);},
	HEAL : function() { return new CompetanceManager(COMPETANCECTORS.HEAL, img_healIcon, 
		5, 0, 100, 70, true, true, []);},
};



function CompetanceManager(
			constructorDelegate, //The ctorfunction that create the spell instance
			icon, //image in the tooolbar
			cooldown, //how many seconds
			rageCost, //cost in rage to cast
			yieldComp, //power of the spell
			range, // one cell = 32
			isForAlly,// dps=false or heal=true
			needTarget,//can cast with no target?
			subCompetances){
	this.constructorDelegate = constructorDelegate;
	this.range = range;
	this.cooldown = Math.round(cooldown * 20);
	this.rageCost = rageCost;
	this.yieldComp = yieldComp;
	this.lastUse = 0;
	this.icon = icon;
	this.isForAlly = isForAlly;
	this.needTarget = needTarget;
	this.subCompetances = subCompetances;
	var noneSubComp = {code:"", icon:img_noneIcon};
	this.subCompetances.unshift(noneSubComp);
	this.selectedSubCompetance = "";
	this.selectedSubCompetanceYieldComp = 100;
}


//return the min of all cooldown that can block this competance
CompetanceManager.prototype.cooldownPercent = function(world, creature){
	if(creature.tickStat.isStun){
		return 1;
	}
	if(this.competanceCode == "NONE"){
		return 0;
	}
	var compCooldown = 0;
	if(this.cooldown > 0 && this.lastUse < this.cooldown){
		compCooldown = (this.cooldown - this.lastUse) / this.cooldown;
	}	
	//universal Cooldown
	var universalCooldownTicks = 20;//1 sec
	var universalCooldown = 0;
	if(creature.lastCastTick < universalCooldownTicks){
		universalCooldown = (universalCooldownTicks - creature.lastCastTick) / universalCooldownTicks;
	}
	return Math.max(compCooldown, universalCooldown);
}

CompetanceManager.prototype.isRageOk = function(world, creature){
	if(this.competanceCode == "NONE"){
		return true;
	}
	if(this.rageCost > 0 && creature.rage < this.rageCost){
		return false;
	}
	return true;
}
CompetanceManager.prototype.isReadyToCast = function(world, creature){
	if(this.competanceCode == "NONE"){
		return false;
	}
	return this.isRageOk(world, creature) && this.cooldownPercent(world, creature) <= 0;
}
CompetanceManager.prototype.tick = function(){
	this.lastUse++;	
}


CompetanceManager.prototype.tryCast = function(world, sourceCreature, targetCreature, targetCoord, forceRange){
	var polarCoord = sourceCreature.getPolarCoord(targetCoord);
	if(this.needTarget){
		if(targetCreature == null){
			return false;
		}
	}
	if(!this.isForAlly){
		if(!forceRange && targetCreature != null && targetCreature.team == sourceCreature.team){
			return false;
		}
	}
	if(forceRange || (this.range == -1 || polarCoord.distance < this.range)){		
		if(!this.isReadyToCast(world, sourceCreature)){
			return true;//do not cast, but do not move on click
		}			
		sourceCreature.rage -= this.rageCost;
		this.lastUse = 0;
		sourceCreature.lastCastTick = 0;
		var cast = this.constructorDelegate();
		cast.sourceCreature = sourceCreature;
		cast.targetCreature = targetCreature;
		cast.targetCoord = targetCoord; 
		cast.yieldComp = this.yieldComp; 
		cast.range = this.range - 12;//include the size of the target from target's center
		cast.isActive = true;
		cast.subCompetance = this.selectedSubCompetance;
		cast.subYieldComp = this.selectedSubCompetanceYieldComp;
		cast.endInit();
		
		world.addAnimation(cast);
		sourceCreature.stopMove();
		sourceCreature.orientation = polarCoord.angus;
		return true;
	}
	return false;//Need player move
}


var DAMAGETYPE = {
	"BASIC"  : 0,
	"POISON" : 1
}

function Projectile(sourceCreature, targetCoordOrAngus, speed, range){
	this.sourceCreature = sourceCreature;
	if(typeof targetCoordOrAngus === 'number'){
		this.direction = targetCoordOrAngus;
	} else {
		this.direction = this.sourceCreature.getPolarCoord(targetCoordOrAngus).angus;
	}
	this.speed = speed;
	this.range = range;
	this.isActive = true;
	this.tickNumber = 0;
	this.initialPosition =  {x: this.sourceCreature.position.x + 16 * Math.cos(this.direction),
				y: this.sourceCreature.position.y + 16 * Math.sin(this.direction)};
	this.distance = 0;
	this.position = this.initialPosition;
	this.touchSize = 0;
	this.touchedCreatures = new Array();
}
Projectile.prototype.tick = function(world){
	if(!this.isActive){
		return;
	}	
	this.distance += this.speed;
	if(this.distance > this.range){
		this.isActive = false;
		return;
	}	
	this.tickNumber++;
	if(this.tickNumber > 400){
		this.isActive = false;
		return;
	}
	this.position = {x:this.initialPosition.x + this.distance * Math.cos(this.direction),
						y:this.initialPosition.y + this.distance * Math.sin(this.direction)};
	var creatures = world.getCreaturesAt(this.position, 0, this.sourceCreature.team);
	this.touchedCreatures = this.touchedCreatures.concat(creatures);
}



function Pick(){}
Pick.prototype.endInit = function(){
	this.direction = this.sourceCreature.getPolarCoord(this.targetCoord).angus;
	this.hasTouch = false;
	this.tickNumber = 0;
	this.endPickCoord = {x:0, y:0};
	this.endPickDistance = 0;
}
Pick.prototype.tick = function(world){
	this.tickNumber++;
	if(!this.isActive){
		return;
	}
	if(this.tickNumber < 5){
		this.endPickDistance = this.tickNumber / 5 * this.range;
	} else if(this.tickNumber < 7){
		this.endPickDistance = this.range;
	} else if(this.tickNumber < 12){
		var reverseTick = 12 - this.tickNumber;
		this.endPickDistance = reverseTick / 5 * this.range;
	} else {
		this.isActive = false;
	}
	this.endPickCoord = {x:this.sourceCreature.position.x + this.endPickDistance * Math.cos(this.direction),
						y:this.sourceCreature.position.y + this.endPickDistance * Math.sin(this.direction)};
	if(!this.hasTouch){
		var creatures = world.getCreaturesAt(this.endPickCoord, 0, this.sourceCreature.team);
		if(creatures.length != 0){
			this.hasTouch = true;
			var touchedCreature = creatures[creatures.length - 1];
			touchedCreature.takeDamage(world, this.sourceCreature, this.yieldComp, DAMAGETYPE.BASIC);
		}
	}
}
Pick.prototype.draw = function(screen){
	if(!this.isActive){
		return;
	}
	var color = 'blue';
	if(this.hasTouch){
		color = 'red';
	}
	screen.fillRect(1, this.endPickCoord, 5, 5, color);
}




function Arrow(){
}
Arrow.prototype.endInit = function(){
	this.projectile = new Projectile(this.sourceCreature, this.targetCoord, 5, this.range);	
}
Arrow.prototype.tick = function(world){
	this.projectile.tick(world);
	if(!this.projectile.isActive){
		this.isActive = false;
		return;
	}	
	if(this.projectile.touchedCreatures.length != 0){
		var touchedCreature = this.projectile.touchedCreatures[0];
		touchedCreature.takeDamage(world, this.sourceCreature, this.yieldComp, DAMAGETYPE.BASIC);
		if(this.subCompetance == "POISON"){
			touchedCreature.addBuff(new PoisonBuff(world, this.sourceCreature, 'arrow_poison', 100, this.subYieldComp));
		}
		this.isActive = false;
	}
}
Arrow.prototype.draw = function(screen){
	if(!this.isActive){
		return;
	}	
	screen.fillRect(1, this.projectile.position, 3, 3, 'black');
}


function MultiArrow(){
}
MultiArrow.prototype.endInit = function(){
	this.projectiles = new Array();
	var direction = this.sourceCreature.getPolarCoord(this.targetCoord).angus;
	for(var i = 0; i < 5; i++){
		var angus = direction + (i - 2) * Math.PI / 12;
		this.projectiles.push(new Projectile(this.sourceCreature, angus, 5, this.range));
	}
	this.isActive = true;	
}
MultiArrow.prototype.tick = function(world){
	var anyActive = false;
	for(var i = 0; i < this.projectiles.length; i++){
		this.projectiles[i].tick(world);
		if(this.projectiles[i].isActive){
			anyActive = true;	
			if(this.projectiles[i].touchedCreatures.length != 0){
				var touchedCreature = this.projectiles[i].touchedCreatures[0];
				touchedCreature.takeDamage(world, this.sourceCreature, this.yieldComp, DAMAGETYPE.BASIC);
				this.projectiles[i].isActive = false;
			}
		}
	}
	if(!anyActive){
		this.isActive = false;
	}
}
MultiArrow.prototype.draw = function(screen){
	if(!this.isActive){
		return;
	}	
	for(var i = 0; i < this.projectiles.length; i++){	
		if(this.projectiles[i].isActive){
			screen.fillRect(1, this.projectiles[i].position, 3, 3, 'brown');
		}
	}
}

function Fireball(){
}
Fireball.prototype.endInit = function(){
	this.projectile = new Projectile(this.sourceCreature, this.targetCoord, 2, this.range);
	this.projectile.touchSize = 16;
}
Fireball.prototype.tick = function(world){
	if(!this.isActive){
		return;
	}	
	this.projectile.tick(world);
	var explosionCoord = null;
	if(!this.projectile.isActive){
		explosionCoord = this.projectile.position;
		this.isActive = false;
	}	else if(this.projectile.touchedCreatures.length != 0){
		explosionCoord =  this.projectile.touchedCreatures[0].position;
		this.isActive = false;
	}
	if(explosionCoord != null){
		this.sourceCreature.animations.push(new AOE(world, this.sourceCreature, this.yieldComp, explosionCoord, 64, img_fireball));
	}	
}
Fireball.prototype.draw = function(screen){
	if(!this.isActive){
		return;
	}	
	screen.drawCell(img_fireball, 1, this.projectile.position, this.projectile.direction);
}


function Iceball(sourceCreature, targetCoord, yieldComp, range){
}
Iceball.prototype.endInit = function(){
	this.projectile = new Projectile(this.sourceCreature, this.targetCoord, 4, this.range);
	this.projectile.touchSize = 16;
}
Iceball.prototype.tick = function(world){
	this.projectile.tick(world);
	if(!this.projectile.isActive){
		this.isActive = false;
		return;
	}	
	if(this.projectile.touchedCreatures.length != 0){
		var touchedCreature = this.projectile.touchedCreatures[0];
		touchedCreature.takeDamage(world, this.sourceCreature, this.yieldComp, DAMAGETYPE.BASIC);
		touchedCreature.addBuff(new SlowBuff(0.4, 60));
		this.isActive = false;
	}
}
Iceball.prototype.draw = function(screen){
	if(!this.isActive){
		return;
	}	
	screen.drawCell(img_iceball, 1, this.projectile.position, this.projectile.direction);
}


function PetZina(){
}
PetZina.prototype.endInit = function(){
	var pet = new Creature(img_zina, TEAM.PLAYER);
	pet.stat.speed *= 0.8;//avoid collision
	pet.setAttributes(
		this.sourceCreature.stat.maxLife * this.yieldComp / 100, 
		this.sourceCreature.stat.power* this.yieldComp / 100, 
		this.sourceCreature.stat.armor* this.yieldComp /100, 
		this.sourceCreature.stat.armorReduction *  this.yieldComp / 100);
	pet.setPosition(this.sourceCreature.position.x, this.sourceCreature.position.y);
	pet.setCompetance(0, "PICK");
	pet.id = "zina";
	this.petCast = false;
	this.pet = pet;
}
PetZina.prototype.tick = function(world){
	if(!this.petCast)
	{
		world.addPet(this.pet, 3);
		this.petCast = true;
	}
	this.isActive = false;
}

PetZina.prototype.draw = function(screen){
}

function IceTower(){
}
IceTower.prototype.endInit = function(){
	var pet = new Creature(img_icetower, TEAM.PLAYER);
	pet.isTower = true;
	pet.setAttributes(
		0.5 * this.sourceCreature.stat.maxLife * this.yieldComp / 100, 
		this.sourceCreature.stat.power* this.yieldComp / 100, 
		this.sourceCreature.stat.armor* this.yieldComp / 100, 
		this.sourceCreature.stat.armorReduction * this.yieldComp / 100);
	pet.setPosition(this.sourceCreature.position.x, this.sourceCreature.position.y);
	pet.setCompetance(0, "ICEBALL");
	pet.competances[0].rageCost = 0;// else it will never fire
	pet.id = "towerIce";
	this.petCast = false;
	this.pet = pet;
	this.tickCount = 0;
}
IceTower.prototype.tick = function(world){
	if(!this.petCast)
	{
		world.addPet(this.pet, 3);
		this.petCast = true;
	}
	this.tickCount++;
	if(this.tickCount > 20 * 30){//30 sec
		for(var i = 0; i < world.allies.length; i++){
			if(world.allies[i] == this.pet){
				world.allies.slice(i, 1);
			}
		}
		this.isActive = false;
	}
}
IceTower.prototype.draw = function(screen){
}

function Heal(){
}
Heal.prototype.endInit = function(){
	this.targetCreature.life = Math.min(this.targetCreature.tickStat.maxLife,
		this.targetCreature.life + this.yieldComp * this.sourceCreature.tickStat.power);
	
	this.targetCreature.animations.push(new RotateImage(this.targetCreature, img_heal, 2, -0.07, 3));

}
Heal.prototype.tick = function(world){
}
Heal.prototype.draw = function(screen){
}