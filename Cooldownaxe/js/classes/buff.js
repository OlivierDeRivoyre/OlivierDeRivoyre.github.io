var icon_slowBuff = LoadImage('sprites/iceball.png');
var icon_poisonBuff = LoadImage('sprites/poison.png');

function SlowBuff(percentSpeed, duration){
	this.code = "Slow";
	this.percentSpeed = percentSpeed;
	this.duration = duration;
	this.tickCount = 0;
	this.icon = icon_slowBuff;
	this.isAlive = true;
	this.isDebuff = true;
}
SlowBuff.prototype.tick = function(creature){
	this.tickCount++;
	if(this.tickCount > this.duration){
		this.isAlive = false;
	}
}
SlowBuff.prototype.apply = function(stat){
	stat.speed *= this.percentSpeed;
}



function PoisonBuff(world, fromCreature, code, durationSec, yieldPower){
	this.world = world,
	this.fromCreature = fromCreature;
	this.code = code;
	this.icon = icon_poisonBuff;
	this.duration = durationSec * 25 + 2;//+2 to let the last tick
	this.yieldPower = yieldPower;
	this.tickCount = 0;
	this.isAlive = true;
	this.isDebuff = true;
}
PoisonBuff.prototype.tick = function(creature){
	this.tickCount++;
	if(this.tickCount > this.duration){
		this.isAlive = false;
	}
	if(this.tickCount % 20 == 0){
		creature.takeDamage(this.world, this.fromCreature, this.yieldPower, DAMAGETYPE.POISON);
	}
}
PoisonBuff.prototype.apply = function(stat){
}

