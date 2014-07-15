window.addEventListener("load", onPageLoadComplete, false);

// var Player.jump = 0;
// var E_Player.jump=0;
var direc = 0; // 0:왼쪽, 1:오른쪽
var E_direc = 0;
var FloorColl = 0;
var BlockColl = 0;

function Update() {
	
	if(Player.jump==0) game_world.gravity_down(Player);
	if(Player.jump==1) game_world.gravity_up(Player);
	Player.Position_Update();
	
	 if(Enemy.jump==0) game_world.gravity_down(Enemy);
	 if(Enemy.jump==1) game_world.gravity_up(Enemy);
	 Enemy.Position_Update();	
	
	for(var i=0; i<200; i++)
	{	
		Block[i].Collision(Player);
		Block[i].Collision(Enemy);
	}
	for(var i=0; i<20; i++)
	{	
		Floor[i].Collision(Player);
		Floor[i].Collision(Enemy);
	}
	for(var i=0; i<4; i++)
	{
		if(Jam[i].appear == 1)
			Jam[i].Collision(Player);
	}		
	
	Enemy.Head(Player);
	
	//console.log(Player.Coll);
}

function Render() {
	var theCanvas = document.getElementById("GameCanvas");
	var Context = theCanvas.getContext("2d");

	Context.fillStyle = "#000000";
	Context.fillRect(0, 0, 1240, 500);

	//game_world.Render();
	
	
	for(var i=0; i<200; i++)
	{
		Block[i].Render();
	}
	for(var i=0; i<20; i++)
	{
		Floor[i].Render();
	}
	for(var i=0; i<4; i++)
	{
		if(Jam[i].appear == 1)
			Jam[i].Render();
	}		
	
	Player.Render();
	Enemy.Render();

	Context.fillStyle = "#ffffff";
	Context.font = '15px Arial';
	Context.textBaseline = "top";
	Context.fillText("fps : " + frameCounter.Lastfps, 10, 0);
}

function gameLoop() {
	
	Render();
	KeyInput();
	Update();
	
	

	frameCounter.countFrame();

}

function KeyInput() {
	//console.log(Player.jump);

	if (inputSystem.isKeyDown(37) && BlockColl == 0) {
		// 왼쪽
		//console.log("왼쪽");
		direc = 0;
		if(Player.jump == 0){
			Player.Image_Change("Resource/player_left.png");
			Player.ImageType_Change_Change(1);
		}
		Player.x -= 2;
	} else if (inputSystem.isKeyDown(39)  && BlockColl == 0) {
		// 오른쪽
		direc = 1;
		if(Player.jump == 0){
			Player.Image_Change("Resource/player_right.png");
			Player.ImageType_Change_Change(1);
		}
		Player.x += 2;
	}
	else if (inputSystem.isKeyDown(38) && FloorColl == 1) {
		// 위쪽
		direc = 2;
		if(Player.jump == 0){
			Player.Image_Change("Resource/player_Floor.png");
			Player.ImageType_Change_Change(1);
		}
		Player.y -= 2;
	} else if (inputSystem.isKeyDown(40) && FloorColl == 1) {
		// 아래쪽
		direc = 3;
		if(Player.jump == 0){
			Player.Image_Change("Resource/player_Floor.png");
			Player.ImageType_Change_Change(1);
		}
		Player.y += 2;
	} else {
		Player.img.currentFrame=0;
		Player.ImageType_Change_Change(0);
	}

	if (inputSystem.isKeyDown(32) && Player.g_count == 0) {
		// 점프
		Player.jump = 1;
		Player.y-=2;
		Player.gravity = 4;
		if(direc == 0) Player.Image_Change("Resource/player_left_jump.png");
		else if(direc == 1) Player.Image_Change("Resource/player_right_jump.png");
		Player.ImageType_Change_Change(0);		
	}

}

var FPS = 30;

