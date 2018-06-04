var img_PlayerStatMenu = new Image();
img_PlayerStatMenu.src = 'sprites/PlayerStatMenu.png';



function Gui(world, canvas, player){
	this.world = world;
	this.player = player;	
	this.canvas = canvas;
	//this.controls = new Array();
	this.menusBar = this.createMenusbar(this.canvas, 48);
	this.focusCreature = null;
	this.targetActionBar = null;
	this.lastTime = Date.now();
	this.drawCount = 0;
	this.fps = 25;
	this.menusStack = new Array();//only show the last
	this.refresh();
}
Gui.prototype.refresh = function(){
	this.playerActionBar = this.createActionbar(this.player, {x:5, y:this.canvas.height - 48 - 5}, 48);	
}
Gui.prototype.createActionbar = function(creature, topLeftCoord, cellSize){
	var actionBar = new Control(
		topLeftCoord,
		{x:topLeftCoord.x + (creature.competances.length + 1) * cellSize, 
		y:topLeftCoord.y + cellSize}
		);
	actionBar.creature = creature;
	//this.controls.push(actionBar);
	var lifeIndicator = new Control(
		topLeftCoord,
		{x:topLeftCoord.x + cellSize,
		y:topLeftCoord.y + cellSize});
	actionBar.controls.push(lifeIndicator);
	lifeIndicator.ondraw = function(canvas, rendering, control){
		rendering.fillStyle = '#FFFFFF';	
		rendering.fillRect(control.topLeftCoord.x, control.topLeftCoord.y, cellSize, cellSize);				
		rendering.textAlign = 'right';
		rendering.font="10px Arial";
		rendering.fillStyle = 'red';
		rendering.fillText(Math.ceil(creature.getLifePercent()) + '%', control.topLeftCoord.x + cellSize - 1, control.topLeftCoord.y + 4 + cellSize / 4);
		rendering.fillStyle = 'brown';
		rendering.fillText(Math.ceil(creature.rage) + ' ', control.topLeftCoord.x + cellSize - 1, control.topLeftCoord.y + 4 + cellSize  * 3 / 4);
	};
	for(var i = 0; i < creature.competances.length; i++){
		var compTopLeft = {x: topLeftCoord.x + (i + 1) * cellSize, y:topLeftCoord.y};
		var compControl = new Control(
			compTopLeft,
			{x:compTopLeft.x + cellSize,
			y:compTopLeft.y + cellSize});
		actionBar.controls.push(compControl);
		compControl.world = this.world;
		compControl.creature = creature;		
		compControl.competance = creature.competances[i];
		compControl.competanceIndex = i;
		compControl.ondraw = function(canvas, rendering, control){
			var competance = control.competance;
			rendering.drawImage(competance.icon, control.topLeftCoord.x, control.topLeftCoord.y, cellSize, cellSize);
			var cooldownPercent = competance.cooldownPercent(this.world, this.creature);
			var isRageOk = competance.isRageOk(this.world, this.creature);
			if(!isRageOk){
				rendering.fillStyle = "rgba(100, 0, 0, 0.6)";
				rendering.fillRect(control.topLeftCoord.x, control.topLeftCoord.y, cellSize, cellSize);
			}
			if(cooldownPercent > 0){				
				rendering.fillStyle = "rgba(0, 0, 0, 0.1)";
				rendering.fillRect(control.topLeftCoord.x, control.topLeftCoord.y, cellSize, cellSize);
				rendering.fillStyle = "rgba(0, 0, 0, 0.9)";
				rendering.fillRect(control.topLeftCoord.x, control.topLeftCoord.y, cellSize, cellSize * cooldownPercent);
				
			}
		}		
	}	
	var buffTopLeft = {x: topLeftCoord.x + (1 + creature.competances.length) * cellSize, y:topLeftCoord.y};
	var buffControl = new Control(buffTopLeft,
			{x:buffTopLeft.x + 2*cellSize,
			y:buffTopLeft.y + cellSize});;
	actionBar.controls.push(buffControl);
	buffControl.world = this.world;
	buffControl.creature = creature;		
	buffControl.ondraw = function(canvas, rendering, control){
		rendering.fillStyle = "rgba(255, 255, 255, 0.5)";
		rendering.fillRect(control.topLeftCoord.x, control.topLeftCoord.y, cellSize * 2, cellSize);
				
		var buffs = this.creature.getVisibleBuffs();
		var nbBuffPerLine = 4;
		var nbColBuff = 2;
		var buffSize = cellSize / 2;
		var ratio = 2;
		while(nbBuffPerLine * nbColBuff < buffs.length){
			ratio++;
			nbBuffPerLine = ratio * 2;
			nbColBuff = ratio;
			buffSize = cellSize / ratio;
		}		
		for(var i = 0;  i < buffs.length; i++){
			var x = i % nbBuffPerLine;
			var y = Math.ceil(i / nbBuffPerLine);
			rendering.drawImage(buffs[i].icon, 
				control.topLeftCoord.x + x * buffSize, control.topLeftCoord.y + y * buffSize,
				buffSize, buffSize);
			
		}
	};	
	return actionBar;
}
Gui.prototype.setTargetActionBar = function(creature){
	if(creature != null){
		this.targetActionBar = this.createActionbar(creature, {x:(this.canvas.width - 64)/2, y:5}, 32);
	}
}
Gui.prototype.createMenusbar = function(canvas, cellSize){
	var topLeftCoord = {x: canvas.width - cellSize - 5, y : 5};
	var nbButtons = 1;
	if(isDebug != undefined){
		nbButtons += 2;
	}
	var menusBar = new Control(
		topLeftCoord,
		{x:topLeftCoord.x + cellSize, 
		y:topLeftCoord.y + nbButtons * cellSize}
		);
	
	var playerStatButton = new Control(
		topLeftCoord,
		{x:topLeftCoord.x + cellSize,
		y:topLeftCoord.y + cellSize});
	playerStatButton.id = 'playerStatButton';
	menusBar.controls.push(playerStatButton);
	playerStatButton.ondraw = function(canvas, rendering, control){
		rendering.drawImage(img_PlayerStatMenu, control.topLeftCoord.x, control.topLeftCoord.y, cellSize, cellSize);				
	};
	if(isDebug != undefined){
		var playerLevelUpButton = new Control(
			{x:topLeftCoord.x,
			y:topLeftCoord.y + cellSize},
			{x:topLeftCoord.x + cellSize,
			y:topLeftCoord.y + 2* cellSize});
			playerLevelUpButton.id = 'playerLevelUpButton';
		menusBar.controls.push(playerLevelUpButton);
		playerLevelUpButton.ondraw = function(canvas, rendering, control){
			rendering.fillStyle = '#FFFF88';	
			rendering.fillRect(control.topLeftCoord.x, control.topLeftCoord.y, cellSize, cellSize);				
		};
		var popMonsterButton = new Control(
			{x:topLeftCoord.x,
			y:topLeftCoord.y + 2*cellSize},
			{x:topLeftCoord.x + cellSize,
			y:topLeftCoord.y + 3* cellSize});
			popMonsterButton.id = 'popMonsterButton';
		menusBar.controls.push(popMonsterButton);
		popMonsterButton.ondraw = function(canvas, rendering, control){
			rendering.fillStyle = '#FF8888';	
			rendering.fillRect(control.topLeftCoord.x, control.topLeftCoord.y, cellSize, cellSize);				
		};

	}
	return menusBar;
}

