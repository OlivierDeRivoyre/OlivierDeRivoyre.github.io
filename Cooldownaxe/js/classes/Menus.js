var img_buttonOk = new Image();
img_buttonOk.src = 'sprites/ok.png';


function ButtonMenu(x, y, size, img){
	this.x = x;
	this.y = y;
	this.width = size;
	this.height = size;
	this.img = img;
	this.onClick = null;
}
ButtonMenu.prototype.draw = function(screen){
	screen.menuDrawImage(this.img, {x:this.x, y:this.y}, this.width, this.height);
}
ButtonMenu.prototype.drawAsSelected = function(screen){
	screen.menuStrokeRect({x:this.x, y:this.y}, this.width, this.height, 'green')
}
ButtonMenu.prototype.tryClick = function(coord){
	if(this.onClick == null){
		return;
	}
	if(coord.x >= this.x && coord.x < this.x + this.width &&
		coord.y >= this.y && coord.y < this.y + this.height){
		this.onClick();
	}
}

function ControlMenuContrainer(parent){
	this.parent = parent;
	this.controls = new Array();
}
ControlMenuContrainer.prototype.draw = function(screen){
	for(var i = 0; i < this.controls.length; i++){
		this.controls[i].draw(screen);
	}
}
ControlMenuContrainer.prototype.tryClick = function(coord){
	for(var i = 0; i < this.controls.length; i++){
		this.controls[i].tryClick(coord);
	}
}
ControlMenuContrainer.prototype.push = function(control){
	control.parent = this.parent;
	this.controls.push(control);
}

/***************************  MenuPlayerStat  **********************************************/

function MenuPlayerStat(player){
	this.player = player;
	this.refresh();
}
MenuPlayerStat.prototype.refresh = function(){
	this.controls = new ControlMenuContrainer(this);
	if(this.player.competanceCount > 0){
		var compCellSize = Math.min(48, (600 - 20) / this.player.competanceCount);
		for(var i = 0; i < this.player.competanceCount; i++){
			var compImg = null;
			if(this.player.competances[i] != null){
				compImg = this.player.competances[i].icon;
			}
			var compButton = new ButtonMenu(10 + i * compCellSize, 440, compCellSize, compImg);
			compButton.competanceIndex = i;
			compButton.onClick = function(){
				var menu = new MenuCompetance(this.parent.player, this.competanceIndex);
				this.parent.showMenu(menu);
			};
			this.controls.push(compButton);
		}
	}
	this.closeButton = new ButtonMenu(520, 520, 48, img_buttonOk);
	this.closeButton.onClick = function(){
		this.parent.gui.refresh();
		this.parent.close();
	};
	this.controls.push(this.closeButton);
}

MenuPlayerStat.prototype.draw = function(screen){
	screen.menuFillRect({x:0, y:0} ,600,600, 'white');
	this.controls.draw(screen);
}

MenuPlayerStat.prototype.onClick = function(coord){
	this.controls.tryClick(coord);
}

/***************************** MenuCompetance ***********************************/

function MenuCompetance(player, competanceIndex){
	this.player = player;
	this.competanceIndex = competanceIndex;
	this.initialCompetance = player.competances[competanceIndex];
	this.initialSubCompetance = player.competances[competanceIndex].selectedSubCompetance;
	this.controls = new ControlMenuContrainer(this);
	this.subCompControls = new ControlMenuContrainer(this);
	var compCount = Object.keys(COMPETANCEMANAGERS).length;
	var compCellSize = 48;
	this.selectedCompetanceButton = null;
	this.selectedSubCompetanceButton = null;
	
	var i = 0;
	for(var compCode in COMPETANCEMANAGERS){
		var compMgr = COMPETANCEMANAGERS[compCode]();
		var compImg = compMgr.icon;		
		var compButton = new ButtonMenu(10 + i * compCellSize, 10, compCellSize, compImg);
		compButton.competanceCode = compCode;
		compButton.onClick = function(){
			this.parent.selectedCompetanceButton = this;
			this.parent.refreshSubCompetance();
		};
		compButton.compMgr = compMgr;
		this.controls.push(compButton);
		if(this.initialCompetance.competanceCode == compCode){
			this.selectedCompetanceButton = compButton;
		}
		i++;
	}
	this.refreshSubCompetance();
	this.closeButton = new ButtonMenu(520, 520, 48, img_buttonOk);
	this.closeButton.onClick = function(){
		this.parent.setCompetance();
		this.parent.close();
	};
	this.controls.push(this.closeButton);
}
MenuCompetance.prototype.refreshSubCompetance = function(){
	this.subCompControls = new ControlMenuContrainer(this);
	if(this.selectedCompetanceButton == null){
		return;
	}
	var compMgr = this.selectedCompetanceButton.compMgr;
	if(compMgr.subCompetances.length <= 1){
		return;
	}	
	var i = 0;
	for(var i = 0; i < compMgr.subCompetances.length; i++){
		var subCompImg = compMgr.subCompetances[i].icon;		
		var subCompCode = compMgr.subCompetances[i].code;		
		var compButton = new ButtonMenu(10 + i * 48, 300, 48, subCompImg);
		compButton.subCompCode = subCompCode;
		compButton.onClick = function(){
			this.parent.selectedSubCompetanceButton = this;
		};
		this.subCompControls.push(compButton);
		if(this.selectedSubCompetanceButton == null){
			this.selectedSubCompetanceButton = compButton;//NONE button
		}
		if(this.initialCompetance.competanceCode == this.selectedCompetanceButton.competanceCode
			&& this.initialSubCompetance == subCompCode){
			this.selectedSubCompetanceButton = compButton;
		}
	}
	
}

MenuCompetance.prototype.setCompetance = function(){
	
	this.player.setCompetance(this.competanceIndex,  this.selectedCompetanceButton.competanceCode);
	if(this.selectedSubCompetanceButton != null){
		this.player.competances[this.competanceIndex].selectedSubCompetance = this.selectedSubCompetanceButton.subCompCode;
	}
	this.previousMenu.refresh();
}
MenuCompetance.prototype.draw = function(screen){
	screen.menuFillRect({x:0, y:0} ,600,600, 'white');
	this.controls.draw(screen);
	if(this.selectedCompetanceButton != null){
		this.selectedCompetanceButton.drawAsSelected(screen);
	}
	this.subCompControls.draw(screen);
	if(this.selectedSubCompetanceButton != null){
		this.selectedSubCompetanceButton.drawAsSelected(screen);
	}
}
MenuCompetance.prototype.onClick = function(coord){
	this.controls.tryClick(coord);
	this.subCompControls.tryClick(coord);
}