window.addEventListener("keydown", onKeyDown, false);
window.addEventListener("keyup", onKeyUp, false);

InputSystem = function ()
{
	this.isKeyPressed = [];
	return this;
}




InputSystem.prototype.isKeyDown = function ( keyCode )
{
	if( this.isKeyPressed[keyCode] == true )
		return true;
	else
		return false;
}

function onKeyDown(e)
{
	inputSystem.isKeyPressed[e.keyCode] = true;
}

function onKeyUp(e)
{
	inputSystem.isKeyPressed[e.keyCode] = false;
}

var inputSystem = new InputSystem();
