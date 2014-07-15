SpriteAnimation = function ( img , width, height, totalFrameCount, fps)
{
	this.x = 0;
	this.y = 0;
	this.img = img;
	
	this.width = width;
	this.height = height;
	
	this.totalFrameCount = totalFrameCount;
	this.currentFrame = 0;
	
	this.updateFrame = fps/FPS;
	
	return this;
}

SpriteAnimation.prototype.Render = function ( Context )
{
	Context.drawImage(this.img, 
		this.width * Math.floor(this.currentFrame), 0, 
		this.width, this.height, 
		this.x, this.y,
		this.width, this.height);
}

SpriteAnimation.prototype.Update = function(Context)
{
	this.currentFrame+= this.updateFrame;
	if(this.currentFrame >= this.totalFrameCount)
		this.currentFrame = 0;
}

SpriteAnimation.prototype.SetPosition = function (x, y)
{
	this.x = x;
	this.y = y;
}

