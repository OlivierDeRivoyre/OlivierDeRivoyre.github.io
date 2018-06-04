
var img_etoile = LoadImage('sprites/etoile.png');
var img_sparks = LoadImage('sprites/sparks.png');
var img_sparksnice = LoadImage('sprites/sparksnice.png');
var img_tilesetRound = LoadImage('tilesets/round.png');


function World(){
	this.tileset = new Tilset(img_tilesetRound);
	//this.keyPressed = new Array();
	this.mouse = {x:0, y:0};
	this.tickNumber = 0;
	this.allies = new Array();
	this.animations = new Array();
	this.createPlayer();
	this.createMonsters(1);
	
}
World.prototype.createPlayer = function(){
	this.player = new Creature(img_etoile, TEAM.PLAYER);
	this.player.setAttributes(100, 5, 50, 10);
	this.player.stat.criticalStrike = 0.10;
	this.player.stat.regenLife = 5;
	this.player.isIa = false;
	this.player.setCompetance(0, "PICK");
	this.player.setCompetance(1, "ARROW");
	this.player.setCompetance(2, "MULTIARROW");
	this.player.setCompetance(3, "FIREBALL");
	this.player.setCompetance(4, "NONE");
	this.player.setCompetance(5, "ICEBALL");
	this.player.setCompetance(6, "FIREBALL");
	
	this.player.refreshTickStat();
	this.allies.push(this.player);
}
World.prototype.createMonsters = function(level){
	this.monsters = new Array();
	for(var i = 0; i < 30; i++){
		var monster = new Creature(img_sparks, TEAM.MONSTER);
		monster.stat.speed *= 0.7;
		monster.setAttributes(10, 3, 20, 0);
		monster.setPosition(Math.random() * 500, Math.random() * 500);
		monster.setCompetance(0, "PICK");
		monster.deadAnimation = new NiceCreature(monster, img_sparksnice);
		this.monsters.push(monster);
	}
}

World.prototype.drawAll = function(screen){
	screen.tryCenter(this.player.position);
	screen.clear();
	this.tileset.drawBackground(screen);
	for(var i = 0; i < this.monsters.length; i++){
		this.monsters[i].draw(screen);			
	}
	for(var i = 0; i < this.allies.length; i++){
		this.allies[i].draw(screen);
	}
	for(var i = 0; i < this.animations.length; i++){
		this.animations[i].draw(screen);
	}  
}
World.prototype.tick = function(){
	this.tickNumber++;
	for(var i = 0; i < this.allies.length; i++){
		this.allies[i].tick(this);
	}
	for(var i = 0; i < this.monsters.length; i++){
		this.monsters[i].tick(this);
	}
	for(var i = this.monsters.length - 1; i >=0 ; i--){
		if(!this.monsters[i].isAlive){
			this.monsters.splice(i, 1);
		}
	}
	for(var i = 0; i < this.animations.length; i++){
		this.animations[i].tick(this);
	}
	for(var i = this.animations.length - 1; i >=0 ; i--){
		if(!this.animations[i].isActive){
			this.animations.splice(i, 1);
		}
	}
}

World.prototype.addAnimation = function(anim){
	this.animations.push(anim);
}
World.prototype.addPet = function(pet, nbPetMax){
	this.allies.push(pet);
	var petCount = 0;
	var deadPetCount = 0;
	for(var i = this.allies.length - 1; i >= 0; i--){
		if(this.allies[i].id == pet.id){
			if(this.allies[i].isAlive){
				petCount++;		
				if(petCount > nbPetMax){
					this.allies[i].isAlive = false;
				}					
			} else {
				deadPetCount ++;
				if(deadPetCount > 20){//clean up
					this.allies.slice(i, 1);
				}
			}
		}
		
	}
}
World.prototype.getOppositeTeam = function(exceptTeam){
	if(exceptTeam == TEAM.PLAYER){
		return this.monsters;
	}
	if(exceptTeam == TEAM.MONSTER){
		return this.allies;
	}
	return "todo:" + exceptTeam;
}
World.prototype.getCreaturesAt = function(point, distance, exceptTeam){
	var r = new Array();
	var oppositeTeam = this.getOppositeTeam(exceptTeam);
	for(var i = 0; i < oppositeTeam.length; i++){
		if(oppositeTeam[i].isAlive){
			if(oppositeTeam[i].getPolarCoord(point).distance <= distance + 14){//Not 16 becaus there is always some blanck pixel
				r.push(oppositeTeam[i]);
			}	
		}
	}
	return r;
}

World.prototype.getNearestCreature = function(sourceCoord, lastFocus, maxDistance, exceptTeam){
	var selectedMonster = null;
	var selectedDistance = 999999;
	var oppositeTeam = this.getOppositeTeam(exceptTeam);
	for(var i = 0; i < oppositeTeam.length; i++){
		if(oppositeTeam[i].isAlive){
			var monsterDistance = oppositeTeam[i].getPolarCoord(sourceCoord).distance;
			if(monsterDistance < maxDistance + 14){
				var bonus = 0;
				if(lastFocus != null){
					bonus = oppositeTeam[i].getPolarCoord(lastFocus).distance;
				}
				if(monsterDistance + bonus < selectedDistance){
					selectedDistance = monsterDistance + bonus;
					selectedMonster = oppositeTeam[i];
				}
			}
		}
	}
	return selectedMonster;
}