Gui.prototype.showMenu = function(menu){
	menu.gui = this;
	menu.close = function(){
		this.gui.menusStack.splice(this.gui.menusStack.length - 1, 1);
	};
	menu.showMenu = function(newMenu){
		this.gui.showMenu(newMenu);
	};
	menu.previousMenu = null;
	if(this.menusStack.length > 0){
		menu.previousMenu = this.menusStack[this.menusStack.length - 1];
	}
	this.menusStack.push(menu);
}

Gui.prototype.showDps = function(canvas, rendering)
{
	this.drawCount++;
	var now = Date.now();
	var duration = now - this.lastTime;
	if(duration > 1000){
		this.fps = Math.round(this.drawCount * 1000 / duration, 2);
		this.drawCount = 0;
		this.lastTime = now;
	}
	rendering.font="14px Arial";
	rendering.fillStyle = 'white';
	rendering.fillText(this.fps, 25, 25);
		
}
Gui.prototype.draw = function(canvas, rendering)
{	
	this.playerActionBar.draw(canvas, rendering, this.playerActionBar);
	if(this.targetActionBar != null && this.targetActionBar.creature.isAlive){
		this.targetActionBar.draw(canvas, rendering, this.targetActionBar);
	}
	this.menusBar.draw(canvas, rendering, this.menusBar);
	this.showDps(canvas, rendering);	
}

var KEYS = {
	"DOWN"  : 0,
	"RIGHT" : 1,
	"LEFT" : 2,
	"UP"   : 3,
	"ACTION1" : 10,
	"ACTION2" : 11,
	"ACTION3" : 12,
	"ACTION4" : 13,
	"ACTION5" : 14,
	"ACTION6" : 15,
	"ACTION7" : 16
};