function Init()
{
	for(var i=0; i<20; i++)
	{
		Floor[i] = new Object(-100, -100, 0, "Resource/floor.png", 2);
	}
	for(var i=0; i<3; i++)
	{
		Floor[i] = new Object(120, (i*32)+32, 0, "Resource/floor.png", 2);
	}
	for(var i=3; i<6; i++)
	{
		Floor[i] = new Object(1080, ((i-3)*32)+32, 0, "Resource/floor.png", 2);
	}
	for(var i=6; i<11; i++)
	{
		Floor[i] = new Object(1040, ((i-6)*32)+125, 0, "Resource/floor.png", 2);
	}
	for(var i=11; i<16; i++)
	{
		Floor[i] = new Object(160, ((i-11)*32)+125, 0, "Resource/floor.png", 2);
	}
	for(var i=16; i<18; i++)
	{
		Floor[i] = new Object(360, ((i-16)*32)+110, 0, "Resource/floor.png", 2);
	}
	for(var i=18; i<20; i++)
	{
		Floor[i] = new Object(840, ((i-18)*32)+110, 0, "Resource/floor.png", 2);
	}								
		
	for(var i=0; i<200; i++)
	{
		Block[i] = new Object(-100, -100, 0, "Resource/map.png", 1);
	}
	for(var i=0; i<31; i++)
	{
		Block[i] = new Object(i*40, 288, 0, "Resource/map.png", 1);
	}
	for(var i=31; i<40; i++)
	{
		Block[i] = new Object(0, (i-31)*32, 0, "Resource/map.png", 1);
	}
	for(var i=40; i<50; i++)
	{
		Block[i] = new Object(1200, (i-40)*32, 0, "Resource/map.png", 1);
	}	
	
	for(var i=50; i<73; i++)
	{
		Block[i] = new Object(((i-50)*40)+160, 32, 0, "Resource/map.png", 1);
	}
	Block[73] = new Object(40, 64, 0, "Resource/map.png", 1);
	Block[74] = new Object(80, 64, 0, "Resource/map.png", 1);
	Block[75] = new Object(1160, 64, 0, "Resource/map.png", 1);
	Block[76] = new Object(1120, 64, 0, "Resource/map.png", 1);
	
	for(var i=77; i<80; i++)
	{
		Block[i] = new Object((i-77)*40+40, 128, 0, "Resource/map.png", 1);				
	}
	for(var i=80; i<83; i++)
	{
		Block[i] = new Object((i-80)*40+1080, 128, 0, "Resource/map.png", 1);				
	}
	for(var i=83; i<89; i++)
	{
		Block[i] = new Object((i-83)*40+200, 192, 0, "Resource/map.png", 1);				
	}
	for(var i=91; i<96; i++)
	{
		Block[i] = new Object((i-83)*40+200, 192, 0, "Resource/map.png", 1);				
	}	
	for(var i=98; i<104; i++)
	{
		Block[i] = new Object((i-83)*40+200, 192, 0, "Resource/map.png", 1);				
	}	
	for(var i=104; i<115; i++)
	{
		Block[i] = new Object((i-104)*40+400, 110, 0, "Resource/map.png", 1);				
	}
	Block[115] = new Object(80, 256, 0, "Resource/map.png", 1);	
	Block[116] = new Object(120, 256, 0, "Resource/map.png", 1);
	Block[117] = new Object(1120, 256, 0, "Resource/map.png", 1);
	Block[118] = new Object(1160, 256, 0, "Resource/map.png", 1);
	Block[119] = new Object(1160, 224, 0, "Resource/map.png", 1);
	
	Block[120] = new Object(480, 192, 110, "Resource/map.png", 1);	
	Block[121] = new Object(720, 192, 110, "Resource/map.png", 1);	
	
	Jam[0] =  new Object(1160, 100, 0, "Resource/jam.png", 3);	
	Jam[1] =  new Object(40, 100, 0, "Resource/jam.png", 3);		
	Jam[2] =  new Object(40, 260, 0, "Resource/jam.png", 3);		
	Jam[3] =  new Object(600, 160, 0, "Resource/jam.png", 3);															
}

function onPageLoadComplete() {
	Init();
	setInterval(gameLoop, 1000 / FPS);

}