var TEAM = {
	"PLAYER"  : 0,
	"MONSTER" : 1
}
 
var img_blood = LoadImage('sprites/blood.png');

function CreatureStat(){
	this.speed = 3;
	this.criticalStrike = 0.0;
	this.regenLife = 0;	
	this.armor = 0;
	this.power = 0;
	this.armorReduction = 0;
	this.maxRage = 100;
	this.lostRageSpeed = 1;
	this.isImmobilized = false;
	this.isStun = false;
}
CreatureStat.prototype.clone = function(x, y){
	var newInstance = new CreatureStat();
	for(var i in this)	{
		newInstance[i] = this[i];	
	}	
	return newInstance;
}

function Creature(img, team){
	this.img = img;
	this.position = {x:0, y:0};
	this.team = team;
	this.isIa = true;
	this.id = null;
	this.isTower = false;
	
	this.position = {x:0, y:0};
	this.destination = {x:0, y:0};
	this.orientation = -Math.PI / 2;	
	this.isAlive = true;
	this.level = 1;
	this.life = 1;
	this.rage = 0;
	this.competanceCount = 7;
	this.lastRageIncrement = 0;
	this.competances = new Array();
	this.buffs = new Array();
	this.animations = new Array();//anim that die with the player
	this.aggro = null;
	this.lastCastTick = 0;
	
	this.stat = new CreatureStat();	//stat that are modified by Cooldown
	this.tickStat = this.stat.clone();//stat used in computation (after buff)
	this.deadAnimation = null;
}
Creature.prototype.getOppositeTeam = function(){
	if(this.team == TEAM.PLAYER)
		return TEAM.MONSTER;
	return TEAM.PLAYER;
}
Creature.prototype.getLifePercent = function(){
	if(!this.isAlive)
		return 0;
	return this.life * 100 / this.stat.maxLife;
}

Creature.prototype.setAttributes = function(maxLife, power, armor, armorReduction){
	this.life = maxLife;
	this.stat.maxLife = maxLife;
	this.stat.armor = armor;
	this.stat.power = power;
	this.stat.armorReduction = armorReduction; 
	this.refreshTickStat();
}
Creature.prototype.createCompetance = function(competanceCode){
	var competance = COMPETANCEMANAGERS[competanceCode]();
	competance.competanceCode = competanceCode;
	return competance;
}
Creature.prototype.setCompetance = function(index, competanceCode){
	if(competanceCode != "NONE"){
		for(var i = 0; i < this.competances.length; i++){
			if(this.competances[i].competanceCode == competanceCode){
				this.competances[i] = this.createCompetance("NONE");
			}
		}
	}
	this.competances[index] = this.createCompetance(competanceCode);
}

Creature.prototype.refreshTickStat = function(){
	this.tickStat = this.stat.clone();
	for(var i = 0; i < this.buffs.length; i++){
		this.buffs[i].apply(this.tickStat);
	}
}
Creature.prototype.addBuff = function(buff){
	var buffStackCount = 1;
	for(var i = this.buffs.length - 1; i >= 0 ; i--){
		if(this.buffs[i].code == buff.code){
			if(buff.maxStack == undefined || buffStackCount >= buff.maxStack){//allow to stack buff
				this.buffs.splice(i, 1);
			} else {
				buffStackCount++;
			}
		}
	}
	this.buffs.push(buff);
	this.refreshTickStat();
}

Creature.prototype.getVisibleBuffs = function(){
	return this.buffs;
}
Creature.prototype.setPosition = function(x, y){
	this.position = {x:x, y:y};
	this.destination = {x:x, y:y};
}

Creature.prototype.stopMove = function(x, y){
	this.destination = {x:this.position.x, y:this.position.y};
}


Creature.prototype.getPolarCoord = function(targetCoord){
	var dx = targetCoord.x - this.position.x;
	var dy = targetCoord.y - this.position.y;
	var distance = Math.sqrt(dx*dx + dy*dy);
	var angus = Math.atan2(dy, dx);
	return {distance: distance, angus: angus};
}