Gui.prototype.keypressed = function(key)
{
	var compIndex = null;
	switch(key){
		case KEYS.ACTION1: compIndex = 0; break;
		case KEYS.ACTION2: compIndex = 1; break;
		case KEYS.ACTION3: compIndex = 2; break;
		case KEYS.ACTION4: compIndex = 3; break;
		case KEYS.ACTION5: compIndex = 4; break;	
		case KEYS.ACTION6: compIndex = 5; break;
		case KEYS.ACTION7: compIndex = 6; break;		
	}
	if(compIndex != null){
		this.player.playerTryCast(this.world, this.focusCreature, this.world.mouse, compIndex, true);
	}
}

Gui.prototype.autoFocusMonster = function(){
	if(this.focusCreature != null && this.focusCreature.isAlive && this.focusCreature.team == TEAM.MONSTER){
		return;
	}
	var lastFocus = null;
	if(this.focusCreature != null){
		lastFocus = this.focusCreature.position;
	}
	this.focusCreature = this.world.getNearestCreature(this.player.position, lastFocus, 128, this.player.team);
	this.setTargetActionBar(this.focusCreature);
			
}
Gui.prototype.onClick = function(canvasPoint, worldpoint){
	var button = this.playerActionBar.getControl(canvasPoint);
	var menubutton = this.menusBar.getControl(canvasPoint);
	if(button != null){
		if(button.competance != null){
			
			if(button.competance.range == -1){
				this.player.playerTryCast(this.world, this.focusCreature, this.player.position, button.competanceIndex, true);				
			} else if(button.competance.isForAlly) {
				if( this.focusCreature != null && this.focusCreature.team == TEAM.PLAYER){
					this.player.playerTryCast(this.world, this.focusCreature, this.focusCreature.position, button.competanceIndex, true);		
				} else {
					this.player.playerTryCast(this.world, this.player, this.player.position, button.competanceIndex, true);		
			
				}				
			} else {
				this.autoFocusMonster();
				if(this.focusCreature != null && this.focusCreature.team == TEAM.MONSTER && this.focusCreature.isAlive){			
					this.player.playerTryCast(this.world, this.focusCreature, this.focusCreature.position, button.competanceIndex, true);
				}
			}			
		}		
	} else if(menubutton != null){		
		if(menubutton.id == 'playerStatButton'){
			this.showMenu(new MenuPlayerStat(this.player));
		}
		if(menubutton.id == 'playerLevelUpButton'){
			this.player.levelUp();
		}
		if(menubutton.id == 'popMonsterButton'){
			world.createMonsters(this.player.level);
		}
	} else  {
		var creatures = this.world.getCreaturesAt(worldpoint, 1, TEAM.PLAYER);
		if(creatures.length != 0)
		{
			this.focusCreature = creatures[0];
			this.setTargetActionBar(this.focusCreature);
			if(this.player.playerTryCast(world, creatures[0], creatures[0].position, 0, false)){			
				return;
			}
		}
		var friendCreature = this.world.getCreaturesAt(worldpoint, 1, TEAM.MONSTER);
		if(friendCreature.length != 0)
		{
			this.focusCreature = friendCreature[0];
			this.setTargetActionBar(friendCreature[0]);
			this.player.playerTryCast(world, friendCreature[0], friendCreature[0].position, 0, false)
			return;
		}
		this.player.destination = worldpoint;
	}
}

Gui.prototype.onMouseMove = function(canvasPoint, worldpoint){
	   this.world.mouse = worldpoint;
}







/*****************************  Control  *******************************************/


function Control(topLeftCoord, downRightCoord)
{
	this.topLeftCoord = topLeftCoord;
	this.downRightCoord = downRightCoord;
	this.controls = new Array();
	
}

Control.prototype.getControl = function(coord){
	if(coord.x >= this.topLeftCoord.x && 
 	 coord.y >= this.topLeftCoord.y &&
	 coord.x < this.downRightCoord.x && 
	 coord.y < this.downRightCoord.y){
		for(var i = 0; i < this.controls.length; i++){
			var child = this.controls[i].getControl(coord);
			if(child != null){
				return child;
			}			
		}
		return this;
	}
	return null;
} 
Control.prototype.draw = function(canvas, rendering){
	if(this.ondraw != null){
		this.ondraw(canvas, rendering, this);
	}
	for(var i = 0; i < this.controls.length; i++){
		this.controls[i].draw(canvas, rendering);
	}
}