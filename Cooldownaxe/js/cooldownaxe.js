var isDebug = true;

var canvas0;
var canvas1;
var canvas2;
var canvas3;
var world = new World();
var screen;
var gui;

window.onload = function() {
	
	var canvasWidth =  window.innerWidth-5;
	var canvasHeight = window.innerHeight-5; 
	canvas0 = document.getElementById('layer0');	
	canvas0.width  = canvasWidth; 
	canvas0.height = canvasHeight; 
	
	canvas1 = document.getElementById('layer1');	
	canvas1.width  = canvasWidth; 
	canvas1.height = canvasHeight; 

	canvas2 = document.getElementById('layer2');	
	canvas2.width  = canvasWidth; 
	canvas2.height = canvasHeight; 

	canvas3 = document.getElementById('layer3');	
	canvas3.width  = canvasWidth; 
	canvas3.height = canvasHeight; 

	
	canvas3.onmousemove = mouseMove;
	canvas3.onclick = mouseDown;
	screen = new Screen([canvas0, canvas1, canvas2, canvas3]);
	//world.setCanvas(canvas);, 
	gui = new Gui(world, canvas3, world.player);
	
	
	//Main loop:
	setInterval(function() {
		//world.applyInput();
		if(gui.menusStack.length != 0){// menu shown, it is a pause
			gui.menusStack[gui.menusStack.length - 1].draw(screen);	
		} else {		
			world.tick();
			world.drawAll(screen);	
			gui.draw(screen.canvasLayer[3], screen.renderingLayer[3]);
		}
				
	}, 40);

	
}

function eventToKEYS(event){
	var e = event || window.event;
	var keyCode = e.which || e.keyCode;
	switch(keyCode) {
		case 38 : case 122 : case 119 : case 90 : case 87 : // Flèche haut, z, w, Z, W
			return KEYS.UP;			
		case 40 : case 115 : case 83 : // Flèche bas, s, S
			return KEYS.DOWN;		
		case 37 : case 113 : case 97 : case 81 : case 65 : // Flèche gauche, q, a, Q, A
			return KEYS.LEFT;			
		case 39 : case 100 : case 68 : // Flèche droite, d, D
			return KEYS.RIGHT;	
		case 49:
			return KEYS.ACTION1;
		case 50:
			return KEYS.ACTION2;
		case 51:
			return KEYS.ACTION3;
		case 52:
			return KEYS.ACTION4;
		case 53:
			return KEYS.ACTION5;
		case 69://e
			return KEYS.ACTION6;
		case 82://R
			return KEYS.ACTION7;
		default : 
			//alert(keyCode);
			return null;
	}
}

window.onkeydown = function(event) {
	var key = eventToKEYS(event);
	if(key != null){
		if(gui.menusStack.length == 0){
			gui.keypressed(key);
			return false;
		}
	}
	return true;	
}

function getRelativeCoord(mouseEvent){
    var mouseX, mouseY; 
	mouseX = mouseEvent.clientX - canvas3.offsetLeft + document.body.scrollLeft + document.documentElement.scrollLeft;;
	mouseY = mouseEvent.clientY - canvas3.offsetTop + document.body.scrollTop + document.documentElement.scrollTop;;
    return {x:mouseX, y:mouseY};
}
function mouseMove(e) 
{ 
    var canvasPoint = getRelativeCoord(e);
	var worldPoint = screen.toWorldCoord(canvasPoint);	
	gui.onMouseMove(canvasPoint, worldPoint);
} 
function mouseDown(e) 
{ 
    var canvasPoint = getRelativeCoord(e);
	if(gui.menusStack.length == 0){
		var worldPoint = screen.toWorldCoord(canvasPoint);	
		gui.onClick(canvasPoint, worldPoint);
	} 
	else 
	{
		var menuPoint = screen.screenCoordToMenu(canvasPoint);	
		if(menuPoint.x != -1){//In menu control
			gui.menusStack[gui.menusStack.length - 1].onClick(menuPoint);
		}
	}
   //alert( getRelativeCoord(e));
} 