Creature.prototype.tick = function(world){
	if(!this.isAlive){
		return;
	}
	if(this.isIa){
		this.ia(world);
	}
	
	//buff
	for(var i = this.buffs.length - 1; i >= 0 ; i--){
		this.buffs[i].tick(this);
		if(!this.buffs[i].isAlive){
			this.buffs.splice(i, 1);
			this.refreshTickStat();
		}
	}
	//regen life
	if(world.tickNumber % 20 == 0){
		this.life = Math.min(this.tickStat.maxLife, this.life + this.tickStat.regenLife);
	}
	//rage lost
	this.lastRageIncrement++;
	if(this.lastRageIncrement > 100 && world.tickNumber % 5 == 0){//have 5sec before rage lost
		this.rage = Math.min(this.tickStat.maxRage, Math.max(0, this.rage - this.tickStat.lostRageSpeed));
	}
	//Competance
	this.lastCastTick ++;
	for(var i = 0; i < this.competances.length; i++){
		this.competances[i].tick();
	}
	//child animations: AOE, pets, etc.
	for(var i = 0; i < this.animations.length; i++){
		this.animations[i].tick(world);
	}
	for(var i = this.animations.length - 1; i >=0 ; i--){
		if(!this.animations[i].isActive){
			this.animations.splice(i, 1);
		}
	}
	//Move
	if(!this.tickStat.isStun && !this.tickStat.isImmobilized){
	
		var polarDest = this.getPolarCoord(this.destination);
		var distance = polarDest.distance;
		var tickSpeed = Math.min(this.tickStat.speed, distance);
		
		if(distance >= 1.1)
		{
			this.orientation = polarDest.angus;
			if(!this.isTower){
				var newX = this.position.x + tickSpeed * Math.cos(this.orientation);
				var newY = this.position.y + tickSpeed* Math.sin(this.orientation);

				this.position = {x:newX, y:newY};
			}
		}	
	}
	
}

Creature.prototype.draw = function(screen){
	if(!this.isAlive){
		screen.drawCell(img_blood, 0, this.position, this.orientation, null);
		return;
	}
	for(var i = 0; i < this.animations.length; i++){
		this.animations[i].draw(screen);
	}
	screen.drawCell(this.img, 2, this.position, this.orientation, 'red');
}

Creature.prototype.ia = function(world){
	if(!this.isAlive){
		return;
	}
	if(this.aggro != null && !this.aggro.isAlive){
		this.aggro = null;
	}
	if(this.team == TEAM.PLAYER){//PET
		if(!this.isTower){
			if(this.aggro == null){		
				if(this.getPolarCoord(world.player.position).distance > 150){//Come back
					this.aggro = world.player;
				}
			}
			else if(this.aggro == world.player){
				if(this.getPolarCoord(world.player.position).distance < 100){//back in range
					this.aggro = null;
				}
			}
		}
	}
	if(this.aggro != null && this.aggro.team != this.team){	
		if(this.getPolarCoord(this.aggro.position).distance > 400){//too far
			this.aggro = null;
		}
	}
	//Find a target
	if(this.aggro == null){
		this.aggro = world.getNearestCreature(this.position, null, 100, this.team);
	}
	if(this.team == TEAM.PLAYER){	
		if(this.aggro == null){
			if(!this.isTower){//Follow player if no monsters
				var destinationToPlayer = world.player.getPolarCoord(this.destination).distance
				var distanceToPlayer = this.getPolarCoord(world.player.position).distance
				if((distanceToPlayer < 40 && destinationToPlayer < 40) || destinationToPlayer > 70){
					direction = Math.random() * Math.PI * 2;
					var newX = world.player.position.x + 50 * Math.cos(direction);
					var newY = world.player.position.y + 50 * Math.sin(direction);				
					this.destination = {x:newX, y:newY};
					return;
				}	
			}			
		}
	
	}

	if(this.aggro != null){
		var polarDest = this.getPolarCoord(this.aggro.position);
		var distance = polarDest.distance;
		var nextCompetance = this.iaNextCompetance(world);
		var direction = polarDest.angus;
			
		if(this.aggro.team != this.team && this.aggro.stat.power > 4 * this.stat.power || nextCompetance == null){
			direction +=  Math.PI; //Run!
			var newX = this.position.x + 100 * Math.cos(direction);
			var newY = this.position.y + 100 * Math.sin(direction);
				
			this.destination = {x:newX, y:newY};
		} else {
			
			var targetRange = nextCompetance.range;
			if(targetRange == -1){
				targetRange = 64;//just to cast
			}
			if(distance < 10){
				direction = Math.random() * Math.PI * 2;
			}
			
			if(distance > 30 && distance > targetRange / 2 && distance < targetRange){//in attack range
				//in range: stay here
				this.destination = {x:this.position.x, y:this.position.y};
				this.orientation = direction;
			} 
			else {		
				//go in direction of the target
				var newX = this.aggro.position.x - 32 * Math.cos(direction);
				var newY = this.aggro.position.y - 32 * Math.sin(direction);
				
				this.destination = {x:newX, y:newY};
			}
			if(this.aggro.team != this.team){
				nextCompetance.tryCast(world, this, this.aggro, this.aggro.position, false);
			}
		}
	}
}


Creature.prototype.iaNextCompetance = function(world, distanceToPlayer){
	var maxRange = 0;
	var selectedCompetance = null;
	for(var i = 0; i < this.competances.length; i++){
		if(this.competances[i].isReadyToCast(world, this)){
			if(this.competances[i].range < distanceToPlayer){
				return this.competances[i];
			} else if(this.competances[i].range > maxRange){
				maxRange = this.competances[i].range;
				selectedCompetance = this.competances[i];
			}
		}
	}
	if(selectedCompetance == null && this.competances.length > 0){
		return this.competances[0];//do not go aways on CD
	}
	return selectedCompetance;
}

Creature.prototype.playerTryCast = function(world, targetCreature, coord, competanceIndex, forceRange){
	if(!this.isAlive){
		return false;
	}
	var competance = this.competances[competanceIndex];
	if(competance == null){
		return false;
	}
	var adjutedTargetCreature = targetCreature;
	if(competance.isForAlly){
		if(targetCreature == null || targetCreature.team != this.team){
			adjutedTargetCreature = this;
		}
	}	
	return competance.tryCast(world, this, adjutedTargetCreature, coord, forceRange);
}


Creature.prototype.takeDamage = function(world, fromCreature, yieldPower, damageType){
	if(!this.isAlive){
		return;
	}
	if(this.aggro == null ||
	this.getLifePercent() > 90){//aggro not stable until 90%
		this.aggro = fromCreature;
		var creatureAround = world.getCreaturesAt(this.position, 64, fromCreature.team);
		for(var i = 0; i < creatureAround.length; i++){
			if(creatureAround[i].aggro == null){
				creatureAround[i].aggro = fromCreature;
			}
		}
	}
	var isCriticalStrike = Math.random() < fromCreature.tickStat.criticalStrike;
	var pureDamageBase = fromCreature.tickStat.power * (yieldPower / 100);
	var pureDamageWithRand = pureDamageBase * (0.9 + Math.random() * 0.2);//+/- 10%
	var pureDamage = pureDamageWithRand;
	if(isCriticalStrike){
		pureDamage = 2 * pureDamageWithRand;
	}
	var arm = Math.max(0, this.tickStat.armor - fromCreature.tickStat.armorReduction);
	
	var reducedDamage = Math.round(pureDamage * 100 / (100 + arm));
	this.life -= reducedDamage;		
	if(this.team == TEAM.MONSTER){
		var anim = new AnimDamage(this, reducedDamage, isCriticalStrike, damageType);
		world.addAnimation(anim);
	}
	if(this.life <= 0){
		this.isAlive = false;
		this.dropLoot();
		if(this.deadAnimation != null){
			world.addAnimation(this.deadAnimation);
		}
	}
	fromCreature.rage = Math.min(fromCreature.tickStat.maxRage, this.rage + (isCriticalStrike ? 7 : 3));
	this.rage = Math.min(fromCreature.tickStat.maxRage, this.rage + 4);
	fromCreature.lastRageIncrement = 0;
	this.lastRageIncrement = 0;
}

Creature.prototype.levelUp = function(){
	this.level ++;
}


Creature.prototype.dropLoot = function(){
	if(this.team != TEAM.MONSTER){
		return;
	}
	var anim = new DroppedLoot(this.position, null);
	world.addAnimation(anim);
}



